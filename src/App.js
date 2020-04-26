import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Auth0Wrapper } from './utils/Auth0Wrapper';
import { StitchProvider } from './utils/StitchProvider';
import { AppContainer } from './containers/AppContainer';

const App = () => {
  return (
    <Auth0Wrapper>
      <StitchProvider>
        <AppContainer/>
      </StitchProvider>
    </Auth0Wrapper>
  );
};

export default App;
