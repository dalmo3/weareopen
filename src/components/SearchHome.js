import React from 'react';
import { navigate } from '@reach/router';
import { useAppContext } from '../containers/AppController';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
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
}));

const SearchHome = (props) => {
  const classes = useStyles();
  const { handleSearchInputChange, query } = useAppContext();

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <form onSubmit={handleSearchInputChange}>
        <InputBase
          autoFocus={true}
          fullWidth={true}
          placeholder="try... indian restaurant wellington"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          // defaultValue={query}
          // value={query}
          // onChange={handleSearchInputChange}
          onSubmit={handleSearchInputChange}
          // onClick={(e) => navigate('/search')}
        />
      </form>
    </div>
  );
};

export default SearchHome;
