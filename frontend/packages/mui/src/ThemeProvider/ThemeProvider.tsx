import React from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components';
import {ThemeProvider as MUIThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './../theme';

interface IProps {
  children: React.ReactNode;
}
export const ZDIThemeProvider: React.FC<IProps> = React.memo(({children}) => {
  return (
    <StyledThemeProvider theme={theme}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledThemeProvider>
  );
});
