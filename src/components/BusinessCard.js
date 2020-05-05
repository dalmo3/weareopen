import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, green, grey } from '@material-ui/core/colors';
import Collapse from '@material-ui/core/Collapse';
import { Button, Grid, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  avatar: (props) => ({
    backgroundColor: props.info_available
      ? props.open_now
        ? green[500]
        : red[500]
      : grey[500],
    [theme.breakpoints.down('xs')]: {
      width: 30,
      height: 30,
      fontSize: '0.75rem',
    },
  }),
  avatarBox: {
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
  },
  openIcon: (props) => ({
    color: props.info_available
      ? props.open_now
        ? green[500]
        : red[500]
      : grey[300],
    fontSize: '0.875rem',
    fontWeight: 'bold',
    textAlign: 'center',
  }),
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  showMore: {
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export const BusinessCard = (props) => {
  const businessData =
    props.location?.state ||
    props.businessData ||
    require('../utils/businessObject.json'); // guaranteed it doesn't break

  const {
    title,
    location: {
      address: { city, region, suburb, street_address },
    },
    open_state: {
      info_available,
      open_alert_level,
      open_now,
      open_date,
      open_hours,
    },
    category: { category, industry, tags },
    description: { short, long },
    contact: { email, website, phone },
  } = businessData;

  const locationDisplay = suburb
    ? suburb + (city ? ', ' + city : region ? ', ' + region : '')
    : city || (street_address ? street_address + ', ' + region : region);

  const classes = useStyles({ info_available, open_now });
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const openStateString = info_available
    ? open_now
      ? 'Open'
      : 'Closed'
    : 'No info';

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={2} sm={2}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Avatar aria-label="business" className={classes.avatar}>
                  {title.slice(0, 2)}
                </Avatar>
              </Grid>
              <Grid item>
                <Typography>{openStateString}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10} sm={10}>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            <Typography>{locationDisplay}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Grid container direction="row" justify="flex-start"> 
          <Grid item>
            <Typography variant="body2">Open Hours: {open_hours}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Box display="flex" flexDirection="column">
          <Box>
            <Typography variant="body2">
              {street_address + (street_address && suburb && ', ') + suburb}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">
              {city + (city && region && ', ') + region}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Typography
          variant="body2"
          paragraph
          style={{ wordWrap: 'break-word' }}
        >
          {short || 'No description provided'}
        </Typography>
        <Grid container>
          {
            <Grid item>
              <IconButton></IconButton>
              <Typography></Typography>
            </Grid>
          }
          <Grid item></Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="phone">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="website">
          <ShareIcon />
        </IconButton> */}
        {long ? (
          <Button
            className={classes.showMore}
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'Show more'}
          </Button>
        ) : null}
      </CardActions>
      {long ? (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph style={{ wordWrap: 'break-word' }}>
              {long}
            </Typography>
          </CardContent>
        </Collapse>
      ) : null}
    </Card>
  );
};
