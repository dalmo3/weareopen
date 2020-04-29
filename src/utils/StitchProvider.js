import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from './Auth0Provider';
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient,
  CustomCredential,
  findOneAndUpdate,
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
    const init = async (auth) => {
      const credentials = auth
        ? new CustomCredential(await getTokenSilently())
        : new AnonymousCredential();
      // if (loading) return
      stitchAppClient.auth.loginWithCredential(credentials).then((user) => {
        console.log(`logged in as ${user.loggedInProviderType} ${user.id}`);
        // console.log(user);
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

    if (loading) init();
    if (!loading && isAuthenticated) init(true);
  }, [loading, isAuthenticated, getTokenSilently]);

  const stitchSearch = (query) =>
    stitchAppClient.callFunction('searchbeta', [query]);

  const findBusinessByTitle = (title) => stitchDb.findOne({ title });
  const findOneAndUpdate = (business) =>
    stitchDb.findOneAndUpdate(
      { _id: business._id },
      { $set: business },
      { returnNewDocument: true }
    );

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
