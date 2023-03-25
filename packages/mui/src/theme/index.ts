import {createTheme, Theme} from '@mui/material/styles';
import {createTypography} from './typography';
import {createPalette} from './palette';
import {createComponents} from './components';
import {createShadows} from './shadows';
import {Koh_Santepheap} from 'next/font/google';

export const khmerFont = Koh_Santepheap({
  weight: ['300', '400', '700'],
  subsets: ['latin', 'khmer'],
  display: 'swap',
});

const palette: any = createPalette();

const _breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1440,
  },
};

export const {breakpoints} = createTheme({breakpoints: _breakpoints});

// Create a theme instance.
export default createTheme({
  breakpoints: _breakpoints as Theme['breakpoints'],
  typography: createTypography({khmerFont, breakpoints}) as any,
  palette,
  components: createComponents({palette}) as Theme['components'],
  shape: {borderRadius: 8},
  shadows: createShadows() as Theme['shadows'],
});
