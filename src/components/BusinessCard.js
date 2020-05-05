import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  Box,
  Chip,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Avatar,
  Card,
  Collapse,
} from '@material-ui/core';
import { red, green, grey } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import LinkIcon from '@material-ui/icons/Link';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  header: {
    // backgroundColor: theme.palette.primary.light
    paddingBottom: theme.spacing(1),
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
      fontSize: '0.875rem',
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
    // fontSize: '0.875rem',
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
  tags: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  address: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  hours: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
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
      <CardContent className={classes.header}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={2} sm={2} style={{margin:'auto'}}>
            <Grid container direction="column" alignItems="center">
              <Grid item >
                <Avatar aria-label="business" className={classes.avatar}>
                  {title.slice(0, 2)}
                </Avatar>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ textAlign: 'center' }}>
                  <strong>{openStateString}</strong>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10} sm={10}>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            <Typography>{category}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent className={classes.tags}>
        <Grid container direction="row" justify="flex-start" spacing={1}>
          {[industry].concat(tags).map((tag) => (
            <Grid item key={tag}>
              <Chip label={tag} color="secondary"></Chip>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardContent>
        <Typography style={{ wordBreak: 'break-word' }}>
          {short || 'No description provided'}
        </Typography>
      </CardContent>
      <CardContent>
        <Box display="flex" flexDirection="column">
          {open_now ? (
            <Box>
              <Typography variant="body2">
                <strong>Open Hours:</strong> {open_hours}
              </Typography>
            </Box>
          ) : null}
          <Box>
            <Typography variant="body2">
              <strong>Address:</strong>{' '}
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
      <CardActions disableSpacing>
        {/* <Grid container>
          {
            <Grid item>
              <IconButton></IconButton>
              <Typography></Typography>
            </Grid>
          }
          <Grid item></Grid>
        </Grid> */}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton href={website} aria-label="phone">
          <LinkIcon />
        </IconButton>
        <IconButton href={`tel:${phone}`} aria-label="website">
          <PhoneIcon />
        </IconButton>
        {long ? (
          <Button
            className={classes.showMore}
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'Full description'}
          </Button>
        ) : null}
      </CardActions>
      {long ? (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph style={{ wordBreak: 'break-word' }}>
              {long}
            </Typography>
          </CardContent>
        </Collapse>
      ) : null}
    </Card>
  );
};
