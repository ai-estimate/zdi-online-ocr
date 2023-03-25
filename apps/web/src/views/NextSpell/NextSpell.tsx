import React from 'react';
import dynamic from 'next/dynamic';
import {Box} from '@mui/material';

const ZDIEditor = dynamic(
  () => import('@components/Editor').then(({ZDIEditor}) => ZDIEditor),
  {ssr: false},
);

export const NextSpellEditor: React.FC = () => {
  return (
    <Box sx={{'--kh-font-family': 'var(--khmer-font-fontFamily)'}}>
      <ZDIEditor />
    </Box>
  );
};
