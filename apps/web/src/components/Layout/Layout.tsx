import React from 'react';
import {Box, Button, IconButton, Stack, Typography} from '@mui/material';
import {alpha} from '@mui/material/styles';
import {useRouter} from 'next/router';
import PhoneIcon from '@mui/icons-material/Phone';
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
          direction={{xs: 'column', sm: 'row'}}
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
              flexDirection: {xs: 'column', sm: 'row'},
              display: {xs: 'none', sm: 'flex'},
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              px: 2,
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
                <div className="w-full h-0.5 bg-gray-300 my-1" />
                <div className="flex flex-col justify-center items-center px-2 py-4">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => router.push('/auth/signin')}>
                    <Typography>Sign out</Typography>
                  </Button>
                </div>
              </div>
            </ZDITransitionsPopper>
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
