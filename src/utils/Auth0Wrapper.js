/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import React from 'react';
import { Auth0Provider } from './Auth0Provider';
// import { createHistory, createMemorySource } from  "@reach/router"

// const onRedirectCallback = appState => {
//   createHistory(createMemorySource(
//     appState && appState.targetUrl
//       ? appState.targetUrl
//       : window.location.pathname
//   ));
// };

export const Auth0Wrapper = ({children}) => (
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    client_id={process.env.REACT_APP_AUTH0_CLIENTID}
    audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    scope={'openid'}
    // responseType={'token id_token'}
    responseType={'token'}
    redirect_uri={window.location.origin}
    // onRedirectCallback={onRedirectCallback}
    cacheLocation='localstorage'
  >
    {children}
  </Auth0Provider>
);
