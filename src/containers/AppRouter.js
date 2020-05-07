import React from 'react';
import { Router, createHistory, LocationProvider, globalHistory } from '@reach/router';
import AppController from './AppController';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import BusinessPage from './pages/BusinessPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import HelpPage from './pages/HelpPage';
import PrivacyPage from './pages/PrivacyPage';
import TestPage from './pages/TestPage';
import AboutPage from './pages/AboutPage';
import ReactGA from 'react-ga';
import NotFoundPage from './pages/NotFoundPage';

if (process.env.REACT_APP_GA_CODE){
  ReactGA.initialize(process.env.REACT_APP_GA_CODE);
  globalHistory.listen((window) => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });
}

const AppRouter = (props) => {
  return (
    <Router primary={false}>
      <AppController path="/">
        <HomePage path="/" />
        <SearchPage path="search" />
        <AboutPage path="about" />
        <BusinessPage path="business/:businessSlug/*edit" />
        <ProfilePage path="profile" />
        <ContactPage path="contact" />
        <HelpPage path="help" />
        <PrivacyPage path="privacy-policy" />
        <TestPage path="tests" />
        <NotFoundPage default />
      </AppController>
    </Router>
  );
};

export default AppRouter;
