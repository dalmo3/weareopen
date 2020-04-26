import React, { createContext, useContext, Fragment } from 'react';
import { useAuth0 } from '../utils/Auth0Provider';
import { useStitch } from '../utils/StitchProvider';
import Button from '@material-ui/core/Button';
import { AppTheme } from './AppTheme';
import { Typography } from '@material-ui/core';

export const AppContainer = (props) => {
  const { stitchClient, stitchUser } = useStitch();

  const { loginWithPopup, logout, isAuthenticated } = useAuth0();

  return (
    <AppTheme>
      <Button id={'login'} onClick={loginWithPopup}>
        Log in
      </Button>
      <Button id={'logout'} onClick={logout}>
        Log out 
      </Button>
      <Typography>
        You're logged {isAuthenticated ? `in` : `out`}
      </Typography>
    </AppTheme>
  )
};
