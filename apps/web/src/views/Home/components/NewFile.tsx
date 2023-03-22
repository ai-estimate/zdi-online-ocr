import React from 'react';
import Image from 'next/image';
import {Container, Paper, Stack, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import {styled} from '@mui/material/styles';
import {UploadFile} from './UploadFile';
import {generate6RandomId} from './utils';

export const NewFile: React.FC = () => {
  const router = useRouter();

  const handleNextSpell = () => {
    router.push(`/nextspell/${generate6RandomId()}`);
  };
  const handlePDFToImage = () => {
    console.log('handlePDFToImage:::');
  };

  return (
    <Container maxWidth="xl">
      <Stack px={2} py={1}>
        <Typography>Start a new document</Typography>
      </Stack>
      <Stack
        flexDirection={'row'}
        gap={0.5}
        sx={{
          overflowX: 'auto',
        }}>
        <ZDINewCard onClick={handleNextSpell} title={'NextSpell'} />
        <UploadFile />
        {/* <ZDINewCard
          onClick={handlePDFToImage}
          title={'PDF to text'}
          imagePath="/assets/svgs/pdf_to_txt.svg"
        /> */}
      </Stack>
    </Container>
  );
};

interface IProps {
  onClick?: () => void;
  title: string;
  imagePath?: string;
}

export const ZDINewCard = (props: IProps) => {
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
          boxShadow: 2,
          borderColor: 'grey.300',
          ':hover': {
            borderColor: 'darkblue',
            boxShadow: 3,
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
