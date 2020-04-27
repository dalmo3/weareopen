import React, {
  createContext,
  useContext,
  Fragment,
  useEffect,
  useState,
  useCallback,
  Children,
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
import { Link, Router } from '@reach/router';
import { ProfilePage } from './ProfilePage';
import { BusinessCard } from '../components/BusinessCard';
import { BusinessForm } from '../components/BusinessForm';
import { grey } from '@material-ui/core/colors';

export const AppContainer = (props) => {
  const {
    toggleSidebar,
    handleSearchInputChange,
    sideBarOpen,
    logout,
    isAuthenticated,
    results,
    handleClaim,
    loginWithPopup,
  } = useAppContext();

  const TestRouterPage = (props) => <div>TestRouterPage</div>;
  const TestParameterPage = (props) => <div>{props.testSlug}</div>;
  const RouterTests = (props) => (
    <Typography>
      <Button component={Link} to="/">
        Home
      </Button>
      <Button component={Link} to="profile">
        Profile
      </Button>
      <Button component={Link} to="business/abc">
        Business
      </Button>
      <Button component={Link} to="parameter/abc">
        Parameters
      </Button>
      <Button component={Link} to="addnew">
        Add New Parameter (navigate)
      </Button>
    </Typography>
  );

  const LogInOut = (props) => (
    <Typography>
      <Button
        id={'login'}
        variant="contained"
        color="primary"
        onClick={loginWithPopup}
      >
        Log in
      </Button>
      <Button id={'logout'} variant="outlined" color="primary" onClick={logout}>
        Log out
      </Button>
    </Typography>
  );
  return (
    <AppTheme>
      <Container
        id="app"
        style={{ height: '100vh', backgroundColor: grey[50] }}
        disableGutters={true}
        maxWidth={false}
      >
        <Navbar
          toggleSidebar={toggleSidebar}
          handleInputChange={handleSearchInputChange}
        />
        <Sidebar openState={sideBarOpen} toggleSidebar={toggleSidebar} />
        <Container maxWidth="sm">
          <LogInOut />
          <RouterTests />
          <Router>
            <TestParameterPage path="parameter/:testSlug" />
            <BusinessCard
              path="business/:businessSlug"
              result={results[0]}
            ></BusinessCard>
            <TestRouterPage default />
            <ProfilePage path="profile" />
            <BusinessForm path="addnew" />
          </Router>
          <ResultList results={results} handleClaim={handleClaim} />
        </Container>
      </Container>
    </AppTheme>
  );
};
