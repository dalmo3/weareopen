import React from 'react';
import { AppTheme } from './AppTheme';
import { Container, Typography, Button, makeStyles } from '@material-ui/core';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAppContext } from './AppController';
import { grey } from '@material-ui/core/colors';
import { AppRouter } from './AppRouter';
import Footer from './Footer';
import { Link } from '@reach/router';
import AlertBar from '../components/AlertBar';

const RouterTests = (props) => (
  <Typography>
    <Button component={Link} to="profile">
      Profile
    </Button>
    <Button component={Link} to="tests">
      Tests
    </Button>
    <Button
      variant="outlined"
      component={Link}
      to="business/Onehunga%20Medical%20(2012)%20Ltd"
    >
      Business not owned
    </Button>
    <Button
      variant="outlined"
      component={Link}
      to="business/Zirco%20Abrasive%20Products%20Ltd"
    >
      Business owned
    </Button>
  </Typography>
);

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    backgroundColor: grey[50],
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
  },
}));

export const AppView = (props) => {
  const classes = useStyles();

  const {
    toggleSidebar,
    handleSearchInputChange,
    sideBarOpen,
  } = useAppContext();

  return (
    <AppTheme>
      <Container
        id="app"
        className={classes.container}
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
          {props.children}
        </Container>
        <Footer id="footer" />
      </Container>
      <AlertBar />
    </AppTheme>
  );
};
