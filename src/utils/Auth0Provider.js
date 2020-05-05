// src/react-auth0-spa.js
import React, { useState, useEffect, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth0 = async () => {
      try {
        console.log('initializing auth0client... ');
        const auth0FromHook = await createAuth0Client(initOptions);
        console.log('initialized auth0client... ');
        setAuth0(auth0FromHook);

        if (
          window.location.search.includes('code=') &&
          window.location.search.includes('state=')
        ) {
          const { appState } = await auth0FromHook.handleRedirectCallback();
          onRedirectCallback(appState);
        }

        const isAuthenticated = await auth0FromHook.isAuthenticated();

        setIsAuthenticated(isAuthenticated);

        if (isAuthenticated) {
          const user = await auth0FromHook.getUser();
          setUser(user);
          console.log('auth0entitcated...');
          setIsVerified(user.email_verified);
        }
      } catch (e) {
        console.error('error creating auth0 client', e);
      }
      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const [loginTimedOut, setLoginTimedOut] = useState(false);
  const [loginUnauthorized, setLoginUnauthorized] = useState(false);

  const loginHelper = async (method, params) => {
    switch (method) {
      case 'popup':
        await auth0Client.loginWithPopup(params);
        break;
      case 'redirect':
        await auth0Client.loginWithRedirect(params);
        break;
      default:
        throw new Error(
          'Invalid login method. Select one of popup or redirect'
        );
    }
  };

  const loginWith = async (
    method,
    params = {
      prompt: 'login',
      // display: 'touch'
    }
  ) => {
    // await loginHelper(method, params);
    switch (method) {
      case 'popup':
        try {
          setLoginTimedOut(false);
          setLoginUnauthorized(false);
          await auth0Client.loginWithPopup(params);

          // await auth0Client.loginWithPopup(params);
          // await auth0Client.loginWithRedirect(params).then(token => {
          //   console.log('token', token)
          // });
          const user = await auth0Client.getUser();
          console.log('auth');
          setUser(user);
          setIsAuthenticated(true);
          setLoginTimedOut(false);
          setIsVerified(user?.email_verified);
          console.log('auth0 logged in as', user);
        } catch (error) {
          switch (error.error) {
            case 'timeout':
              // alert('Session expired, please log in again.');
              setLoginTimedOut(true);
              console.log(error);
              error.popup.close();
              break;
            case 'unauthorized':
              // alert(
              //   'Please check for verification email and follow link before logging in.'
              // );
              setLoginUnauthorized(true);
              break;
          }
        }
        // console.error('loginWithPopup error');
        // console.error(error);
        break;
      case 'redirect':
        await auth0Client.loginWithRedirect(params);
        break;
      default:
        throw new Error(
          'Invalid login method. Select one of popup or redirect'
        );
    }
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setIsAuthenticated(true);
    setUser(user);
    setIsVerified(user?.email_verified);
    setLoading(false);
    console.log('auth0 logged in as', user);
  };

  const logout = (...p) => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    auth0Client.logout({
      returnTo: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      ...p,
    });
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        isVerified,
        user,
        loading,
        loginTimedOut,
        loginUnauthorized,
        handleRedirectCallback,
        loginWithPopup: (...p) => loginWith('popup', ...p),
        loginWithRedirect: (...p) => loginWith('redirect', ...p),
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        // loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout,
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
