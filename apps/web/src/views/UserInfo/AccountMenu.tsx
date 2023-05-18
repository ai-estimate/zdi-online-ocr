import React from 'react';
import {
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

import {useUser} from '@/lib/auth/useUser';
import nProgress from 'nprogress';
import MenuOpenSharpIcon from '@mui/icons-material/MenuOpenSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import {ZDITransitionsPopper} from '@/src/components/Popover';

export const SIDE_NAV_WIDTH = 280;
export const TOP_NAV_HEIGHT = 64;

export const AccountMenu: React.FC = () => {
  const {user, logout}: any = useUser();

  const handelProfile = () => {
    console.log('Profile::');
  };

  const handleLogout = () => {
    nProgress.start();
    logout();
    setTimeout(() => {
      nProgress.done();
    }, 2000);
  };

  return (
    <>
      <ZDITransitionsPopper>
        <div className="flex justify-center items-center flex-col">
          <div className="flex flex-col justify-center items-center px-2 py-4">
            <IconButton onClick={handelProfile}>
              <ZDIBackgroundLetterAvatars name={user?.name} />
            </IconButton>
            <Typography variant="body2" color={'gray'}>
              {user?.email}
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
    </>
  );
};

export const AccountMenuPhone: React.FC = () => {
  const router = useRouter();
  const [state, setState] = React.useState({
    open: false,
  });
  const {user, logout}: any = useUser();
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

  const handleLogout = () => {
    nProgress.start();
    logout();
    setTimeout(() => {
      nProgress.done();
    }, 2000);
  };

  return (
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
          <ListItemButton onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <MenuOpenSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Menu" />
            <CloseSharpIcon />
          </ListItemButton>
          <Divider />
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
          <Divider />
          <div className="flex justify-center items-center flex-col">
            <div className="flex flex-col justify-center items-center px-2 py-4">
              <IconButton>
                <ZDIBackgroundLetterAvatars name={user?.name} />
              </IconButton>
              <Typography variant="body2" color={'gray'}>
                {user?.email}
              </Typography>
            </div>
            <div className="w-full border-t border-gray-300" />
          </div>
          <Divider />
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
          <Divider />
        </List>
      </Drawer>
    </Stack>
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
];
