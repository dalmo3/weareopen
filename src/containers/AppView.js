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
          toggleSidebar={toggleSidebar}
          handleInputChange={handleSearchInputChange}
        />
        <Sidebar openState={sideBarOpen} toggleSidebar={toggleSidebar} />
        <Container maxWidth="sm">
          <LogInOut />
          <AppRouter/>
        </Container>
      </Container>
    </AppTheme>
  );
};
