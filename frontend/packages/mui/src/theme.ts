import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';

const PRIMARY_TEXT_COLOR = '#15294B';
// Create a theme instance.
export default createTheme({
  typography: {
    fontFamily: `"Inter", sans-serif, DefaultFont`,
    button: {
      textTransform: 'none',
    },
    h2: {
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '24px',
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: '20px',
    },
  },
  palette: {
    primary: {
      main: '#2A7DE1',
      contrastText: '#fff',
    },
    secondary: {
      main: '#94d2f6',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FAFBFB',
    },
    text: {
      primary: PRIMARY_TEXT_COLOR,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: PRIMARY_TEXT_COLOR,
        },
      },
      variants: [
        {
          props: {variant: 'sidebarTitle'},
          style: {
            color: '#505f79',
            fontSize: '0.875rem',
            lineHeight: '20px',
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: PRIMARY_TEXT_COLOR,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '.MuiOutlinedInput-notchedOutline': {
            borderWidth: 2,
            borderColor: '#EBEDF0',
          },
          '&&:hover:not(.Mui-focused)': {
            // backgroundColor: '#F5F6F7',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#C2C7D0',
            },
          },
          '&&.Mui-focused': {
            borderColor: '#2A7DE1',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: '10px 8px',
          '&:hover': {
            backgroundColor: '#F5F6F7',
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: {variant: 'z1primary'},
          style: {
            textTransform: 'none',
            color: '#fff',
            backgroundColor: '#3F85F3',
            '&:hover': {
              backgroundColor: '#609AF5',
              color: '#FAFBFB',
            },
            '&.Mui-disabled': {
              color: '#A6AEBB',
              backgroundColor: '#F5F6F7',
              opacity: 0.7,
            },
            '&:active': {
              backgroundColor: '#2C5DAA',
            },
          },
        },
        {
          props: {variant: 'z1cancel'},
          style: {
            textTransform: 'none',
            fontWeight: 400,
            border: '1px solid #EBEDF0',
            color: '#15294B',
            '&:hover': {
              border: '1px solid #C2C7D0',
            },
            '&.Mui-disabled': {
              color: '#A6AEBB',
              border: '1px solid #F5F6F7',
              opacity: 0.7,
            },
            '&:active': {
              border: '1px solid #C2C7D0',
            },
          },
        },
        {
          props: {variant: 'z1danger'},
          style: {
            textTransform: 'none',
            color: '#fff',
            backgroundColor: '#FF2D3B',
            '&:hover': {
              backgroundColor: '#FF515C',
              color: '#FAFBFB',
            },
            '&.Mui-disabled': {
              color: '#A6AEBB',
              backgroundColor: '#F5F6F7',
              opacity: 0.7,
            },
            '&:active': {
              backgroundColor: '#B31F29',
            },
          },
        },
      ],
    },
    MuiTableHead: {
      styleOverrides: {
        root: ({theme}) => ({
          '&& > .MuiTableRow-root': {
            '& .MuiTableCell-root': {
              fontWeight: 500,
              fontSize: theme.typography.pxToRem(14),
              borderBottomColor: '#EBEDF0',
              backgroundColor: '#fff',
            },
          },
        }),
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({theme}) => ({
          '&& > .MuiTableCell-root': {
            borderBottomColor: '#EBEDF0',
            lineHeight: theme.typography.pxToRem(20),
          },
          '&&:last-child': {
            '&& > td.MuiTableCell-root': {
              borderBottomColor: 'transparent',
            },
          },
        }),
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({theme}) => ({
          '&.MuiFormLabel-colorPrimary': {
            color: '#15294B',
            letterSpacing: '-0.02em',
            fontWeight: 500,
            fontSize: theme.typography.pxToRem(12),
            lineHeight: theme.typography.pxToRem(18),
            transform: 'none',
            marginBottom: theme.spacing(0.5),
          },
          '& > .MuiFormLabel-asterisk': {
            color: red[500],
          },
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
        size: 'small',
        InputLabelProps: {
          shrink: true,
        },
      },
      styleOverrides: {
        root: ({theme, variant}) => {
          if (variant !== 'standard') return {};
          return {
            '& .MuiInputBase-root': {
              minHeight: 0,
              '&:before': {
                borderBottom: '0 !important',
              },
              '&:after': {
                borderBottom: '0 !important',
              },
              '&.Mui-focused': {
                '& .MuiInputBase-input': {
                  borderColor: '#2A7DE1',
                },
              },
            },
            '& .MuiInputBase-input': {
              backgroundColor: '#FFFFFF',
              border: '1px solid #ced4da',
              borderRadius: 4,
              padding: theme.spacing(1),
              marginTop: theme.spacing(0.5),
              color: '#15294B',
              fontWeight: 400,
              fontSize: theme.typography.pxToRem(14),
              lineHeight: theme.typography.pxToRem(20),
            },
            '& .MuiFormLabel-root.MuiInputLabel-sizeSmall': {
              color: '#15294B',
              letterSpacing: '-0.02em',
              fontWeight: 500,
              fontSize: theme.typography.pxToRem(12),
              lineHeight: theme.typography.pxToRem(18),
              transform: 'none',
            },
          };
        },
      },
    },
  },
});
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    z1primary: true;
    z1cancel: true;
    z1danger: true;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    sidebarTitle: true;
  }
}
