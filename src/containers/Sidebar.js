import React from 'react';
import { navigate } from '@reach/router';
import { useAppContext } from './AppController';
import { makeStyles } from '@material-ui/core/styles';
import {Drawer, List, Divider, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import waoLogoSquare from '../assets/img/wao-rect-amber-darkblue-padded-sm.png';

const useStyles = makeStyles((theme) => ({
  logoArea: {
    backgroundColor: theme.palette.primary.main,
    top: 0,
    left: 0,
    width: '100%',
    height: '150px',
    margin: 0,
    padding: 0,
    zIndex: 1201,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

const Sidebar = (props) => {
  const classes = useStyles();

  const { toggleSidebar, sideBarOpen } = useAppContext();

  const list = (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleSidebar(false)}
      onKeyDown={toggleSidebar(false)}
    >
      <List>
        <ListItem button onClick={(e) => navigate('/home')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
        <ListItem button onClick={(e) => navigate('/about')}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={'About'} />
        </ListItem>
        <ListItem button onClick={(e) => navigate('/contact')}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={'Contact'} />
        </ListItem>
        <ListItem button onClick={(e) => navigate('/help')}>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary={'Help'} />
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem button onClick={(e) => navigate('/profile')}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={'Business Owners'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Drawer open={sideBarOpen} onClose={toggleSidebar(false)}>
      <div className={classes.logoArea}>
        <img
          height="100%"
          width="250px"
          src={waoLogoSquare}
          alt="we are open logo"
        />
      </div>
      {list}
    </Drawer>
  );
};
export default Sidebar;
