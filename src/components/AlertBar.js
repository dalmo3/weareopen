import React from 'react';
import { useSnackbarContext } from '../containers/AppController';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

const AlertBar = (props) => {
  const {
    snackBarState: { open, autoHideduration, severity, message },
    handleSnackbarClose,
  } = useSnackbarContext();

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideduration}
      onClose={handleSnackbarClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleSnackbarClose}
        severity={severity}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};
export default AlertBar;
