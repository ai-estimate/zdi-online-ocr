import React from 'react';
import {styled} from '@mui/material/styles';
import {Box, Stack, Typography} from '@mui/material';

export const AppLoader = () => {
  return (
    <AppLoaderStyled>
      <Stack className="loader">
        <Typography>Loading...</Typography>
      </Stack>
    </AppLoaderStyled>
  );
};

const AppLoaderStyled = styled(Box)({
  height: '100%',
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  zIndex: 99999,
  overflow: 'hidden',
  '.loader': {
    transition: 'all .3s',
    opacity: 1,
    visibility: 'visible',
  },
});
