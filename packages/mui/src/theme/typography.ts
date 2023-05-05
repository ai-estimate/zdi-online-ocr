export const createTypography = ({khmerFont, breakpoints}: any) => {
  return {
    fontFamily: 'inherit',
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
    },
    button: {
      fontWeight: 600,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.66,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase',
    },
    h1: {
      fontFamily: khmerFont.style.fontFamily,
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      [breakpoints.up('sm')]: {
        fontSize: '2.9167rem',
      },
      [breakpoints.up('md')]: {
        fontSize: '3.125rem',
      },
      [breakpoints.up('lg')]: {
        fontSize: '3.5417rem',
      },
    },
    h2: {
      fontFamily: khmerFont.style.fontFamily,
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
      [breakpoints.up('sm')]: {
        fontSize: '2.5rem',
      },
      [breakpoints.up('md')]: {
        fontSize: '2.7083rem',
      },
      [breakpoints.up('lg')]: {
        fontSize: '2.9167rem',
      },
    },
    h3: {
      fontFamily: khmerFont.style.fontFamily,
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      [breakpoints.up('sm')]: {
        fontSize: '1.875rem',
      },
      [breakpoints.up('md')]: {
        fontSize: '2.0833rem',
      },
      [breakpoints.up('lg')]: {
        fontSize: '2.2917rem',
      },
    },
    h4: {
      fontFamily: khmerFont.style.fontFamily,
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
      [breakpoints.up('sm')]: {
        fontSize: '1.6667rem',
      },
      [breakpoints.up('md')]: {
        fontSize: '1.875rem',
      },
      [breakpoints.up('lg')]: {
        fontSize: '2.0833rem',
      },
    },
    h5: {
      fontFamily: khmerFont.style.fontFamily,
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.2,
      [breakpoints.up('sm')]: {
        fontSize: '1.4583rem',
      },
      [breakpoints.up('lg')]: {
        fontSize: '1.4583rem',
      },
    },
    h6: {
      fontFamily: khmerFont.style.fontFamily,
      fontWeight: 700,
      fontSize: '1.125rem',
      lineHeight: 1.2,
      [breakpoints.up('sm')]: {
        fontSize: '1.0417rem',
      },
      [breakpoints.up('lg')]: {
        fontSize: '1.0417rem',
      },
    },
  };
};
