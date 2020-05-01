import React from 'react';
import { Router } from '@reach/router';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import BusinessPage from './pages/BusinessPage';
import SearchPage from './pages/SearchPage';
import { AppView } from './AppView';

export const AppRouter = (props) => {
  return (
    <Router primary={false}>
      <AppView path="/">
        <HomePage default />
        <SearchPage path="search" />
        <BusinessPage path="business/:businessSlug/*edit" />
        <ProfilePage path="profile" />
      </AppView>
    </Router>
  );
};
