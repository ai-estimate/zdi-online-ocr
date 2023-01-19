import {useSnackbar} from 'notistack';

export const useToast = () => {
  const {enqueueSnackbar} = useSnackbar();

  const permDenied = (msg?: string) => {
    enqueueSnackbar(
      msg || 'You do not have permission to perform this action',
      {
        variant: 'error',
        // autoHideDuration: null,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      },
    );
  };
  return {permDenied};
};
