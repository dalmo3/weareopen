import React from 'react';
import { Router } from '@reach/router';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import BusinessPage from './pages/BusinessPage';
import SearchPage from './pages/SearchPage';

export const AppRouter = (props) => {
  return (
      <Router primary={false} >
        <HomePage default />
        <SearchPage path="search" />
        <BusinessPage path="business/:businessSlug/*edit" />          
        <ProfilePage path="profile" />
      </Router>
  );
};
