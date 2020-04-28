import React from 'react';
import Button from '@material-ui/core/Button';
import { AppTheme } from './AppTheme';
import { Typography, Container } from '@material-ui/core';
import _debounce from 'lodash/debounce';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAppContext } from './AppController';
import { grey } from '@material-ui/core/colors';
import { AppRouter } from './AppRouter';
import Footer from './Footer';

export const AppView = (props) => {
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
          id="nav"
          toggleSidebar={toggleSidebar}
          handleInputChange={handleSearchInputChange}
        />
        <Sidebar openState={sideBarOpen} toggleSidebar={toggleSidebar} />
        <Container id="main" maxWidth="sm">
          <LogInOut />
          <AppRouter />
        </Container>
        <Footer id="footer"/>

      </Container>
    </AppTheme>
  );
};
