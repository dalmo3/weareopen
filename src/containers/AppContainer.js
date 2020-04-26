import React, { createContext, useContext } from 'react';
import { useAuth0 } from '../utils/Auth0Provider';
import { useStitch } from '../utils/StitchProvider';
import Button from '@material-ui/core/Button'

export const AppContainer = props => {
  const {
    stitchClient,
    stitchUser
   } = useStitch()

   const { loginWithPopup } = useAuth0();
  return <Button onClick={loginWithPopup}>Log in</Button>
}
