import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import useStates from 'src/hooks/useState';
import {
  Alert,
  CircularProgress,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import {ZDINewCard} from './NewFile';
import {useRouter} from 'next/router';
import {nextSpellAPI} from './utils';
import {TOP_NAV_HEIGHT} from 'src/components/Layout';

export const UploadFile: React.FC = () => {
  const router = useRouter();
  const [state, setState] = useStates({
    isLoading: false,
    isFailed: false,
  });
  const {isLoading, isFailed} = state;

  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      // Do something with the files

      if (acceptedFiles) {
        setState({isLoading: true});

        const resp = await nextSpellAPI(acceptedFiles[0]);

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
    },
    [router, setState],
  );

  const {getRootProps, getInputProps, isDragActive, open} = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
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
          {isLoading && <ZDILoading />}
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

const ZDILoading: React.FC = () => {
  return (
    <Paper
      sx={{
        cursor: 'progress',
        width: 'calc(100% - 20px)',
        height: `calc(100% - 10px - ${TOP_NAV_HEIGHT}px)`,
        borderRadius: 0.5,
        borderColor: 'grey.500',
        justifyContent: 'center',
        display: 'flex',
        position: 'fixed',
        top: `${TOP_NAV_HEIGHT}`,
        bottom: 10,
        right: 10,
        left: 10,
        zIndex: 1100,
      }}
      variant="outlined">
      <Stack
        sx={{
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <CircularProgress sx={{color: 'darkblue'}} size={120} />
        <Typography pt={2} variant="h5">
          Uploading ...
        </Typography>
      </Stack>
    </Paper>
  );
};
