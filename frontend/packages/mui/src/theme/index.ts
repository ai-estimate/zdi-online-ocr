import {createTheme, Theme} from '@mui/material/styles';
import {Inter, Plus_Jakarta_Sans} from 'next/font/google';
import {createTypography} from './typography';
import {createPalette} from './palette';
import {createComponents} from './components';
import {createShadows} from './shadows';

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif', 'DefaultFont'],
});

export const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif', 'DefaultFont'],
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
  typography: createTypography({inter, plusJakartaSans, breakpoints}) as any,
  palette,
  components: createComponents({palette}) as Theme['components'],
  shape: {borderRadius: 8},
  shadows: createShadows() as Theme['shadows'],
});
