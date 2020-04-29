import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useAppContext } from './AppController';
import { navigate } from '@reach/router';
import { Badge } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      // marginLeft: theme.spacing(3),
      // margin: 'auto',
      width: '60%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(3),
      // width: '50ch',
    },
  },
  sectionDesktop: {
    display: 'flex',
  },
}));

export default function Navbar(props) {
  const { isAuthenticated, isVerified, logout } = useAppContext();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'navbar-profile-menu';
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <MenuItem
        onClick={(e) => {
          handleProfileMenuClose();
          navigate('/profile');
        }}
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          handleProfileMenuClose();
          logout();
        }}
      >
        Log out
      </MenuItem>
    </Menu>
  );

  const profileIcon = (
    <IconButton
      edge="end"
      aria-label="account of current user"
      aria-controls={menuId}
      aria-haspopup="true"
      onClick={handleProfileMenuOpen}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
  );

  const renderProfileIcon = isAuthenticated ? (
    <Badge color="error" badgeContent=' ' overlap="circle"  variant='dot' invisible={isVerified}>
      {profileIcon}
    </Badge>
  ) : null;

  return (
    <div className={classes.grow}>
      <AppBar
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
            onClick={props.toggleSidebar(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            We Are Open!
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              autoFocus={true}
              fullWidth={true}
              placeholder="try... indian restaurant wellington"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              defaultValue={''}
              onChange={props.handleInputChange}
              onClick={e=> navigate('/search')}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}></div>
          {renderProfileIcon}
        </Toolbar>
      </AppBar>
      <Toolbar />
      {renderProfileMenu}
    </div>
  );
}
