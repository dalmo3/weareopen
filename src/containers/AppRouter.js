import React from 'react';
import { Router } from '@reach/router';
import AppController from './AppController';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import BusinessPage from './pages/BusinessPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import HelpPage from './pages/HelpPage';
import PrivacyPage from './pages/PrivacyPage';
import TestPage from './pages/TestPage';

const AppRouter = (props) => {
  return (
    <Router primary={false}>
      <AppController path="/">
        <HomePage default />
        <SearchPage path="search" />
        <BusinessPage path="business/:businessSlug/*edit" />
        <ProfilePage path="profile" />
        <ContactPage path="contact" />
        <HelpPage path="help" />
        <PrivacyPage path="privacy-policy" />
        <TestPage path="tests" />
      </AppController>
    </Router>
  );
};

export default AppRouter