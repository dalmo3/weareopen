import React, { Fragment } from 'react';
import { useAppContext } from '../AppController';
import ResultList from '../../components/ResultList';
import { Typography, Button, Grid } from '@material-ui/core';

const SearchPage = (props) => {
  const { results, addIntent, searchStatus, handleAddNew } = useAppContext();

  const nothingFound = searchStatus === 'Finished' && !results.length;
  const searchMessage = nothingFound ? 'Nothing found' : searchStatus;

  console.log('addIntent', addIntent);

  const ConditionalIntent = (props) => {
    if (!addIntent) return null;
    if (nothingFound) {
      return (
        <>
          <Typography>OK, proceed</Typography>
          <Button variant="contained" color="secondary" onClick={handleAddNew}>
            Add New Business
          </Button>
        </>
      );
    } else {
      return (
        <Typography>
          First search for your business and make sure it is not on the site
          already. If you found it, click on it to claim it.
        </Typography>
      );
    }
  };

  return (
    // <div >
    <Grid id="search-page" container direction="column" spacing={2}>
      <Grid item >
        <ConditionalIntent />
      </Grid>
      <Grid item >
        {results.length ? <ResultList results={results}/> : searchMessage}
      </Grid>
    </Grid>
    // </div>
  );
};

export default SearchPage;
