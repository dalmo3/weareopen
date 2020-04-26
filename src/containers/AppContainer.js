import React, {
  createContext,
  useContext,
  Fragment,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useAuth0 } from '../utils/Auth0Provider';
import { useStitch } from '../utils/StitchProvider';
import Button from '@material-ui/core/Button';
import { AppTheme } from './AppTheme';
import { Typography, Container } from '@material-ui/core';
import ResultList from '../components/ResultList';
import _debounce from 'lodash/debounce';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export const AppContainer = (props) => {
  const { stitchClient, stitchUser, stitchReady } = useStitch();
  const {
    loginWithPopup,
    logout,
    isAuthenticated,
    user: auth0User,
  } = useAuth0();

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const debounce = useCallback(
    _debounce((fn, arg) => fn(arg), 500),
    []
  );
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    debounce(setDebouncedQuery, e.target.value, 500);
  };

  useEffect(() => {
    console.log('query term:', query);
    if (stitchReady)
      stitchClient.callFunction('searchbeta', [debouncedQuery]).then((a) => {
        console.log('term2:', query);
        console.log(a);
        setResults(a);
      });
  }, [debouncedQuery]);

  const handleClaim = async (e, business) => {
    console.log('trying to claim property ', business);
    if (!isAuthenticated) {
      console.log('Please log in');
      return;
    }
    console.log('authenticated into Auth0', auth0User);
    if (false && !auth0User.email_verified) {
      console.log('Please verify your email');
      return;
    }
    if (!stitchUser) {
      console.log('Failed to authenticate to Stitch');
      return;
    }
    console.log('authenticated into Stitch', stitchUser);
    // if (!dbReady) return;
    console.log('db is ready');
    stitchClient
      .callFunction('claimBusiness', [business._id])
      .then((a) => console.log('user is', a));
  };

  const [sideBarOpen, setSideBarOpen] = useState(false)
  
  const toggleSidebar = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSideBarOpen(open);
  };

  return (
    <AppTheme>
      <Navbar toggleSidebar={toggleSidebar}/>
      <Sidebar openState={sideBarOpen} toggleSidebar={toggleSidebar}/>
      <Container maxWidth="sm">
        <Button
          id={'login'}
          variant="contained"
          color="primary"
          onClick={loginWithPopup}
        >
          Log in
        </Button>
        <Button
          id={'logout'}
          variant="outlined"
          color="secondary"
          onClick={logout}
        >
          Log out
        </Button>
        <Typography>You're logged {isAuthenticated ? `in` : `out`}</Typography>
        <input defaultValue={''} onChange={handleInputChange}></input>
        <ResultList results={results} handleClaim={handleClaim} />
      </Container>
    </AppTheme>
  );
};
