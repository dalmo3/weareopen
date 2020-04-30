import React, { Fragment } from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link, Router } from '@reach/router';
import { useAppContext } from './AppController';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import BusinessPage from './pages/BusinessPage';
import SearchPage from './pages/SearchPage';

export const AppRouter = (props) => {
  const { results } = useAppContext();

  const RouterTests = (props) => (
    <Typography>
      <Button color='primary' component={Link} to="/">
        Home
      </Button>
      <Button component={Link} to="profile">
        Profile
      </Button>
      <Button variant='outlined' component={Link} to="business/Onehunga%20Medical%20(2012)%20Ltd">
        Business
      </Button>
    </Typography>
  );

  return (
    <Fragment>
      <RouterTests />
      <Router primary={false} >
        <HomePage default />
        <SearchPage path="search" />
        <BusinessPage path="business/:businessSlug/edit" edit={true}/>
        <BusinessPage path="business/:businessSlug" />
        <ProfilePage path="profile" />
      </Router>
    </Fragment>
  );
};
