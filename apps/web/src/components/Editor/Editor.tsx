import React, {useEffect, useState} from 'react';
import {Box, Grid, Stack, styled} from '@mui/material';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import {debounce} from 'lodash';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {AsideLoader} from './AsideLoader';
import {nextSpellAPI} from './utils';
import {EditorType} from './types';
import {setItemToLocalStorage} from 'src/components/LocalStorege';
import {useRouter} from 'next/router';
import useStates from 'src/hooks/useState';

let isDirty = false;

const getData = (pk: any) => {
  const localData = JSON?.parse(localStorage.getItem('docs') || '[]');
  const contents = localData?.filter((item: any) => item.id == pk);
  return contents?.[0]?.content || '';
};

export const ZDIEditor: React.FC = () => {
  const router = useRouter();
  const myRef: any = React.createRef();
  const {pk} = router.query;
  const [loading, setLoading] = useState(false);

  const saveContent = debounce(async (content) => {
    if (!isDirty) return;
    setLoading(true);
    const data = await nextSpellAPI(content);
    const message = data?.message;
    if (message) {
      console.log('message:::', message);
      myRef.current?.setData(message);
    }
    setItemToLocalStorage('docs', {
      id: pk,
      title: pk,
      content: message || content,
    });
    setLoading(false);
    isDirty = false;
  }, 360);

  const handleBoxClick = (e: any) => {
    myRef.current?.editing?.view.focus();
  };

  return (
    <EditorWraperStyled sx={{pt: 4}}>
      <Stack data-name="editorComponent">
        <Grid container sx={{minHeight: '100%'}}>
          <Grid item xs={12} md={8}>
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
                  myRef.current = editor;
                  editor.setData(getData(pk));
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
          <Grid item xs={12} md={4}>
            <AsideLoader loading={loading} />
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
  '.ck.ck-editor__editable.ck-rounded-corners:not(.ck-editor__nested-editable)':
    {border: 0, borderRadius: 0},
  '.ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable)': {
    border: 0,
    boxShadow: 'none',
  },
  '&& .ck-toolbar': {
    position: 'sticky',
    bottom: 0,
    border: 0,
  },
});
