import React, {useEffect, useRef} from 'react';
import {
  Editor,
  RichUtils,
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import useStates from 'src/hooks/useState';
import {Box, Container, Stack, styled, Typography} from '@mui/material';
import {ToolBar} from './ToolBar';
import {convertToHTML} from 'draft-convert';
import debounce from 'lodash/debounce';
import axios from 'axios';
import {useRouter} from 'next/router';
import {setItemToLocalStorage} from 'src/components/LocalStorege';

const postAPI = async (data: any) => {
  try {
    const {data: resp} = await axios.post(
      'http://api.nextspell.com/api_spellcheck',
      {data},
      {headers: {'Content-Type': 'multipart/form-data'}},
    );
    return resp;
  } catch (error) {
    return null;
  }
};

export const ZDIEditor: React.FC = () => {
  const router = useRouter();
  const [state, setState] = useStates({
    editorState: EditorState.createEmpty(),
  });
  console.log('EditorState.createEmpty()::', EditorState.createEmpty());

  const myEditor: any = useRef(null);
  const {pk} = router.query;

  const {editorState} = state;

  const focusEditor = () => {
    myEditor.current?.focus();
  };

  useEffect(() => {
    // check is local storage have data by id
    const localData = JSON?.parse(localStorage.getItem('docs') || '[]');
    const content = localData?.filter((item: any) => item.id == pk);
    if (content?.length > 0) {
      saveContent(localData[0]?.content);
    }
  }, []);

  const loadDataToEditor = (message: string) => {
    if (message) {
      const blocksFromHTML = convertFromHTML(message);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      );
      const newState = EditorState.createWithContent(state);
      const mungedState = EditorState.forceSelection(
        newState,
        editorState.getSelection(),
      );
      setState({editorState: mungedState});
    }
  };

  const saveContent = debounce(async (content) => {
    const data = await postAPI(content);
    const message = data?.message;
    loadDataToEditor(message);
  }, 360);

  const onChange = (newState: EditorState) => {
    setState({editorState: newState});
    const currentPlainText = editorState.getCurrentContent().getPlainText();
    const newPlainText = newState.getCurrentContent().getPlainText();

    if (currentPlainText.trim() !== newPlainText.trim()) {
      const rawContentState = newState.getCurrentContent();
      saveContent(convertToHTML(rawContentState));
      setItemToLocalStorage('docs', {
        id: pk,
        title: pk,
        content: convertToHTML(rawContentState),
      });
    }
  };

  const handleKeyCommand = (command: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleToolbar = (inlineStyle: any) => {
    try {
      onChange(RichUtils?.toggleInlineStyle(editorState, inlineStyle));
    } catch (error) {
      // console.log('error toggleToolbar :::', error);
    }
  };

  const toggleBlockType = (blockType: any) => {
    try {
      onChange(RichUtils?.toggleBlockType(editorState, blockType));
    } catch (error) {
      // console.log('error toggleBlockType :::', error);
    }
  };

  return (
    <Box sx={{height: '100%'}}>
      <EditorWraperStyled onClick={focusEditor} component="div">
        <Editor
          customStyleMap={styleMap}
          ref={myEditor}
          editorKey="foobar"
          editorState={editorState}
          onChange={onChange}
          placeholder="Type or paste (⌘+V) your text here!"
          spellCheck={false}
          handleKeyCommand={handleKeyCommand}
        />
      </EditorWraperStyled>
      <ToolBarStyled>
        <Container maxWidth="xl">
          <ToolBar
            editorState={editorState}
            onToggle={toggleToolbar}
            onToggleBlockType={toggleBlockType}
          />
        </Container>
      </ToolBarStyled>
    </Box>
  );
};

const ToolBarStyled = styled(Stack)({
  backgroundColor: 'white',
  color: '#000000bd',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 999,
});

const EditorWraperStyled = styled(Typography)({
  border: '1px solid gray',
  cursor: 'text',
  padding: '1em',
  '.DraftEditor-root': {
    margin: 'auto',
    height: '300px',
    overflowY: 'scroll',
    fontSize: '18px',
  },
});

const styleMap = {};
