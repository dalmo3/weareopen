import React, { Fragment, useEffect } from 'react'
import { Typography, Button } from '@material-ui/core'
import { useMatch, navigate } from '@reach/router'
import { BusinessCard } from '../../components/BusinessCard';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useAppContext } from '../AppController';

const BusinessPage = props => {

  const {activeBusiness, getBusinessByTitle} = useAppContext()
  const routerMatch = useMatch('/business/:businessSlug');
  
  // const [businessData, setBusinessData] = useState({})

  useEffect(()=>{
    console.log('activeBusiness', activeBusiness)
    if (!activeBusiness.title) getBusinessByTitle(routerMatch.businessSlug)
  },[])

  return (
    <div id="business-page">
      <Typography>BusinessPage page</Typography>
      <Button onClick={(e) => navigate(`/search`)}>
        <ArrowBackIcon /> Back to Results
      </Button>
      { activeBusiness.title ?
        <BusinessCard
        businessData={activeBusiness}
        ></BusinessCard>
        : 'This business does not exist'
      }
    </div>
  )
}

export default BusinessPage