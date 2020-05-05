import React from 'react';
import './App.css';
import Auth0Wrapper from './utils/Auth0Wrapper';
import StitchProvider from './utils/StitchProvider';
import AppRouter from './containers/AppRouter';

const App = () => {
  return (
    <Auth0Wrapper>
      <StitchProvider>
        {/* <AppController> */}
          <AppRouter/>
        {/* </AppController> */}
      </StitchProvider>
    </Auth0Wrapper>
  );
};

export default App;
