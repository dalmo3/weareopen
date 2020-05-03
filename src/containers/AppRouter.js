import React from 'react';
import { Router } from '@reach/router';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import BusinessPage from './pages/BusinessPage';
import SearchPage from './pages/SearchPage';
import { AppView } from './AppView';
import TestPage from './pages/TestPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import { AppController } from './AppController';

export const AppRouter = (props) => {
  return (
    <Router primary={false}>
      <AppController path="/">
        <HomePage default />
        <SearchPage path="search" />
        <BusinessPage path="business/:businessSlug/*edit" />
        <ProfilePage path="profile" />
        <TestPage path="tests" />
        <PrivacyPage path="privacy-policy" />
        <ContactPage path="contact" />
      </AppController>
    </Router>
  );
};
