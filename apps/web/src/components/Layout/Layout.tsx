import React from 'react';
import {Box, Button, Container, Stack, Typography} from '@mui/material';
import {alpha} from '@mui/material/styles';
import {useRouter} from 'next/router';
export const SIDE_NAV_WIDTH = 280;
export const TOP_NAV_HEIGHT = 64;

interface ILayoutProps {
  children: React.ReactNode;
  branch?: string;
}
export const Layout: React.FC<ILayoutProps> = ({children, branch}) => {
  const router = useRouter();
  const handleGoHome = () => {
    router.push('/');
  };
  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar,
        }}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{minHeight: TOP_NAV_HEIGHT}}>
          <Box sx={{px: 4}}>
            <Button onClick={handleGoHome}>
              <Typography variant="h4">{branch || 'NextSpell'}</Typography>
            </Button>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          px: 4,
          '--nav-height': `${TOP_NAV_HEIGHT}px`,
        }}>
        {children}
      </Box>
    </>
  );
};
