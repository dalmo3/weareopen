import React, { Fragment } from 'react'
import { Typography, Button } from '@material-ui/core'
import { useAppContext } from '../AppController';


const LogInOut = (props) => {
  const {
    logout,
    loginWithPopup,
  } = useAppContext();

  return <Typography>
    <Button
      id={'login'}
      variant="contained"
      color="primary"
      onClick={loginWithPopup}
    >
      Log in
    </Button>
    <Button id={'logout'} variant="outlined" color="primary" onClick={logout}>
      Log out
    </Button>
  </Typography>
};


export const ProfilePage = props => (
<Fragment>
  <Typography>Profile page</Typography>
  <LogInOut/>
</Fragment>
)