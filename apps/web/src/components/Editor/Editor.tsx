import React, {useCallback, useState} from 'react';
import {Box, Grid, Stack, styled} from '@mui/material';
import {AsideLoader} from './AsideLoader';
import {nextSpellAPI} from './utils';
import {setItemToLocalStorage} from 'src/components/LocalStorege';
import {useRouter} from 'next/router';
import {ZCKEditor} from './ZCKEditor';

const getData = (pk: any) => {
  const localData = JSON?.parse(localStorage.getItem('docs') || '[]');
  const contents = localData?.filter((item: any) => item.id == pk);
  return contents?.[0]?.content || '';
};

export const ZDIEditor: React.FC = () => {
  const router = useRouter();
  const myRef: any = React.createRef();

  const liveRef: any = React.createRef();
  const {pk} = router.query;
  const [loading, setLoading] = useState(false);

  const saveContent = async (content: string) => {
    setLoading(true);
    const data = await nextSpellAPI(content);
    const message = data?.message;
    if (message) {
      liveRef.current?.setData(message);
    }
    if (!message) {
      liveRef.current?.setData('' || content);
    }
    setItemToLocalStorage('docs', {
      id: pk,
      title: pk,
      content: message || content,
    });
    setLoading(false);
  };

  var data = getData(pk);
  const isDataHaveBlue = data?.includes('blue');
  const strippedHtml = data?.replace(/<[^>]+>/g, '');

  const handelClick = useCallback((etst: any, isBlue: boolean) => {
    if (isBlue == false) return;
    if (isBlue == true) {
      setLoading(true);
      myRef.current?.setData(`${etst}`);
      setLoading(false);
    }
  }, []);

  return (
    <EditorWraperStyled sx={{pt: 4}}>
      <Stack data-name="editorComponent">
        <Grid container sx={{minHeight: '100%'}}>
          <Grid item xs={12} md={5}>
            <Box sx={{height: 4, bgcolor: '#f9f0e5'}} />
            <ZCKEditor
              data={strippedHtml}
              onChange={saveContent}
              myRef={myRef}
              isEditerUI={true}
              isBgcolor={true}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <AsideLoader loading={loading}>
              <Stack onClick={() => handelClick(strippedHtml, isDataHaveBlue)}>
                <ZCKEditor data={data} myRef={liveRef} readonly />
              </Stack>
            </AsideLoader>
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
