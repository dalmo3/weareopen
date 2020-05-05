import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import AppTheme from './AppTheme';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import AlertBar from '../components/AlertBar';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    backgroundColor: grey[50],
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
  },
}));

const AppView = (props) => {
  const classes = useStyles();

  return (
    <AppTheme>
      <Container
        id="app"
        className={classes.container}
        disableGutters={true}
        maxWidth={false}
      >
        <Navbar id="nav" />
        <Sidebar />
        <Container id="main" maxWidth="sm">
          {props.children}
        </Container>
        <Footer id="footer" />
      </Container>
      <AlertBar />
    </AppTheme>
  );
};

export default AppView