import React from 'react';
import { AppTheme } from './AppTheme';
import {  Container } from '@material-ui/core';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAppContext } from './AppController';
import { grey } from '@material-ui/core/colors';
import { AppRouter } from './AppRouter';
import Footer from './Footer';

export const AppView = (props) => {
  const {
    toggleSidebar,
    handleSearchInputChange,
    sideBarOpen,
  } = useAppContext();

  return (
    <AppTheme>
      <Container
        id="app"
        style={{ height: '100vh', backgroundColor: grey[50] }}
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
          <AppRouter />
        </Container>
        <Footer id="footer"/>

      </Container>
    </AppTheme>
  );
};
