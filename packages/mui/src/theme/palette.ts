import {common} from '@mui/material/colors';
import {alpha} from '@mui/material/styles';
import {
  error,
  indigo,
  secondary,
  info,
  neutral,
  success,
  warning,
} from './colors';

export function createPalette() {
  return {
    divider: 'rgb(242, 244, 247)',
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12),
    },
    background: {
      default: common.white,
      paper: common.white,
    },
    error,
    info,
    mode: 'light',
    neutral,
    primary: indigo,
    secondary,
    success,
    text: {
      primary: neutral[900],
      secondary: neutral[500],
      disabled: alpha(neutral[900], 0.38),
    },
    warning,
  };
}
