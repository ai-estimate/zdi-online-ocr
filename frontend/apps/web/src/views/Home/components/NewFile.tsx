import React, {useCallback} from 'react';
import Image from 'next/image';
import {Container, Paper, Stack, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import {useDropzone} from 'react-dropzone';
import {styled} from '@mui/material/styles';
import axios from 'axios';
import useStates from 'src/hooks/useState';

export const NewFile: React.FC = () => {
  const router = useRouter();

  const handleNextSpell = () => {
    router.push(`/nextspell/${Date.now()}`);
  };

  return (
    <Container maxWidth="xl">
      <Stack px={2} py={1}>
        <Typography>Start a new document</Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={0.5}>
        <ZDINewCard onClick={handleNextSpell} title={'Next spell'} />
        <UploadFile />
      </Stack>
    </Container>
  );
};

interface IProps {
  onClick?: () => void;
  title: string;
  imagePath?: string;
}
const ZDINewCard = (props: IProps) => {
  const {onClick, title, imagePath} = props;

  return (
    <Stack>
      <Paper
        sx={{
          cursor: 'pointer',
          width: 144,
          height: 186,
          m: 1,
          borderRadius: 0.5,
          borderColor: 'grey.300',
          ':hover': {
            borderColor: 'darkblue',
          },
        }}
        variant="outlined"
        onClick={onClick}>
        <ImageStyled
          className="px-10"
          src={imagePath || '/assets/svgs/add_files.svg'}
          width={144}
          height={186}
          alt={title}
        />
      </Paper>
      <Stack sx={{pl: 1.5, pr: 1, py: 0.5}}>
        <Typography variant="subtitle2" noWrap>
          {title || 'Untitled'}
        </Typography>
      </Stack>
    </Stack>
  );
};

const ImageStyled = styled(Image)({
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 5,
  paddingBottom: 5,
});

const setItemToLocalStorage = (key: string, value: any) => {
  // get data from local storage
  const data = JSON?.parse(localStorage.getItem('docs') || '[]');

  // remove if the same id
  const newData = data?.filter((item: any) => item.id !== value.id);
  newData.push(value);

  // set new data to local storage
  localStorage.setItem(key, JSON.stringify(newData));
};

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

const UploadFile = () => {
  const router = useRouter();
  const [state, setState] = useStates({
    isLoading: false,
  });
  const {isLoading} = state;

  const onDrop = useCallback(async (acceptedFiles: any) => {
    // Do something with the files

    if (acceptedFiles) {
      setState({isLoading: true});
      const resp = await postAPI(acceptedFiles[0]);
      setState({isLoading: false});
      if (resp != null) {
        router.replace(`/nextspell/${resp}`);
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

const ZDIDropFileHere = () => {
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
