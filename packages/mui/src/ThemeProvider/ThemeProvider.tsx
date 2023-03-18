import React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './../theme';
import 'simplebar-react/dist/simplebar.min.css';

interface IProps {
  children: React.ReactNode;
}
export const ZDIThemeProvider: React.FC<IProps> = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
