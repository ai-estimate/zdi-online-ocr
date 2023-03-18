import React from 'react';
import dynamic from 'next/dynamic';
import {Koh_Santepheap} from 'next/font/google';
import {Box} from '@mui/material';

const khmerFont = Koh_Santepheap({
  weight: ['300', '400', '700'],
  subsets: ['latin', 'khmer'],
  display: 'swap',
});

const ZDIEditor = dynamic(
  () => import('@components/Editor').then(({ZDIEditor}) => ZDIEditor),
  {ssr: false},
);

export const NextSpellEditor: React.FC = () => {
  return (
    <Box sx={{'--kh-font-family': khmerFont.style.fontFamily}}>
      <ZDIEditor />
    </Box>
  );
};
