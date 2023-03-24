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

interface IProps {
  loading: boolean;
  data?: any;
  children?: any;
}
export const AsideLoader: React.FC<IProps> = React.memo(
  ({loading, data, children}) => {
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
        <Stack sx={{px: 8, width: '100%'}}>{children}</Stack>
      </StackStyled>
    );
  },
);

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

const StackStyled = styled(Stack)({
  height: 'auto',
  zIndex: 10,
  flex: 1,
  cursor: 'default',
});
