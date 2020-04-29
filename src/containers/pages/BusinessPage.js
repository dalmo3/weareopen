import React, { Fragment, useEffect } from 'react';
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
    useActiveBusiness,
  } = useAppContext();
  const routerMatch = useMatch('/business/:businessSlug');
  // console.log('route', routerMatch.businessSlug)
  const activeBusiness = useActiveBusiness(routerMatch.businessSlug)

  const ConditionalCard = (props) =>
    activeBusiness.title ? (
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
    
  return (
    <div id="business-page">
      <Typography>BusinessPage page</Typography>
      <BackToResults />
      <ConditionalCard />
      <AddNewBusiness />
    </div>
  );
};

export default BusinessPage;
