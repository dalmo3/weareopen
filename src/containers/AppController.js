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
import { navigate } from '@reach/router';
import { act } from '@testing-library/react';

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppController = ({ children, ...initOptions }) => {
  const {
    stitchClient,
    stitchUser,
    stitchReady,
    stitchSearch,
    useFindBusinessByTitle,
    findBusinessByTitle,
  } = useStitch();
  const {
    loginWithPopup,
    logout,
    isAuthenticated,
    user: auth0User,
    isVerified,
  } = useAuth0();
  
  //
  // SEARCH LOGIC
  //

  const [results, setResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState('');
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
    // console.log('query term:', query);
    if (stitchReady && query) {
      setSearchStatus('Searching');
      stitchSearch(query)
        .then((arr) => {
          console.log('results', arr);
          setResults(arr);
          setSearchStatus('Finished');
        })
        .catch((err) => {
          setSearchStatus('Error');
        })
        .finally(() => {
          navigate('/search');
        });
    } else {
      setSearchStatus('');
    }
  }, [query, stitchReady, stitchSearch]);
  
  //
  // DISPLAY BUSINESS LOGIC
  //
  const [activeBusiness, setActiveBusiness] = useState({});
  
  // find business by exact title match
  const findOne = (title) =>
  findBusinessByTitle(title).then((doc) => {
    setActiveBusiness(doc);
    setFetchTitle('');
    // console.log('got1', doc);
  });
  
  // if db is ready make the call
  const fetchBusiness = (title) => {
    if (stitchReady) {
      findOne(title);
    } else setFetchTitle(title);
  };
  
  // else setup effect to wait for db ready to make the call
  const [fetchTitle, setFetchTitle] = useState();
  useEffect(() => {
    if (fetchTitle && stitchReady) findOne(fetchTitle);
  }, [fetchTitle, stitchReady]);

  //
  // USER LOGIC
  //

  const [userMeta, setUserMeta] = useState({});
  useEffect(() => {
    // console.log(stitchUser)
    setUserMeta({
      ...userMeta,
      ownsActiveBusiness:
        stitchReady && stitchUser?.id === activeBusiness?.admin?.admin_id,
      canClaimBusiness:
        stitchReady && isVerified && !activeBusiness?.admin?.has_admin,
    });
    // console.log(stitchUser?.id, activeBusiness?.admin?.admin_id)
  }, [stitchUser, activeBusiness]);

  // useEffect(()=> console.log(userMeta), [userMeta])

  // APP VIEW
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

  //
  // ADD BUSINESS FLOW
  //
  
  const handleClaim = async (e) => {
    console.log('trying to claim property ', activeBusiness.title);
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
      .callFunction('claimBusiness', [activeBusiness._id])
      .then((accepted, doc) => {
        console.log('claim accepted?', accepted);
        setActiveBusiness(doc);
      })
      .catch((err) => console.error(err));
  };

  const openBusinessPage = (e, businessData) => {
    setActiveBusiness(businessData);
    navigate(`/business/${businessData.title}`);
  };

  const handleEdit = (e) => {
    console.log('trying to edit', activeBusiness);
  };

  const [isEditing, setIsEditing] = useState(false);

  return (
    <AppContext.Provider
      value={{
        query,
        searchStatus,
        results,
        handleSearchInputChange,
        activeBusiness,
        fetchBusiness,
        openBusinessPage,
        handleClaim,
        handleEdit,
        userMeta,
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
