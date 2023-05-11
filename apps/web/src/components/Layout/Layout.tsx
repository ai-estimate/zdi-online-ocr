import React from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import {alpha} from '@mui/material/styles';
import {useRouter} from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import LogoutIcon from '@mui/icons-material/Logout';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import {ZDIBackgroundLetterAvatars} from 'src/components/Avater';
import {ZDITransitionsPopper} from '../Popover';

export const SIDE_NAV_WIDTH = 280;
export const TOP_NAV_HEIGHT = 64;

interface ILayoutProps {
  children: React.ReactNode;
  branch?: string;
  sx?: any;
}
export const Layout: React.FC<ILayoutProps> = ({children, branch, sx = {}}) => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handelProfile = () => {
    console.log('click::');
  };

  const handleLogout = () => {
    router.push('/auth/login');
  };

  const [state, setState] = React.useState({
    open: false,
  });

  const {open} = state;

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({open: open});
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
          <Box sx={{px: 4}}>
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
                onClick={() => router.push('/plans')}>
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

            <ZDITransitionsPopper>
              <div className="flex justify-center items-center flex-col">
                <div className="flex flex-col justify-center items-center px-2 py-4">
                  <IconButton onClick={handelProfile}>
                    <ZDIBackgroundLetterAvatars name="Next Spell" />
                  </IconButton>
                  <Typography variant="body2" color={'gray'}>
                    nextspell@gmail.com
                  </Typography>
                </div>
                <div className="w-full border-t border-gray-300" />
                <div className="flex flex-col justify-center items-center px-2 py-4">
                  <button
                    className='className="w-full px-6 py-1.5 transition duration-300 bg-blue-500 hover:bg-blue-600 shadow text-white font-semibold rounded-lg sm:w-auto"'
                    onClick={handleLogout}>
                    Sign out
                  </button>
                </div>
              </div>
            </ZDITransitionsPopper>
          </Stack>

          <Stack
            sx={{
              flexDirection: {xs: 'row'},
              display: {xs: 'flex', sm: 'none'},
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button onClick={toggleDrawer(true)}>
              <MenuIcon /> Menu
            </Button>
            <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
              <List>
                {MENU_ITEMS.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      sx={{
                        '&:hover': {
                          backgroundColor: (theme) =>
                            alpha(theme.palette.primary.main, 0.1),
                        },
                        bgcolor: (theme) =>
                          router.pathname === item?.link
                            ? alpha(theme.palette.primary.main, 0.1)
                            : 'transparent',
                      }}
                      onClick={() => router.push(item?.link)}>
                      <ListItemIcon>{item?.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
                <Divider />
                <ListItemButton component="a" href="tel:095333409">
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText primary="095-333-409" />
                </ListItemButton>
              </List>
            </Drawer>
          </Stack>
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

const MENU_ITEMS = [
  {
    label: 'Home',
    icon: <HomeIcon />,
    link: '/home',
  },
  {
    label: 'Plans',
    icon: <RequestQuoteIcon />,
    link: '/plans',
  },
  {
    label: 'Logout',
    icon: <LogoutIcon />,
    link: '/auth/signin',
  },
];
