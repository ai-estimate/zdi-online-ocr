import React from 'react';
import {Box} from '@mui/material';
import 'draft-js/dist/Draft.css';
import dynamic from 'next/dynamic';

const ZDIEditor = dynamic(
  () => import('@components/Editor').then(({ZDIEditor}) => ZDIEditor),
  {ssr: false},
);

export const NextSpellEditor: React.FC = () => {
  return (
    <Box>
      <ZDIEditor />
    </Box>
  );
};
