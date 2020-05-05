import React from 'react';
import { useAppContext } from '../containers/AppController';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardHeader, Avatar, IconButton, Typography } from '@material-ui/core';
import { red, green, grey } from '@material-ui/core/colors';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: (props) => ({
    backgroundColor: props.info_available
      ? props.open_now
        ? green[500]
        : red[500]
      : grey[500],
  }),
  openIcon: (props) =>
    props.info_available
      ? props.open_now
        ? { color: green[500] }
        : { color: red[500] }
      : { color: grey[500] },
}));

const ResultCard = (props) => {
  const {
    title,
    location: {
      address: { city, region, suburb, street_address },
    },
    category: { category, industry },
    open_state: { info_available, open_alert_level, open_now },
  } = props.result;

  const locationDisplay = suburb
    ? suburb + (city ? ', ' + city : region ? ', ' + region : '')
    : city || (street_address ? street_address + ', ' + region : region);

  const openStateString = info_available
    ? open_now
      ? 'Open'
      : 'Closed'
    : 'No info';

  const { openBusinessPage } = useAppContext();

  const classes = useStyles({ info_available, open_now });

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Avatar aria-label="business" className={classes.avatar}>
                {title.slice(0, 2)}
              </Avatar>
            </Grid>
            <Grid item>
              <Typography
                // className={classes.openIcon}
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                }}
              >
                {openStateString}
              </Typography>
            </Grid>
          </Grid>
        }
        action={
          <IconButton
            className={classes.openIcon}
            aria-label="open business page"
            onClick={(e) => {
              openBusinessPage(e, props.result);
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        }
        title={
          <Typography variant="body1" component="h3">
            {title}
          </Typography>
        }
        subheader={
          <>
            <Typography variant="body2">{locationDisplay}</Typography>
            <Typography variant="body2" color='textPrimary'>{category}</Typography>
          </>
        }
      />
    </Card>
  );
};

export default ResultCard;
