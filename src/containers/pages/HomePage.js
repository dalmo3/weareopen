import React, { useMemo } from 'react';
import { navigate, Link as RouterLink } from '@reach/router';
import {
  Typography,
  Container,
  makeStyles,
  Paper,
  Grid,
  Button,
  Link,
  useMediaQuery,
} from '@material-ui/core';
// import waoLogoSquare from '../../assets/img/wao-rect-amber-darkblue-unpadded.png';
import waoLogoSquareLg from '../../assets/img/wao-rect-outline-amber-darkblue-1200.png';
import waoLogoSquareMd from '../../assets/img/wao-rect-outline-amber-darkblue-600.png';
import SearchHome from '../../components/SearchHome';
import RollingText from '../../components/RollingText';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '70vh',
    minHeight: '500px',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(3),
  },
}));

const HomePage = (props) => {
  const classes = useStyles();

  // const sm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const Logo = (props) => {
    // useMemo(() => {
    // const logo = waoLogoSquare;
    // const width = sm ? '455px' : '250px';

    return (
      <img
        height="100%"
        width="100%"
        src={waoLogoSquareLg}
        alt="Logo"
        srcSet={`${waoLogoSquareMd} 600w, ${waoLogoSquareLg} 1200w`}
      />
    );
  };

  // onClick={(e) => navigate('/')}
  // }, [sm]);

  return (
    <div id="homepage">
      {/* <Paper className={classes.container}> */}
      <Grid container direction="column" alignItems="center" spacing={4}>
        <Grid item style={{ width: '60%' }}>
          <Logo />
        </Grid>
        <Grid item>
          <RollingText/>
        </Grid>
        <Grid item>
          <Typography variant="h6" style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Search for your favourite businesses and how they're operating.
            <br/>
            List your business and let your clients spread the message!
          </Typography>
        </Grid>
        <Grid item>
          <Button
            id={'btn-add-new'}
            variant="contained"
            color="secondary"
            onClick={(e) => navigate('/profile')}
          >
            Add your Business
          </Button>
        </Grid>
      </Grid>
      {/* </Paper> */}
    </div>
  );
};

export default HomePage;
