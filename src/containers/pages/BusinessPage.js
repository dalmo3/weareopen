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
    results,
    isVerified,
    handleClaim,
    userMeta,
    activeBusiness,
    fetchBusiness,
  } = useAppContext();
  console.log('route', props.businessSlug);

  const hasActiveBusiness = Boolean(activeBusiness && activeBusiness.title);

  useEffect(() => {
    if (!hasActiveBusiness || activeBusiness.title !== props.businessSlug)
      fetchBusiness(props.businessSlug);
  }, [hasActiveBusiness, props.businessSlug]);

  const ConditionalCard = (props) =>
    hasActiveBusiness ? (
      !isEditing ? (
        <BusinessCard businessData={activeBusiness} />
      ) : null
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
  useEffect(() => {
    console.log('editing...', isEditing);
  });

  const [editIntent, setEditIntent] = useState(props.edit === 'edit');
  const [isEditing, setIsEditing] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const handleEditLocal = (e) => {
    props.navigate('edit');
    // setIsEditing(true)
  };

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
