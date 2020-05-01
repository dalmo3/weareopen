import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Grid } from '@material-ui/core';
import { Link as RouterLink } from '@reach/router';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Dalmo Mendonça
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    margin: '0',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <footer id={props.id} className={classes.footer}>
      <Container>
        <Grid container justify="space-between">
          <Grid item>
            <Copyright />
          </Grid>
          <Grid item>
            <Typography variant="body2" color="inherit">
              <Link component={RouterLink} to="/privacy-policy" color="inherit">
                Privacy policy
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
