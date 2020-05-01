import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { navigate } from '@reach/router';
import { useAppContext } from './AppController';
import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const Sidebar = (props) => {
  const classes = useStyles();

  const { toggleSidebar, loginWithPopup } = useAppContext();

  const list = (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleSidebar(false)}
      onKeyDown={toggleSidebar(false)}
    >
      <List>
        <ListItem button onClick={(e) => navigate('/home')}>
          <ListItemIcon >
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
        <ListItem button onClick={loginWithPopup}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={'Login'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Drawer open={props.openState} onClose={props.toggleSidebar(false)}>
      {list}
    </Drawer>
  );
};
export default Sidebar;
