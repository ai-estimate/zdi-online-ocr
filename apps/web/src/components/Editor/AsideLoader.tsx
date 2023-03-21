import React from 'react';
import {
  Box,
  LinearProgress,
  Skeleton,
  Stack,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material';
import ImproSvg from '@components/svgs/improment.svg';

import {Koh_Santepheap} from 'next/font/google';

const khmerFont = Koh_Santepheap({
  weight: ['300', '400', '700'],
  subsets: ['latin', 'khmer'],
  display: 'swap',
});
interface IProps {
  loading: boolean;
  data: any;
}
export const AsideLoader: React.FC<IProps> = React.memo(({loading, data}) => {
  return (
    <StackStyled
      justifyContent="center"
      alignItems="center"
      sx={{
        position: 'sticky',
        top: 'var(--nav-height)',
      }}>
      {loading ? (
        <Box sx={{width: '100%'}}>
          <LinearProgress />
        </Box>
      ) : (
        <>
          <Box sx={{height: 4}}></Box>
        </>
      )}
      <Stack sx={{px: 8, py: 4, width: '100%'}}>
        <Box sx={{'--kh-font-family': khmerFont.style.fontFamily}}>
          <div
            dangerouslySetInnerHTML={{
              __html: data,
            }}
          />
        </Box>
      </Stack>
    </StackStyled>
  );
});

const variants = [
  'h1',
  'h3',
  'body1',
  'caption',
  'h3',
  'body1',
  'caption',
  'body1',
  'caption',
  'body1',
  'caption',
] as readonly TypographyProps['variant'][];

const Loading = ({loading = true}) => {
  return (
    <Box sx={{width: '100%', px: 6, pt: 2}}>
      {variants.map((variant, i) => (
        <Typography component="div" key={i} variant={variant}>
          {loading ? <Skeleton sx={{mt: 1}} /> : variant}
        </Typography>
      ))}
    </Box>
  );
};

const StackStyled = styled(Stack)({height: 'auto', zIndex: 10, flex: 1});

const ImproSvgStyled = styled(Box)({
  svg: {
    width: '16rem !important',
    height: '16rem !important',
  },
});
