import React from 'react';
import Image from 'next/image';
import {Container, Paper, Stack, Typography} from '@mui/material';
import {useRouter} from 'next/router';

export const NewFile: React.FC = () => {
  const router = useRouter();

  const handleNextSpell = () => {
    router.push(`/nextspell/${Date.now()}`);
  };

  const handleClick = () => {
    console.log('click');
  };

  return (
    <Container maxWidth="xl">
      <Stack px={2} py={1}>
        <Typography>Start a new document</Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={0.5}>
        <ZDINewCard onClick={handleNextSpell} title={'Next spell'} />
        <ZDINewCard onClick={handleClick} title={'Image to text'} />
      </Stack>
    </Container>
  );
};

interface IProps {
  onClick: () => void;
  title: string;
}
const ZDINewCard = (props: IProps) => {
  const {onClick, title} = props;

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
        }}
        variant="outlined"
        onClick={onClick}>
        <Image
          src="/assets/svgs/add_files.svg"
          width={144}
          height={186}
          alt="add_files"
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
