import React from 'react';
import {Stack} from '@mui/material';
import {NewFile} from './components/NewFile';
import {DocumentsLists} from './components';
import LayoutAuth from '@components/LayoutAuth';
import {Layout} from '@components/Layout';

export const Home: React.FC = () => {
  return (
    <LayoutAuth>
      <Layout>
        <Stack pt={2} pb={2} bgcolor={'#f1f3f4'}>
          <NewFile />
        </Stack>
        <DocumentsLists />
      </Layout>
    </LayoutAuth>
  );
};
