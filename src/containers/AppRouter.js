import React, { Fragment } from 'react';
import ResultList from '../components/ResultList';
import { Typography, Container, Button } from '@material-ui/core';
import { Link, Router } from '@reach/router';
import { ProfilePage } from './pages/ProfilePage';
import { BusinessCard } from '../components/BusinessCard';
import { BusinessForm } from '../components/BusinessForm';
import { useAppContext } from './AppController';
import HomePage from './pages/HomePage';

export const AppRouter = (props) => {

  const {
    results
  } = useAppContext();

  const Search = (props) => <ResultList results={results} />;
  const TestParameterPage = (props) => <div>{props.testSlug}</div>;
  const RouterTests = (props) => (
    <Typography>
      <Button component={Link} to="/">
        Home
      </Button>
      <Button component={Link} to="search">
        Search
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

  return (
    <Fragment>
      <RouterTests />
      <Router primary={false}>
        <HomePage default />
        <Search path="search" />
        <TestParameterPage path="parameter/:testSlug" />
        <BusinessCard
          path="business/:businessSlug"
          businessData={results[0]}
        ></BusinessCard>
        <ProfilePage path="profile" />
        <BusinessForm path="addnew" />
      </Router>
    </Fragment>
  );
};
