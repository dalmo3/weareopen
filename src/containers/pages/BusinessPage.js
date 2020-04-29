import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { useMatch, navigate } from '@reach/router';
import { BusinessCard } from '../../components/BusinessCard';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useAppContext } from '../AppController';

const BusinessPage = (props) => {
  const {
    // activeBusiness,
    getBusinessByTitle,
    results,
    isVerified,
    handleClaim,
    userMeta,
    handleEdit,
    activeBusiness,
    fetchBusiness
  } = useAppContext();
  const routerMatch = useMatch('/business/:businessSlug');
  // console.log('route', routerMatch.businessSlug)
  // const activeBusiness = useActiveBusiness(routerMatch.businessSlug);

  const hasActiveBusiness = Boolean(activeBusiness && activeBusiness.title);

  if (!hasActiveBusiness || activeBusiness.title !== routerMatch.businessSlug) fetchBusiness(routerMatch.businessSlug)

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

  const ClaimBusiness = (props) =>{
    return userMeta.canClaimBusiness ? (
      <Button
      onClick={handleClaim}
      >Claim Business</Button>
      ) : null;
    }
  const EditBusiness = (props) =>{
    return userMeta.ownsActiveBusiness ? (
      <Button
      onClick={handleEdit}
      >EditBusiness</Button>
      ) : null;
    }
  return (
    <div id="business-page">
      <Typography>BusinessPage page</Typography>
      <BackToResults />
      <ConditionalCard />
      <AddNewBusiness />
      <ClaimBusiness />
      <EditBusiness />
    </div>
  );
};

export default BusinessPage;
