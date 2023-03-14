import React, {useRef} from 'react';
import {
  Editor,
  RichUtils,
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import useStates from 'src/hooks/useState';
import {Box, Stack, styled, Typography} from '@mui/material';
import {ToolBar} from './ToolBar';
import {convertToHTML} from 'draft-convert';
import debounce from 'lodash/debounce';
import axios from 'axios';

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
  const [state, setState] = useStates({editorState: EditorState.createEmpty()});

  const myEditor: any = useRef(null);
  const {editorState} = state;

  const focusEditor = () => {
    myEditor.current?.focus();
  };

  const saveContent = debounce(async (content) => {
    const data = await postAPI(content);
    const message = data?.message;

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
  }, 360);

  const onChange = (newState: EditorState) => {
    setState({editorState: newState});
    const currentPlainText = editorState.getCurrentContent().getPlainText();
    const newPlainText = newState.getCurrentContent().getPlainText();

    if (currentPlainText.trim() !== newPlainText.trim()) {
      const rawContentState = newState.getCurrentContent();
      saveContent(convertToHTML(rawContentState));
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
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
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
        <ToolBar editorState={editorState} onToggle={toggleToolbar} />
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
  padding: '0em 2em',
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
