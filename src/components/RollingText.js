import React, { useState, useEffect, useContext } from 'react';
import TextLoop from 'react-text-loop';
import { homeCategories, homeLocations } from '../assets/data/formValues';
import { Typography, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  rollingItalic: {
    fontWeight: 200,
    fontStyle: 'italic',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
  rollingBold: {
    textDecoration: 'underline',
    fontWeight: '700',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
}));
const RollingText = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" alignItems="center" spacing={0}>
      <Grid item>
        <Typography variant="h5" className={classes.rollingItalic}>
          Try searching for...
        </Typography>
        {/* <TextLoop mask={true} fade={false} interval={1000}>
        {['Search', 'Find', 'Buy', 'Hire', 'Sell'].map((region) => (
          <Typography
            variant="h5"
            key={region}
            style={{ fontWeight: 200, fontStyle: 'italic' }}
          >
            {region}
          </Typography>
        ))}
      </TextLoop> */}
      </Grid>
      <Grid item>
        <Grid container justify="center" spacing={1}>
          <Grid item>
            <TextLoop delay={700} mask={true} fade={false} interval={2300}>
              {homeCategories.map((entry) => (
                <Typography variant="h3" key={entry} className={classes.rollingBold}>
                  {entry}
                </Typography>
              ))}
            </TextLoop>
          </Grid>
          <Grid item>
            <Typography variant="h3" className={classes.rollingItalic}>
              in
            </Typography>
          </Grid> 
          <Grid item>
            <TextLoop delay={1000} mask={true} fade={false}>
              {homeLocations.map((entry) => (
                <Typography variant="h3" key={entry} className={classes.rollingItalic}>
                  {entry}
                </Typography>
              ))}
            </TextLoop>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RollingText;
