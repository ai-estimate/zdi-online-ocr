import React from 'react';
import {Stack} from '@mui/material';
import {NewFile} from './components/NewFile';
import {DocumentsLists} from './components';

export const Home: React.FC = () => {
  return (
    <>
      <Stack pt={2} pb={2} bgcolor={'#f1f3f4'}>
        <NewFile />
      </Stack>
      <DocumentsLists />
    </>
  );
};
