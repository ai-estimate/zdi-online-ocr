import React from 'react';
import {Box, Container, Stack, Typography} from '@mui/material';
import {alpha} from '@mui/material/styles';
export const SIDE_NAV_WIDTH = 280;
export const TOP_NAV_HEIGHT = 64;

interface ILayoutProps {
  children: React.ReactNode;
}
export const Layout: React.FC<ILayoutProps> = ({children}) => {
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
          <Container maxWidth="xl">
            <Typography variant="h4">NextSpell</Typography>
          </Container>
        </Stack>
      </Box>
      <Box sx={{width: '100%', height: '100%', pt: 6}}>{children}</Box>
    </>
  );
};
