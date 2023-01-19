import React, {useCallback, useState} from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Portal,
  IconButton,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import {DialogContext, IDialog, IMessage, IconTypeEnum} from '.';
import styled from 'styled-components';
import {LoadingButton} from '@mui/lab';
import {isEmpty} from 'lodash';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface ISubmit {
  loading: boolean;
}

const DialogProvider = ({children}: any) => {
  const [message, setMessage]: any = useState<IDialog>(null);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');
  const confirm: any = useCallback((message: IMessage) => {
    const type = message?.type || '';
    if (message) setMessage({...message, type});
  }, []);

  const alert: any = useCallback((message: IMessage) => {
    setMessage({...message, isAlert: true});
  }, []);

  const handleClose = () => {
    setMessage(null);
    setLoading(false);
    setComment('');
  };

  const open = !!message;
  const actionBtn = message?.actionBtn;
  const autoHeight = message?.autoHeight;
  const actionIcon = message?.actionIcon;

  const updateSubmit = useCallback(
    ({loading}: ISubmit) => {
      setLoading(loading);
    },
    [setLoading],
  );
  const handleComment = (e: any) => {
    setComment(e.target.value);
  };
  const disabled = message?.showComment && isEmpty(comment);

  return (
    <DialogContext.Provider value={{confirm, alert}}>
      {children}
      <Portal>
        <StyledDialog
          open={open}
          onClose={handleClose}
          sx={{
            '&& .MuiPaper-root': {
              width: 320,
              height: !autoHeight ? 220 : 'auto',
            },
          }}
          aria-labelledby="z1data-dialog-title"
          aria-describedby="z1data-dialog-description">
          {message?.title && (
            <DialogTitle>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="left"
                spacing={1}>
                {message?.actionIcon && (
                  <HeaderIcon type={message.actionIcon} />
                )}
                <span>{message.title} </span>
              </Stack>
              <IconButton
                size="small"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  color: '#344054',
                  svg: {
                    height: 22,
                    width: 22,
                  },
                }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
          )}
          <DialogContent className="dialog-content">
            <div id="z1data-dialog-description">
              {message?.text}
              {message?.showComment && (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  size="small"
                  sx={{
                    mt: 2,
                  }}
                  onChange={handleComment}
                />
              )}
            </div>
          </DialogContent>
          <DialogActions className="dialog-actions">
            <Button
              onClick={handleClose}
              variant="outlined"
              fullWidth
              sx={{
                mr: 1,
                borderColor: 'rgba(86, 103, 137, 0.26)',
                color: '#344054',
              }}>
              {message?.isAlert ? 'Ok' : actionBtn?.cancel || 'No'}
            </Button>
            {actionBtn && (
              <LoadingButton
                disableElevation
                onClick={() =>
                  actionBtn.action(handleClose, updateSubmit, comment)
                }
                loading={loading}
                fullWidth
                disabled={disabled}
                data-testid="dialog-action-button"
                variant="contained"
                sx={
                  actionIcon === IconTypeEnum.DANGER
                    ? {
                        backgroundColor: '#B2000F',
                        '&:hover': {
                          backgroundColor: '#F37878',
                        },
                      }
                    : actionIcon === IconTypeEnum.INFO ||
                      actionIcon === IconTypeEnum.WARNING
                    ? {backgroundColor: '#002957'}
                    : {}
                }>
                {actionBtn.label}
              </LoadingButton>
            )}
          </DialogActions>
        </StyledDialog>
      </Portal>
    </DialogContext.Provider>
  );
};

const HeaderIcon = React.memo(({type}: any) => {
  return (
    <>
      {type === IconTypeEnum.DANGER && (
        <HelpOutlineIcon sx={{color: '#B2000F'}} />
      )}
      {type === IconTypeEnum.INFO && (
        <HelpOutlineIcon sx={{color: '#286EA3'}} />
      )}
      {type === IconTypeEnum.WARNING && (
        <img src={'/assets/svgs/errorIcon.svg'} />
      )}
    </>
  );
});
const StyledDialog = styled(Dialog)`
  && {
    .dialog-content {
      overflow: hidden;
      padding: 0 24px;
    }
    #z1data-dialog-description {
      color: #667085;
    }
    .dialog-actions {
      justify-content: space-between;
      padding: ${({theme}) => theme.spacing(3)};
    }
    strong {
      color: #000;
    }
  }
`;

export default DialogProvider;
