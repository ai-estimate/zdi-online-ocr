import React, {useRef} from 'react';
import {Editor, RichUtils, EditorState} from 'draft-js';
import useStates from 'src/hooks/useState';
import {Box, Stack, styled} from '@mui/material';
import {ToolBar} from './ToolBar';

export const ZDIEditor: React.FC = () => {
  const [state, setState] = useStates({editorState: EditorState.createEmpty()});
  const myEditor: any = useRef(null);
  const {editorState} = state;

  const focusEditor = () => {
    myEditor.current?.focus();
  };

  const onChange = (editorState: any) => setState({editorState});

  const handleKeyCommand = (command: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  const toggleToolbar = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  return (
    <Box sx={{height: '100%'}}>
      <EditorWraperStyled onClick={focusEditor}>
        <Editor
          customStyleMap={styleMap}
          ref={myEditor}
          editorKey="foobar"
          editorState={editorState}
          onChange={onChange}
          placeholder="Write something!"
          spellCheck={false}
        />
      </EditorWraperStyled>
      <ToolBarStyled>
        <ToolBar editorState={editorState} onToggle={toggleToolbar} />
      </ToolBarStyled>
    </Box>
  );
};

const ToolBarStyled = styled(Stack)({
  display: 'block',
  backgroundColor: 'black',
  color: 'white',
  position: 'absolute',
  zIndex: 999,
});

const EditorWraperStyled = styled('div')({
  border: '1px solid gray',
  minHeight: '6em',
});

const styleMap = {
  CODE: {
    backgroundColor: 'red',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 4,
  },
  BOLD: {
    color: '#395296',
    fontWeight: 'bold',
  },
  ANYCUSTOMSTYLE: {
    color: '#00e400',
  },
};
