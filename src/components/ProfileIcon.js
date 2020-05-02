import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import { navigate } from '@reach/router';
import { useAppContext } from '../containers/AppController';
import { Badge } from '@material-ui/core';

const ProfileIcon = (props) => {
  const { isAuthenticated, isVerified, logout } = useAppContext();

  const [anchorEl, setAnchorEl] = useState(null);
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
      id={menuId}
      keepMounted
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

  return isAuthenticated ? (
    <Badge
      color="error"
      badgeContent=" "
      overlap="circle"
      variant="dot"
      invisible={isVerified}
    >
      {profileIcon}
      {renderProfileMenu}
    </Badge>
  ) : null;
};
export default ProfileIcon;
