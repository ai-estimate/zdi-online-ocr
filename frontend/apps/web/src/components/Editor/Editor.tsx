import React, {useEffect} from 'react';
import {Box, Grid, Stack, styled} from '@mui/material';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import {debounce} from 'lodash';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {ToolBar} from './ToolBar';
import {AsideLoader} from './AsideLoader';
import {nextSpellAPI} from './utils';
import {EditorType} from './types';

let isDirty = false;
export const ZDIEditor: React.FC = () => {
  const myRef = React.useRef<EditorType>(null);
  const [ready, setReady] = React.useState(false);

  const saveContent = debounce(async (content) => {
    if (!isDirty) return;
    const data = await nextSpellAPI(content);
    const message = data?.message;
    if (message) {
      myRef.current?.setData(message);
    }
    isDirty = false;
  }, 360);

  const handleBoxClick = (e: any) => {
    myRef.current?.editing?.view.focus();
  };

  return (
    <EditorWraperStyled sx={{pt: 4}}>
      <Stack data-name="editorComponent">
        <Grid container sx={{minHeight: '100%'}}>
          <Grid item xs={7}>
            <Box
              sx={{minHeight: 'calc(100vh - var(--nav-height) - 80px)'}}
              onClick={handleBoxClick}
              id="ctoolbar-editor">
              <CKEditor
                onReady={(editor: EditorType) => {
                  editor.ui
                    .getEditableElement()
                    ?.parentElement?.parentElement.insertBefore(
                      editor.ui.view.toolbar.element,
                      editor.ui.getEditableElement().nextSibling,
                    );
                  console.log(Array.from(editor.ui.componentFactory.names()));
                  myRef.current = editor;
                  setReady(true);
                }}
                config={{
                  placeholder: 'Type or paste (⌘+V) your text here or',
                  toolbar: [
                    'bold',
                    'italic',
                    'underline',
                    '|',
                    'heading',
                    'numberedList',
                    'bulletedList',
                    'removeFormat',
                  ],
                }}
                editor={DecoupledEditor}
                data={''}
                onChange={(event: any, editor: EditorType) => {
                  const data = editor.getData();
                  isDirty = true;
                  saveContent(data);
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={5}>
            <AsideLoader />
          </Grid>
        </Grid>
      </Stack>
    </EditorWraperStyled>
  );
};

const EditorWraperStyled = styled(Box)({
  cursor: 'text',
  '.ck-editor__editable_inline': {
    margin: 'auto',
    overflowY: 'scroll',
    fontFamily: 'var(--kh-font-family)',
    fontSize: '18px',
  },
  '&& .ck-toolbar': {
    position: 'sticky',
    bottom: 0,
    border: 0,
  },
});
