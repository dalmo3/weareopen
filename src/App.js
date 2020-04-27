import React from 'react';
import './App.css';
import { Auth0Wrapper } from './utils/Auth0Wrapper';
import { StitchProvider } from './utils/StitchProvider';
import { AppContainer } from './containers/AppContainer';
import { AppController } from './containers/AppController';

const App = () => {
  return (
    <Auth0Wrapper>
      <StitchProvider>
        <AppController>
          <AppContainer/>
        </AppController>
      </StitchProvider>
    </Auth0Wrapper>
  );
};

export default App;
