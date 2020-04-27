import React, {
  createContext,
  useContext,
  Fragment,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useAuth0 } from '../utils/Auth0Provider';
import { useStitch } from '../utils/StitchProvider';
import Button from '@material-ui/core/Button';
import { AppTheme } from './AppTheme';
import { Typography, Container } from '@material-ui/core';
import ResultList from '../components/ResultList';
import _debounce from 'lodash/debounce';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAppContext } from './AppController';

export const AppContainer = (props) => {
  const {
    toggleSidebar,
    handleSearchInputChange,
    sideBarOpen,
    logout,
    isAuthenticated,
    results,
    handleClaim,
    loginWithPopup
  } = 
  useAppContext();

  return (
    <AppTheme>
      <Navbar
        toggleSidebar={toggleSidebar}
        handleInputChange={handleSearchInputChange}
      />
      <Sidebar openState={sideBarOpen} toggleSidebar={toggleSidebar} />
      <Container maxWidth="sm">
        <Button
          id={'login'}
          variant="contained"
          color="primary"
          onClick={loginWithPopup}
        >
          Log in
        </Button>
        <Button
          id={'logout'}
          variant="outlined"
          color="primary"
          onClick={logout}
        >
          Log out
        </Button>
        <Typography>You're logged {isAuthenticated ? `in` : `out`}</Typography>
        <ResultList results={results} handleClaim={handleClaim} />
      </Container>
    </AppTheme>
  );
};
