import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useAuth0 } from './Auth0Provider';
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient,
  CustomCredential,
} from 'mongodb-stitch-browser-sdk';


export const StitchContext = createContext();
export const useStitch = () => useContext(StitchContext);

const stitchClient = Stitch.initializeDefaultAppClient(
  process.env.REACT_APP_STITCH_APP
);

export const StitchProvider = ({ children, ...initOptions }) => {
  const {
    getTokenSilently,
    getTokenWithPopup,
    loading,
    isAuthenticated,
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
  } = useAuth0();

  // const [loaded, setLoaded] = useState(false)
  // useEffect(() => setLoaded(!loading), [loading])

  const handleLogIn = async (e) => {
    if (!isAuthenticated && loading) {
      loginWithPopup();
    }
  };

  const handleLogOut = async (e) => {
    if (isAuthenticated) {
      // console.log("loggin out out Stitch ...")
      // await client.current.auth?.logout()
      console.log('loggin out of Auth0 ...');
      logout();
    } else {
      console.log('not logged in');
    }
  };

  // INITIALIZE DB anonymously
  const [stitchUser, setStitchUser] = useState({});

  useEffect(() => {
    const init = async () => {
      //  stitchConnected ||
      // Stitch.initializeDefaultAppClient(process.env.REACT_APP_STITCH_APP);
      stitchClient.auth
        .loginWithCredential(new AnonymousCredential())
        .then((user) => {
          console.log(`logged in anonymously as user ${user.id}`);
          const stitchDb = stitchClient.getServiceClient(
            RemoteMongoClient.factory,
            'mongodb-atlas'
          );
          setStitchUser(user);
        });
    };
    init();
  }, []);

  return (
    <StitchContext.Provider value={{ stitchClient, stitchUser }}>
      {children}
    </StitchContext.Provider>
  );
};
