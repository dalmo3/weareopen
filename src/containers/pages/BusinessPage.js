import React, { useState, useEffect } from 'react';
import { Typography, Button, Link } from '@material-ui/core';
import { navigate, Link as RouterLink } from '@reach/router';
import { BusinessCard } from '../../components/BusinessCard';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useAppContext } from '../AppController';
import BusinessForm from '../../components/BusinessForm';
import { act } from 'react-dom/test-utils';

const BusinessPage = (props) => {
  const {
    results,
    handleClaim,
    userMeta,
    activeBusiness,
    fetchBusiness,
  } = useAppContext();

  // check if globally active business exists and is the same as requested
  // otherwise trigger db call
  const hasActiveBusiness = Boolean(activeBusiness && activeBusiness.title);

  useEffect(() => {
    if (!hasActiveBusiness || activeBusiness.title !== props.businessSlug)
      fetchBusiness(props.businessSlug);
  }, [hasActiveBusiness, props.businessSlug]);

  const [ isFetching, setIsFetching ] = useState(false)
  useEffect(()=> {
    setIsFetching(false)
  },[hasActiveBusiness])

  const ConditionalCard = (props) =>
    hasActiveBusiness ? (
      !isEditing ? (
        <BusinessCard businessData={activeBusiness} />
      ) : null
    ) : (
      isFetching ? null : 
      <Typography>This business does not exist</Typography>
    );

  const BackToResults = (props) =>
    results.length && !isEditing ? (
      <Button onClick={(e) => navigate(`/search`)}>
        <ArrowBackIcon /> Back to Results
      </Button>
    ) : null;

  const ClaimBusiness = (props) =>
    hasActiveBusiness && userMeta.canClaimBusiness ? (
      <Button variant="contained" onClick={handleClaim}>
        Claim Business
      </Button>
    ) : userMeta.ownsActiveBusiness ? null : (
      <Typography variant="body2" color="textSecondary">
        {'Something wrong with this listing? '} 
        <Link component={RouterLink} to="/contact" color="inherit">
          {'Report.'}
        </Link>
      </Typography>
    );

  // const ReportText =
  //   userMeta.ownsActiveBusiness

  const EditBusiness = (props) => {
    return userMeta.ownsActiveBusiness && !isEditing ? (
      <Button onClick={handleEditLocal}>EditBusiness</Button>
    ) : null;
  };
  const [editIntent, setEditIntent] = useState(props.edit === 'edit');
  const [isEditing, setIsEditing] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const handleEditLocal = (e) => {
    props.navigate('edit');
    setIsEditing(true);
  };

  useEffect(() => {
    setEditIntent(props.edit === 'edit');
  });

  const [canEdit, setCanEdit] = useState(false);
  useEffect(() => {
    setCanEdit(userMeta.canClaimBusiness || userMeta.ownsActiveBusiness);
  }, [userMeta.canClaimBusiness, userMeta.ownsActiveBusiness]);

  // const canEdit = userMeta.canClaimBusiness || userMeta.ownsActiveBusiness;

  useEffect(() => {
    setIsEditing(canEdit && editIntent);
  }, [canEdit, editIntent]);

  console.log('can edit', canEdit);

  const ConditionalForm = (props) =>
    isEditing ? <BusinessForm businessData={activeBusiness} /> : null;

  const PreviewCard = (props) => {};

  return (
    <div id="business-page">
      <BackToResults />
      <ConditionalCard />
      <ConditionalForm />
      <ClaimBusiness />
      <EditBusiness />
    </div>
  );
};

export default BusinessPage;
