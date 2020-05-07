import React, { useEffect, useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import { Link as RouterLink } from '@reach/router';
import AppTheme from './AppTheme';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import AlertBar from '../components/AlertBar';
import { Link, Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  container: {
    // minHeight: props => vh,
    backgroundColor: grey[50],

    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
  },
  offset: theme.mixins.toolbar,
}));

const getInnerHeight = () => window.innerHeight;
const useInnerHeight = () => {
  const [vh, setVh] = useState(window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setVh(getInnerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return vh;
};

const AppView = (props) => {
  const classes = useStyles();

  const vh = useInnerHeight();

  return (
    <AppTheme>
      <Container
        id="app"
        className={classes.container}
        disableGutters={true}
        maxWidth={false}
        style={{
          minHeight: vh,
        }}
      >
        <Navbar id="nav" />
        <Sidebar />
        <div className={classes.offset} />
        <Container id="main" maxWidth="sm">
          {props.children}
        </Container>
        <Footer id="footer" />
      </Container>
      <AlertBar />
      <CookieConsent
      ButtonComponent={Button}
       buttonClasses="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary" 
      >
        <Typography variant="body2" color="inherit">
          {`This website uses cookies to allow for access to the database and
          analytics. `}
          <Link component={RouterLink} to="/privacy-policy" color="inherit">
            Privacy policy.
          </Link>
        </Typography>
      </CookieConsent>
    </AppTheme>
  );
};

export default AppView;
