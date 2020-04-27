import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, green, grey } from '@material-ui/core/colors';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((props) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: (props) =>
    props.info_available
      ? props.open_now
        ? { backgroundColor: green[500] }
        : { backgroundColor: red[500] }
      : { backgroundColor: grey[500] },
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
    open_state: { info_available, open_alert_level, open_now },
  } = props.result;

  const locationDisplay = suburb
    ? suburb + (city ? ', ' + city : region ? ', ' + region : '')
    : city || (street_address ? street_address + ', ' + region : region);

  const openStateString = props.info_available
    ? props.open_now
      ? 'Open'
      : 'Closed'
    : 'No info';

  const classes = useStyles({ info_available, open_now });

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Avatar aria-label="business" className={classes.avatar}>
                {title.slice(0, 2)}
              </Avatar>
            </Grid>
            <Grid item>
              <Typography
                className={classes.openIcon}
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
                // onClick={(e) => props.handleClaim(e, props.result)}
              >
                <ChevronRightIcon />
              </IconButton>
        }
        title={title}
        subheader={locationDisplay}
      />
    </Card>
  );
};

export default ResultCard;
