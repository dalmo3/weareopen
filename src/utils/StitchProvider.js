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

  // INITIALIZE DB
  const [stitchUser, setStitchUser] = useState({});
  const [stitchReady, setStitchReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      stitchClient.auth
        .loginWithCredential(
          isAuthenticated
            ? new CustomCredential(await getTokenSilently())
            : new AnonymousCredential()
        )
        .then((user) => {
          console.log(`logged in as ${user.loggedInProviderType} ${user.id}`);
          const stitchDb = stitchClient.getServiceClient(
            RemoteMongoClient.factory,
            'mongodb-atlas'
          );
          setStitchUser(user);
          setStitchReady(true);
        });
    };
    init();
  }, [isAuthenticated]);

  const stitchSearch = (query) => stitchClient.callFunction('searchbeta', [query])
  return (
    <StitchContext.Provider value={{ stitchClient, stitchUser, stitchReady, stitchSearch }}>
      {children}
    </StitchContext.Provider>
  );
};
