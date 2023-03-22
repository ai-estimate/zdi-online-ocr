import React, {useState} from 'react';
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
    setItemToLocalStorage('docs', {
      id: pk,
      title: pk,
      content: message || content,
    });
    setLoading(false);
  };

  const data = getData(pk);
  const strippedHtml = data?.replace(/<[^>]+>/g, '');

  return (
    <EditorWraperStyled sx={{pt: 4}}>
      <Stack data-name="editorComponent">
        <Grid container sx={{minHeight: '100%'}}>
          <Grid item xs={12} md={5}>
            <Box sx={{height: 4}} />
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
              <ZCKEditor data={data} onChange={saveContent} myRef={liveRef} />
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
