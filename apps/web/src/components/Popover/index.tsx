import React from 'react';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {IconButton, Paper, colors} from '@mui/material';

interface IProps {
  children: React.ReactNode;
}
export const ZDITransitionsPopper = (props: IProps) => {
  const {children} = props;
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <div>
      <IconButton
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        sx={{
          svg: {
            width: 40,
            height: 40,
            '&:hover': {
              color: 'darkblue',
            },
          },
        }}>
        <AccountCircleIcon />
      </IconButton>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement={'bottom-end'}
        transition
        sx={{
          zIndex: 1101,
          boxShadow: '0 0 10px 0 rgb(0 0 0 / 10%)',
          borderRadius: 1,
        }}>
        {({TransitionProps}) => (
          <Fade {...TransitionProps} timeout={150}>
            <Paper
              sx={{
                width: 280,
              }}>
              {children}
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};
