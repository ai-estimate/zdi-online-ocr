import React from 'react';
import {Box, Button, Stack, Typography} from '@mui/material';
import {alpha} from '@mui/material/styles';
import {useRouter} from 'next/router';
import PhoneIcon from '@mui/icons-material/Phone';
import {useUser} from '@/lib/auth/useUser';
import {AccountMenu, AccountMenuPhone} from '@/src/views/UserInfo/AccountMenu';

export const SIDE_NAV_WIDTH = 280;
export const TOP_NAV_HEIGHT = 64;

interface ILayoutProps {
  children: React.ReactNode;
  branch?: string;
  sx?: any;
}
export const Layout: React.FC<ILayoutProps> = ({children, branch, sx = {}}) => {
  const router = useRouter();
  const {user, logout}: any = useUser();

  const handleGoHome = () => {
    if (router.pathname === '/home') {
      return;
    }
    if (user) {
      router.replace('/home');
      return;
    }
    router.replace('/');
  };

  const handleGoPlans = () => {
    if (router.pathname === '/plans') {
      return;
    }
    router.replace('/plans');
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
          ...sx,
        }}>
        <Stack
          alignItems="center"
          direction={{xs: 'row', sm: 'row'}}
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            '& img': {
              width: {xs: 100, sm: 200},
            },
          }}>
          <Box sx={{px: {xs: 0, sm: 4}}}>
            <Button onClick={handleGoHome}>
              {branch ? (
                <Typography>{branch}</Typography>
              ) : (
                <img src="https://nextspell.com/logo.png" />
              )}
            </Button>
          </Box>
          <Stack
            sx={{
              flexDirection: 'row',
              display: {xs: 'none', sm: 'flex'},
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              px: {xs: 0, sm: 4},
            }}>
            <Box>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleGoPlans}>
                <Typography>Plans</Typography>
              </Button>
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={0.5}>
              <PhoneIcon sx={{fontSize: 18}} />
              <Typography variant="body2" component="a" href="tel:095333409">
                095-333-409
              </Typography>
            </Stack>

            <AccountMenu />
          </Stack>

          <AccountMenuPhone />
        </Stack>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          '--nav-height': `${TOP_NAV_HEIGHT}px`,
        }}>
        {children}
      </Box>
    </>
  );
};
