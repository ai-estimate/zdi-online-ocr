import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from 'axios';
import useStates from 'src/hooks/useState';
import {Alert, Paper, Snackbar, Stack, Typography} from '@mui/material';
import {setItemToLocalStorage} from 'src/components/LocalStorege';
import {ZDINewCard} from './NewFile';
import {useRouter} from 'next/router';

const postAPI = async (data: any) => {
  try {
    const name = data?.name;
    const clean = name?.replace(/[^a-zA-Z0-9]/g, '');
    const url = 'http://api.nextspell.com/khmerocr_api';
    let formData = new FormData();
    formData.append('file', data);
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
    };

    const resp = await axios.post(url, formData, options);
    const _id = Date.now();

    if (resp.status === 200) {
      const {data} = resp;

      setItemToLocalStorage('docs', {
        id: _id,
        title: clean,
        content: data?.message,
      });
    }
    return _id;
  } catch (error) {
    return null;
  }
};

export const UploadFile: React.FC = () => {
  const router = useRouter();
  const [state, setState] = useStates({
    isLoading: false,
    isFailed: false,
  });
  const {isLoading, isFailed} = state;

  const onDrop = useCallback(async (acceptedFiles: any) => {
    // Do something with the files

    if (acceptedFiles) {
      setState({isLoading: true});
      const resp = await postAPI(acceptedFiles[0]);
      setState({isLoading: false});
      if (resp != null) {
        router.replace(`/nextspell/${resp}`);
      } else {
        setState({isFailed: true});
        setTimeout(() => {
          setState({isFailed: false});
        }, 3000);
      }
    }
  }, []);

  const {getRootProps, getInputProps, isDragActive, open} = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.bmp'],
    },
  });

  return (
    <Stack {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <ZDIDropFileHere />
      ) : (
        <>
          {IconAlerts(isFailed)}
          {isLoading && (
            <ZDINewCard
              title={'Loading . . .'}
              onClick={open}
              imagePath={'/assets/gif/loading_2.gif'}
            />
          )}
          {!isLoading && (
            <ZDINewCard
              title={'Image to text'}
              onClick={open}
              imagePath={'/assets/svgs/images_re.svg'}
            />
          )}
        </>
      )}
    </Stack>
  );
};

const ZDIDropFileHere: React.FC = () => {
  return (
    <Paper
      sx={{
        cursor: 'pointer',
        width: 144,
        height: 186,
        m: 1,
        borderRadius: 0.5,
        borderColor: 'grey.300',
        justifyContent: 'center',
        display: 'flex',
      }}
      variant="outlined">
      <Stack
        sx={{
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Typography variant="body2">Drop the files </Typography>
        <Typography variant="body2">here ...</Typography>
        <Typography variant="body2">for image</Typography>
      </Stack>
    </Paper>
  );
};

export default function IconAlerts(open: boolean) {
  return (
    <Stack spacing={2} sx={{width: '100%'}}>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity="error" sx={{width: '100%'}} variant="filled">
          Uplaod has failed !!!
        </Alert>
      </Snackbar>
    </Stack>
  );
}
