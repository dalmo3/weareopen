import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useReducer,
} from 'react';
import { navigate, useLocation } from '@reach/router';
import { useAuth0 } from '../utils/Auth0Provider';
import { useStitch } from '../utils/StitchProvider';
import AppView from './AppView';
import _debounce from 'lodash/debounce';

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const SnackbarContext = createContext();
export const useSnackbarContext = () => useContext(SnackbarContext);

const AppController = ({ children, ...initOptions }) => {
  const {
    stitchUser,
    stitchReady,
    stitchSearch,
    findBusinessByTitle,
    findOneAndUpdate,
    stitchLogout,
    stitchClaim,
    insertOne,
    findUserBusinesses,
  } = useStitch();
  const {
    loginWithPopup,
    loginWithRedirect,
    isAuthenticated,
    user: auth0User,
    isVerified,
    loginTimedOut,
    loginUnauthorized,
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

  const [hasActiveBusiness, setHasActiveBusiness] = useState(false);
  useEffect(
    () => setHasActiveBusiness(Boolean(activeBusiness && activeBusiness.title)),
    [activeBusiness]
  );

  const location = useLocation();
  // console.log(location)

  // opening from results, no need for api call
  const openBusinessPage = (e, businessData) => {
    setActiveBusiness(businessData);
    console.log(location);
    navigate(`/business/${businessData.title}`, {
      state: { referrer: location.pathname },
    });
  };

  // opening from url
  // find business by exact title match
  const fetchBusiness = (title) => {
    setIsFetching(true);
    if (stitchReady) {
      findOne(title);
    } else setFetchTitle(title);
  };

  // if db is ready make the call
  const findOne = (title) =>
    findBusinessByTitle(title).then((doc) => {
      setActiveBusiness(doc || {});
      setFetchTitle('');
      setIsFetching(false);
      // console.log('got1', doc);
    });

  // else setup effect to wait for db ready to make the call
  const [fetchTitle, setFetchTitle] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (fetchTitle && stitchReady) findOne(fetchTitle);
  }, [fetchTitle, stitchReady]);

  //
  // USER LOGIC
  //

  const userMetaReducer = (state, action) => {
    switch (action.type) {
      case 'updateBusinesses':
        return {
          ...state,
          businesses: action.payload,
        };
      case 'activeActions':
        const activeBusiness = action.payload;
        console.log('actions');
        return {
          ...state,
          ownsActiveBusiness:
            hasActiveBusiness &&
            stitchUser.id === activeBusiness.admin?.admin_id,
          canClaimBusiness:
            hasActiveBusiness && isVerified && !activeBusiness.admin?.has_admin,
          canReport:
            hasActiveBusiness &&
            stitchUser.id !== activeBusiness.admin?.admin_id,
        };
      default:
        throw new Error();
    }
  };

  const [userMeta, setUserMeta] = useReducer(userMetaReducer, {});
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    if (!stitchUser) return;
    if (!hasActiveBusiness) return;
    if (isClaiming) return;
    setUserMeta({ type: 'activeActions', payload: activeBusiness });
  }, [stitchUser, isVerified, hasActiveBusiness, activeBusiness, isClaiming]);

  useEffect(() => {
    // console.log(stitchUser.profile.data.verified)
    if (stitchUser?.profile?.data?.verified && !isClaiming) {
      findUserBusinesses().then((businesses) => {
        console.log(businesses);
        setUserMeta({ type: 'updateBusinesses', payload: businesses });
      });
    }
  }, [stitchUser, isClaiming]);

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

  const [snackBarState, setSnackbarState] = useState({
    open: false,
    autoHideduration: 10000,
    severity: 'error',
    message: 'Error message',
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarState({
      ...snackBarState,
      open: false,
    });
  };

  useEffect(() => {
    if (loginTimedOut) {
      setSnackbarState({
        open: true,
        autoHideduration: 10000,
        severity: 'error',
        message: 'Session expired, please log in again.',
      });
    } else if (loginUnauthorized) {
      setSnackbarState({
        open: true,
        autoHideduration: 10000,
        severity: 'error',
        message:
          'Please check for verification email and follow link before logging in.',
      });
    }
  }, [loginTimedOut, loginUnauthorized]);

  const displaySnackbar = (severity, message) => {
    setSnackbarState({
      open: true,
      autoHideduration: 10000,
      severity,
      message,
    });
  };
  //
  // ADD BUSINESS FLOW
  //
  const [addIntent, setAddIntent] = useState(false);
  const handleAddIntent = (e) => {
    setAddIntent(true);
    resetSearchState();
    navigate('/search');
  };

  const resetSearchState = () => {
    setResults([]);
    setQuery('');
    setDebouncedQuery('');
  };

  const handleAddNew = (e) => {
    const emptyBusiness = require('../utils/businessObject.json');
    console.log('empty', emptyBusiness);
    const newBusiness = {
      ...emptyBusiness,
      title: debouncedQuery,
      admin: {
        admin_id: stitchUser.id,
        has_admin: true,
      },
    };
    updateActiveBusiness(newBusiness);
    navigate(`/business/${debouncedQuery}/edit`);
    resetSearchState();
  };

  const replaceBusinessInArray = (business, array) =>
    array.map((result) =>
      JSON.stringify(result._id.id) === JSON.stringify(business._id.id)
        ? business
        : result
    );

  const replaceOrAddBusinessInArray = (business, array) => {
    const removed = array.filter(
      (biz) => JSON.stringify(biz._id.id) !== JSON.stringify(business._id.id)
    );

    return [business, ...removed];
  };

  const updateActiveBusiness = (business) => {
    setActiveBusiness(business);
    console.log('updating', business);
    console.log('results', results);
    if (business._id) {
      if (results.length) {
        const updatedResults = replaceBusinessInArray(business, results);
        console.log('updresults', updatedResults);
        setResults(updatedResults);
      }
      const updatedUserBusinesses = replaceOrAddBusinessInArray(
        business,
        userMeta.businesses
      );

      setUserMeta({ type: 'updateBusinesses', payload: updatedUserBusinesses });
    }
  };

  const handleClaim = async (e) => {
    setIsClaiming(true);
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
      .then(({ accepted, doc }) => {
        console.log('claim accepted?', accepted, doc);
        updateActiveBusiness(doc);
      })
      .catch((err) => console.error(err))
      .finally((e) => setIsClaiming(false));
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
    if (!isVerified) {
      alert('Please verify your email');
      return;
    }
    if (!userMeta.ownsActiveBusiness) {
      alert("You don't own this business");
      return;
    }
    console.log('inserting', businessData);
    insertOne(businessData)
      // findOneAndUpdate(businessData)
      .then((updated) => {
        console.log('inserted', updated);
        updateActiveBusiness(updated);
        setIsEditing(false);
        navigate(`/business/${updated.title}`, { replace: true });
      })
      .catch(console.error);
  };

  return (
    <AppContext.Provider
      value={{
        query,
        debouncedQuery,
        handleSearchInputChange,
        searchStatus,
        results,
        activeBusiness,
        hasActiveBusiness,
        fetchBusiness,
        isFetching,
        openBusinessPage,
        handleClaim,
        handleEdit,
        submitEdit,
        handleAddIntent,
        addIntent,
        handleAddNew,
        userMeta,
        isAuthenticated,
        isVerified,
        loginTimedOut,
        loginUnauthorized,
        loginWithPopup,
        loginWithRedirect,
        logout: stitchLogout,
        sideBarOpen,
        toggleSidebar,
        displaySnackbar,
      }}
    >
      <SnackbarContext.Provider
        value={{
          snackBarState,
          handleSnackbarClose,
        }}
      >
        <AppView>{children}</AppView>
      </SnackbarContext.Provider>
    </AppContext.Provider>
  );
};

export default AppController;
