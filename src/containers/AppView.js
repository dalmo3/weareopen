import React from 'react';
import { AppTheme } from './AppTheme';
import { Container, Typography, Button } from '@material-ui/core';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAppContext } from './AppController';
import { grey } from '@material-ui/core/colors';
import { AppRouter } from './AppRouter';
import Footer from './Footer';
import { Link } from '@reach/router';

const RouterTests = (props) => (
  <Typography>
    <Button color="primary" component={Link} to="/">
      Home
    </Button>
    <Button component={Link} to="profile">
      Profile
    </Button>
    <Button
      variant="outlined"
      component={Link}
      to="business/Onehunga%20Medical%20(2012)%20Ltd"
    >
      Business
    </Button>
  </Typography>
);

export const AppView = (props) => {
  const {
    toggleSidebar,
    handleSearchInputChange,
    sideBarOpen,
  } = useAppContext();

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
          <RouterTests />
          <AppRouter />
        </Container>
        <Footer id="footer" />
      </Container>
    </AppTheme>
  );
};
