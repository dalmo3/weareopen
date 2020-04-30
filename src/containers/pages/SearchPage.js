import React, { Fragment } from 'react';
import ResultList from '../../components/ResultList';
import { useAppContext } from '../AppController';
import { Typography, Button } from '@material-ui/core';

const SearchPage = (props) => {
  const { results, addIntent, searchStatus, handleAddNew } = useAppContext();

  const nothingFound = searchStatus === 'Finished' && !results.length;
  const searchMessage = nothingFound ? 'Nothing found' : searchStatus;

  console.log('addIntent', addIntent);

  const ConditionalIntent = (props) => {
    if (!addIntent) return null;
    if (nothingFound) {
      return (
        <Fragment>
          <Typography>OK, proceed</Typography>
          <Button variant="contained" color="secondary" onClick={handleAddNew}>
            Add New Business
          </Button>
        </Fragment>
      );
    } else {
      return (
        <Typography>
          First search for your business and make sure it is not on the site
          already.

          If you found it, click on it to claim it.
        </Typography>
      );
    }
  };

  return (
    <div id="search-page">
      <ConditionalIntent />
      {results.length ? <ResultList /> : searchMessage}
    </div>
  );
};

export default SearchPage;
