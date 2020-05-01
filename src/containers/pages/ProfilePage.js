import React, { Fragment } from 'react';
import { Typography, Button, Grid } from '@material-ui/core';
import { useAppContext } from '../AppController';
import { navigate } from '@reach/router';

const LogInOut = (props) => {
  const {
    logout,
    loginWithPopup,
    isVerified,
    handleAddIntent,
  } = useAppContext();

  return (
    <Grid container justify="flex-start" spacing={2}>
      <Grid item>
        <Button
          id={'login'}
          variant="contained"
          color="primary"
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
      <Grid item>
        <Button
          id={'btn-add-new'}
          variant="contained"
          color="secondary"
          disabled={!isVerified}
          onClick={handleAddIntent}
        >
          Add New Business
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="body2" component="span">
          {!isVerified ? 'Please verify your email first' : null}
        </Typography>
      </Grid>
    </Grid>
  );
};

const ProfilePage = (props) => (
  <Fragment>
    <Typography>Profile page</Typography>
    <LogInOut />
  </Fragment>
);

export default ProfilePage;
