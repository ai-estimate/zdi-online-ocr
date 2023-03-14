import React from 'react';
import {Box, Stack, Grid, styled, Container, Typography} from '@mui/material';
import 'draft-js/dist/Draft.css';
import dynamic from 'next/dynamic';
import ImproSvg from '@components/svgs/improment.svg';

const ZDIEditor = dynamic(
  () => import('@components/Editor').then(({ZDIEditor}) => ZDIEditor),
  {ssr: false},
);

export const NextSpellEditor: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <ZDIEditor />
        </Grid>
        <Grid item xs={4}>
          <Stack sx={{px: 4, py: 4}}>
            <ImproSvgStyled>
              <ImproSvg />
            </ImproSvgStyled>
            <Typography>That’s quite an improvement!</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

const ImproSvgStyled = styled(Box)({
  svg: {
    width: '16rem !important',
    height: '16rem !important',
  },
});
