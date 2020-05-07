import React, { createContext, useContext, useState, useEffect } from 'react';
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

const StitchProvider = ({ children, ...initOptions }) => {
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

  const stitchLogout = async (e) => {
    if (isAuthenticated) {
      // console.log('loggin out out Stitch ...');
      await stitchAppClient.auth?.removeUser();
    } else {
      // console.log('not logged in');
    }
    // console.log('loggin out of Auth0 ...');
    logout();
  };

  // INITIALIZE DB
  const [stitchUser, setStitchUser] = useState({});
  const [stitchReady, setStitchReady] = useState(false);
  const [remoteMongoCollection, setRemoteMongoCollection] = useState({});

  useEffect(() => {
    const init = async (auth) => {
      const credentials = auth
        ? new CustomCredential(await getTokenSilently())
        : new AnonymousCredential();
      // if (loading) return

      // console.log(stitchAppClient.auth.listUsers())
      stitchAppClient.auth
        .loginWithCredential(credentials)
        .then((user) => {
          // console.log(`logged in as ${user.loggedInProviderType} ${user.id}`);
          // console.log(user);
          setStitchUser(user);
          setRemoteMongoCollection(
            stitchAppClient
              .getServiceClient(
                RemoteMongoClient.factory,
                process.env.REACT_APP_STITCH_CLUSTER
              )
              .db(process.env.REACT_APP_STITCH_DB)
              .collection(process.env.REACT_APP_STITCH_COLLECTION)
          );
          setStitchReady(true);
        })
        .catch(console.error);
    };

    if (loading && !isAuthenticated) init();
    if (!loading && isAuthenticated) init(true);
  }, [loading, isAuthenticated]);

  const stitchSearch = (query) =>
    stitchAppClient.callFunction('searchbeta', [query]);

  const stitchClaim = (id) =>
    stitchAppClient.callFunction('claimBusiness', [id]);

  const findBusinessByTitle = (title) =>
    remoteMongoCollection.findOne({ title });
  const findOneAndUpdate = (business) =>
    remoteMongoCollection.findOneAndUpdate(
      { _id: business._id },
      { $set: business },
      { returnNewDocument: true, upsert: true }
    );

  const insertOne = (business) =>
    remoteMongoCollection.findOneAndUpdate(
      business._id ? { _id: business._id } : { title: business.title },
      { $set: business },
      { returnNewDocument: true, upsert: true }
    );

  const findUserBusinesses = () =>
    remoteMongoCollection.find({ 'admin.admin_id': stitchUser.id }).toArray();

  return (
    <StitchContext.Provider
      value={{
        stitchClient: stitchAppClient,
        stitchUser,
        stitchReady,
        stitchSearch,
        stitchClaim,
        findBusinessByTitle,
        findOneAndUpdate,
        findUserBusinesses,
        stitchLogout,
        insertOne,
      }}
    >
      {children}
    </StitchContext.Provider>
  );
};

export default StitchProvider;
