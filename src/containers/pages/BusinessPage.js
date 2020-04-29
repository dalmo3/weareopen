import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';
import { useMatch, navigate } from '@reach/router';
import { BusinessCard } from '../../components/BusinessCard';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useAppContext } from '../AppController';
import BusinessForm from '../../components/BusinessForm';
import { act } from 'react-dom/test-utils';

const BusinessPage = (props) => {
  const {
    // activeBusiness,
    getBusinessByTitle,
    results,
    isVerified,
    handleClaim,
    userMeta,
    handleEdit,
    activeBusiness: globalActiveBusiness,
    fetchBusiness,
  } = useAppContext();
  const routerMatch = useMatch('/business/:businessSlug/**');
  console.log(routerMatch)
  console.log(props)
  // console.log('route', routerMatch.businessSlug)
  // const activeBusiness = useActiveBusiness(routerMatch.businessSlug);

  
  const [activeBusiness, setActiveBusiness] = useState({});
  const hasActiveBusiness = Boolean(activeBusiness && activeBusiness.title);
  const hasActiveGlobalBusiness = Boolean(globalActiveBusiness && globalActiveBusiness.title);
  
  useEffect(() => {
    console.log('ab:', new Date().getTime(), activeBusiness)
    console.log('gab:', new Date().getTime(), globalActiveBusiness)
    if (hasActiveGlobalBusiness && (globalActiveBusiness.title === routerMatch.businessSlug)){
      console.log('gab exists', new Date().getTime())
      setActiveBusiness(globalActiveBusiness);
    }
    else {
      console.log('gab doesnt exist', new Date().getTime(), globalActiveBusiness)
      fetchBusiness(routerMatch.businessSlug);
    
    }
  }, [globalActiveBusiness,activeBusiness,routerMatch.businessSlug]);

  useEffect(()=>{
    console.log('ab own hook:', activeBusiness)
  },[activeBusiness])

  const ConditionalCard = (props) =>
    hasActiveBusiness ? (
      <BusinessCard businessData={activeBusiness} />
    ) : (
      <Typography>This business does not exist</Typography>
    );

  const BackToResults = (props) =>
    results.length ? (
      <Button onClick={(e) => navigate(`/search`)}>
        <ArrowBackIcon /> Back to Results
      </Button>
    ) : null;

  const AddNewBusiness = (props) =>
    isVerified ? <Button>Add New Business</Button> : null;

  const ClaimBusiness = (props) => {
    return userMeta.canClaimBusiness ? (
      <Button onClick={handleClaim}>Claim Business</Button>
    ) : null;
  };
  const EditBusiness = (props) => {
    return userMeta.ownsActiveBusiness ? (
      <Button onClick={handleEditLocal}>EditBusiness</Button>
    ) : null;
  };

  const [tryEditing, setTryEditing] = useState(props.edit);
  const [isEditing, setIsEditing] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const handleEditLocal = (e) => {
    props.navigate('edit');
    // setIsEditing(true)
  };

  useEffect(()=>{
    setIsEditing(userMeta.ownsActiveBusiness && tryEditing)
  },[userMeta.ownsActiveBusiness, tryEditing])
  const ConditionalForm = (props) =>
    isEditing ? <BusinessForm businessData={activeBusiness} /> : null;
  const PreviewCard = (props) => {};

  return (
    <div id="business-page">
      <Typography>BusinessPage page</Typography>
      <BackToResults />
      <ConditionalCard />
      <ConditionalForm />
      <AddNewBusiness />
      <ClaimBusiness />
      <EditBusiness />
    </div>
  );
};

export default BusinessPage;
