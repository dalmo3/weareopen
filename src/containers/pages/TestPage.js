import React from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { useAppContext } from '../AppController';

const TestPage = (props) => {
  const {
    logout,
    loginWithPopup,
  } = useAppContext();
  return (
    <Grid container justify="flex-start" spacing={2}>
      <Grid item>
        <Button
          id={'login'}
          variant="contained"
          color="secondary"
          onClick={loginWithPopup}
        >
          Log in
        </Button>
      </Grid>
      <Grid item>
        <Button
          id={'logout'}
          variant="outlined"
          color="primary"
          onClick={logout}
        >
          Log out
        </Button>
      </Grid>
    </Grid>
  );
};

export default TestPage;