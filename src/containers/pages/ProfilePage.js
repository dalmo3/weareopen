import React from 'react';
import { useAppContext } from '../AppController';
import ResultList from '../../components/ResultList';
import { Typography, Button, Grid } from '@material-ui/core';

const LogInOut = (props) => {
  const {
    isVerified,
    isAuthenticated,
    handleAddIntent,
    logout,
    loginWithPopup,
  } = useAppContext();

  return (
    <Grid container direction="column" justify="flex-start" alignItems="center" spacing={1}>
      <Grid item>
        <Button
          id={'btn-add-new'}
          variant="contained"
          color="secondary"
          disabled={!isAuthenticated || !isVerified}
          onClick={handleAddIntent}
        >
          Add New Business
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="body2">
          {isAuthenticated
            ? !isVerified
              ? 'Please verify your email first, then log in again.'
              : null
            : 'Please log in to add or edit your business'}
        </Typography>
      </Grid>
      {!isAuthenticated ? (
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
      ) : (
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
      )}
    </Grid>
  );
};

const ProfilePage = (props) => {
  const { userMeta } = useAppContext();
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h4">My businesses</Typography>
      </Grid>
      <Grid item>
        <ResultList results={userMeta.businesses} />
      </Grid>
      <Grid item>
        <LogInOut />
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
