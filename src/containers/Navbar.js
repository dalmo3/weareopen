import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useMediaQuery, Link } from '@material-ui/core';
import waoIcon from '../assets/img/wao-icon-amber-darkblue.svg';
import waoLogoSquare from '../assets/img/wao-rect-amber-darkblue-unpadded.png';
import { Link as RouterLink } from '@reach/router';
import Search from '../components/Search';
import ProfileIcon from '../components/ProfileIcon';
import { useAppContext } from './AppController';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    // '&:hover': {
    //   backgroundColor: fade('#fff', 0.15),
    // },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'flex',
  },
}));

export default function Navbar(props) {
  const classes = useStyles();

  // PROFILE MENU
  // extract to separate component
  const sm = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const Logo = (props) =>
    useMemo(() => {
      const logo = sm ? waoLogoSquare : waoIcon;
      const width = sm ? '91px' : '50px';

      return (
        <Link component={RouterLink} to="/">
          <img
            height="50px"
            width={width}
            src={logo}
            alt="Logo"
            // onClick={(e) => navigate('/')}
          />
        </Link>
      );
    }, [sm]);

  const { toggleSidebar } = useAppContext();
  return (
    <div className={classes.grow}>
      <AppBar
        id={props.id}
        position="fixed"
        color="primary"
        // style={{backgroundColor: 'white'}}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSidebar(true)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.grow} />
          <Logo />
          <div className={classes.grow} />
          <Search />
          <div className={classes.grow} />
          <ProfileIcon />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
