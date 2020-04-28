import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
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

const stitchAppClient = Stitch.initializeDefaultAppClient(
  process.env.REACT_APP_STITCH_APP
);

export const StitchProvider = ({ children, ...initOptions }) => {
  const {
    getTokenSilently,
    loading,
    isAuthenticated,
    loginWithPopup,
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
  const [stitchDb, setStitchDb] = useState({});

  useEffect(() => {
    const init = async () => {
      if (loading) return
      stitchAppClient.auth
        .loginWithCredential(
          isAuthenticated
            ? new CustomCredential(await getTokenSilently())
            : new AnonymousCredential()
        )
        .then((user) => {
          console.log(`logged in as ${user.loggedInProviderType} ${user.id}`);
          setStitchUser(user);
          setStitchDb(
            stitchAppClient
              .getServiceClient(
                RemoteMongoClient.factory,
                process.env.REACT_APP_STITCH_CLUSTER
              )
              .db(process.env.REACT_APP_STITCH_DB)
              .collection(process.env.REACT_APP_STITCH_COLLECTION)
          );
          setStitchReady(true);
        });
    };
    init();
  }, [isAuthenticated]);

  const stitchSearch = (query) =>
    stitchAppClient.callFunction('searchbeta', [query]);

  const findBusinessByTitle = (title, cb) => {
    setCurrentRequest(['findOne', { title }, cb]);
  };

  const [currentRequest, setCurrentRequest] = useState(false);
  const [requestPending, setRequestPending] = useState(false);

  useEffect(() => {
    const performRequest = async () => {
      if (!currentRequest) return;
      if (!stitchReady) return;
      const [fn, args, cb] = currentRequest;
      cb(await stitchDb[fn](args))
      setCurrentRequest(false)
    }
    performRequest()
  }, [currentRequest, requestPending, stitchReady]);

  return (
    <StitchContext.Provider
      value={{
        stitchClient: stitchAppClient,
        stitchUser,
        stitchReady,
        stitchSearch,
        findBusinessByTitle,
      }}
    >
      {children}
    </StitchContext.Provider>
  );
};
