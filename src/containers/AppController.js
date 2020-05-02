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
    insertOne,
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

  const [hasActiveBusiness, setHasActiveBusiness] = useState(false);
  useEffect(
    () => setHasActiveBusiness(Boolean(activeBusiness && activeBusiness.title)),
    [activeBusiness]
  );

  // opening from results, no need for api call
  const openBusinessPage = (e, businessData) => {
    updateActiveBusiness(businessData);
    navigate(`/business/${businessData.title}`);
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
      updateActiveBusiness(doc || {});
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

  const [userMeta, setUserMeta] = useState({});
  const [isClaiming, setIsClaiming] = useState(false);
  useEffect(() => {
    // console.log(stitchUser)

    if (!stitchUser) return;
    if (!hasActiveBusiness) return;

    setUserMeta({
      isVerified,
      ownsActiveBusiness: stitchUser?.id === activeBusiness?.admin?.admin_id,
      canClaimBusiness: isVerified && !activeBusiness?.admin?.has_admin,
      canReport: stitchUser?.id !== activeBusiness?.admin?.admin_id,
    });
    // console.log(stitchUser?.id, activeBusiness?.admin?.admin_id)
  }, [stitchUser, isVerified, activeBusiness, isClaiming]);

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

  const updateActiveBusiness = (business) => {
    setActiveBusiness(business);
    console.log('updating', business);
    console.log('results', results);
    if (business._id && results.length) {
      const updatedResults = results.map((result) =>
        JSON.stringify(result._id.id) === JSON.stringify(business._id.id) ? business : result
      );
      console.log('updresults', updatedResults);
      setResults(updatedResults);
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
    if (!auth0User.email_verified) {
      alert('Please verify your email');
      return;
    }
    if (!userMeta.ownsActiveBusiness) {
      alert('Please verify your email');
      return;
    }
    console.log('inserting', businessData);
    insertOne(businessData)
      // findOneAndUpdate(businessData)
      .then((updated) => {
        console.log('inserted', updated);
        updateActiveBusiness(updated);
        setIsEditing(false);
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
        hasActiveBusiness,
        fetchBusiness,
        isFetching,
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
        addIntent,
        handleAddNew,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
