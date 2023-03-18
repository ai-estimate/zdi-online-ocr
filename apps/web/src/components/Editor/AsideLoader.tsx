import React from 'react';
import {
  Box,
  Skeleton,
  Stack,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material';
import ImproSvg from '@components/svgs/improment.svg';

interface IProps {
  loading: boolean;
}
export const AsideLoader: React.FC<IProps> = React.memo(({loading}) => {
  return (
    <StackStyled
      justifyContent="center"
      alignItems="center"
      sx={{
        position: 'sticky',
        top: 'var(--nav-height)',
      }}>
      {loading ? (
        <Loading />
      ) : (
        <Stack sx={{pt: 8}}>
          <ImproSvgStyled>
            <ImproSvg />
          </ImproSvgStyled>
          <Typography>That’s quite an improvement!</Typography>
        </Stack>
      )}
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
