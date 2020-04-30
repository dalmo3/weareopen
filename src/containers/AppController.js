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
    stitchUser,
    stitchReady,
    stitchSearch,
    findBusinessByTitle,
    findOneAndUpdate,
    stitchLogout,
    stitchClaim,
  } = useStitch();
  const {
    loginWithPopup,
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
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const debounce = useCallback(
    _debounce((fn, arg) => fn(arg), 500),
    []
  );
  const handleSearchInputChange = (e) => {
    // setQuery(e.target.value);
    debounce(setDebouncedQuery, e.target.value, 500);
  };

  useEffect(() => {
    // console.log('query term:', query);
    if (stitchReady && debouncedQuery) {
      setSearchStatus('Searching');
      stitchSearch(debouncedQuery)
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
  }, [debouncedQuery, stitchReady, stitchSearch]);

  //
  // DISPLAY BUSINESS LOGIC
  //
  const [activeBusiness, setActiveBusiness] = useState({});

  // opening from results, no need for api call
  const openBusinessPage = (e, businessData) => {
    setActiveBusiness(businessData);
    navigate(`/business/${businessData.title}`);
  };

  // opening from url
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
  const [addIntent, setAddIntent] = useState(false)
  const handleAddIntent = e => {
    setAddIntent(true)
    setResults([])
    setQuery('')
    setDebouncedQuery('')
    navigate('/search')
  }

  const handleClaim = async (e) => {
    console.log('trying to claim property ', activeBusiness.title);
    if (!isAuthenticated) {
      console.log('Please log in');
      return;
    }
    console.log('authenticated into Auth0', auth0User);
    if (!auth0User.email_verified) {
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
    stitchClaim(activeBusiness._id)
      .then((accepted, doc) => {
        console.log('claim accepted?', accepted);
        setActiveBusiness(doc);
      })
      .catch((err) => console.error(err));
  };

  //
  // EDIT FLOW
  //

  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = (e) => {
    console.log('trying to edit', activeBusiness);
  };

  const submitEdit = (businessData) => {
    if (!isAuthenticated) {
      alert('Please log in');
      return;
    }
    if (!auth0User.email_verified) {
      alert('Please verify your email');
      return;
    }
    if (!userMeta.ownsActiveBusiness) {
      alert('Please verify your email');
      return;
    }
    console.log(businessData);
    findOneAndUpdate(businessData)
      .then((updated) => {
        console.log(updated);
        setActiveBusiness(updated);
        navigate(`/business/${updated.title}`);
      })
      .catch(console.error);
  };

  return (
    <AppContext.Provider
      value={{
        query,
        debouncedQuery,
        searchStatus,
        results,
        handleSearchInputChange,
        activeBusiness,
        fetchBusiness,
        openBusinessPage,
        handleClaim,
        handleEdit,
        submitEdit,
        userMeta,
        sideBarOpen,
        toggleSidebar,
        logout: stitchLogout,
        isAuthenticated,
        loginWithPopup,
        isVerified,
        handleAddIntent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
