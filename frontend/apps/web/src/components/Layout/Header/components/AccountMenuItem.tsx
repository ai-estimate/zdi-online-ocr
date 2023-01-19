import React from 'react';
import {
  MenuItem,
  Stack,
  Typography,
  Button,
  Divider,
  Avatar,
} from '@mui/material';
import {getAvatar} from 'src/utils';

const AccountMenuItem = React.memo(({user, onShowDialog}: any) => {
  const isFullName = !!(user?.firstName && user?.lastName);
  const avatar = user?.avatar?.url;

  return (
    <>
      <MenuItem
        disableRipple
        sx={{
          p: 1,
          cursor: 'default',
          ':hover': {
            backgroundColor: 'transparent',
          },
        }}>
        <Stack flex="1">
          <Typography
            variant="h2"
            sx={{
              fontSize: '10px',
              lineHeight: '14px',
              color: '#667085',
              pb: 1,
            }}>
            ACCOUNT
          </Typography>
          <Stack direction="row" alignItems="center" pl={0.5}>
            <Avatar src={avatar}>{getAvatar(user)}</Avatar>
            <Stack>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '18px',
                  color: '#003566',
                }}>
                {isFullName
                  ? user?.firstName + ' ' + user?.lastName
                  : user?.name}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 400,
                  fontSize: '10px',
                  lineHeight: '16px',
                  color: '#667085',
                }}>
                {user?.email || ''}
              </Typography>
            </Stack>
          </Stack>
          <Stack pt={2}>
            <Button
              variant="text"
              fullWidth
              size="small"
              disableRipple
              sx={{
                justifyContent: 'flex-start',
                fontFamily: 'Inter',
                fontSize: '14px',
                lineHeight: '20px',
                color: '#344054',
                ':hover': {
                  color: '#003566',
                },
              }}
              onClick={onShowDialog}>
              Account settings
            </Button>
          </Stack>
        </Stack>
      </MenuItem>
      <Divider sx={{'&.MuiDivider-root': {margin: '0px'}}} />
    </>
  );
});

export default AccountMenuItem;
