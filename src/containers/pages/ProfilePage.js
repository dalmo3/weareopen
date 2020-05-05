import React from 'react';
import { useAppContext } from '../AppController';
import ResultList from '../../components/ResultList';
import { Typography, Button, Grid } from '@material-ui/core';

const LogInOut = (props) => {
  const { isVerified, handleAddIntent } = useAppContext();

  return (
    <Grid container justify="flex-start" spacing={2}>
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

const ProfilePage = (props) => {
  const { userMeta } = useAppContext();
  return (
    <>
      <Typography variant="h3">My businesses</Typography>
      {/* <Typography>My businesses</Typography> */}
      <ResultList results={userMeta.businesses} />
      <LogInOut />
    </>
  );
};

export default ProfilePage;
