import React, { useState, useEffect, useContext } from 'react';
import TextLoop from 'react-text-loop';
import { regions } from '../assets/data/geo';
import { Typography, Grid } from '@material-ui/core';

const RollingText = () => (
  <Grid container direction="column" alignItems="center" spacing={0}>
    <Grid item>
      <TextLoop mask={true} fade={false} interval={1000}>
        {['Search', 'Find', 'Buy', 'Hire', 'Sell', 'Eat'].map((region) => (
          <Typography
            variant="h5"
            key={region}
            style={{ fontWeight: 200, fontStyle: 'italic' }}
          >
            {region}
          </Typography>
        ))}
      </TextLoop>
    </Grid>
    <Grid item>
      <Grid container justify="center" spacing={1}>
        <Grid item>
          <TextLoop delay={600} mask={true} fade={false}>
            {regions.map((region) => (
              <Typography
                variant="h4"
                key={region}
                style={{ textDecoration: 'underline', fontWeight: '700' }}
              >
                {region}
              </Typography>
            ))}
          </TextLoop>
        </Grid>
        <Grid item>
          <Typography
            variant="h4"
            style={{ fontWeight: 200, fontStyle: 'italic' }}
          >
            in
          </Typography>
        </Grid>
        <Grid item>
          <TextLoop delay={1000} mask={true} fade={false}>
            {regions.map((region) => (
              <Typography
                variant="h4"
                key={region}
                style={{ fontWeight: 200, fontStyle: 'italic' }}
              >
                {region}
              </Typography>
            ))}
          </TextLoop>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default RollingText;
