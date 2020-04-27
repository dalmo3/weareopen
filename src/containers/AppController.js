import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useAuth0 } from '../utils/Auth0Provider';
import { useStitch } from '../utils/StitchProvider';
import _debounce from 'lodash/debounce';

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppController = ({ children, ...initOptions }) => {
  const { stitchClient, stitchUser, stitchReady, stitchSearch } = useStitch();
  const {
    loginWithPopup,
    logout,
    isAuthenticated,
    user: auth0User,
    isVerified,
  } = useAuth0();

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  const debounce = useCallback(
    _debounce((fn, arg) => fn(arg), 500),
    []
  );
  const handleSearchInputChange = (e) => {
    // setQuery(e.target.value);
    debounce(setQuery, e.target.value, 500);
  };

  useEffect(() => {
    console.log('query term:', query);
    if (stitchReady)
      stitchSearch(query).then((a) => {
        console.log(a);
        setResults(a);
      });
  }, [query]);

  const [sideBarOpen, setSideBarOpen] = useState(false);

  const toggleSidebar = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setSideBarOpen(open);
  };

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

  return (
    <AppContext.Provider
      value={{
        results,
        query,
        handleSearchInputChange,
        handleClaim,
        sideBarOpen,
        toggleSidebar,
        logout,
        isAuthenticated,
        loginWithPopup,
        isVerified,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
