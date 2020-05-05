import React from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { useAppContext } from '../AppController';
import { Link } from '@reach/router';

const RouterTests = (props) => (
  <Typography>
    <Button component={Link} to="/profile">
      Profile
    </Button>
    <Button component={Link} to="/tests">
      Tests
    </Button>
    <Button
      variant="outlined"
      component={Link}
      to="/business/Onehunga%20Medical%20(2012)%20Ltd"
    >
      Business not owned
    </Button>
    <Button
      variant="outlined"
      component={Link}
      to="/business/Zirco%20Abrasive%20Products%20Ltd"
    >
      Business owned
    </Button>
  </Typography>
);

const TestPage = (props) => {
  const { logout, loginWithPopup, loginWithRedirect } = useAppContext();
  return (
    <>
      <RouterTests />
      <Grid container justify="flex-start" spacing={2}>
        <Grid item>
          <Button
            id={'login'}
            variant="contained"
            color="secondary"
            onClick={loginWithPopup}
          >
            Log in (Popup)
          </Button>
        </Grid>
        <Grid item>
          <Button
            id={'login'}
            variant="contained"
            color="secondary"
            onClick={loginWithRedirect}
          >
            Log in (Redirect)
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
    </>
  );
};

export default TestPage;
