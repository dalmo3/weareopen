import React, { Fragment } from 'react';
import ResultCard from './ResultCard';
import { makeStyles, Button } from '@material-ui/core';
import { useAppContext } from '../containers/AppController';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: '10px',
  },
}));

const ResultList = (props) => {
  const classes = useStyles();
  const { query, searchStatus } = useAppContext();

  const searchMessage =
    searchStatus === 'Finished' && !props.results?.length
      ? 'Nothing found'
      : searchStatus;

  const resultList = props.results.map((r, i) => (
    <div key={r.title} className={classes.card}>
      <ResultCard result={r} handleClaim={props.handleClaim} />
    </div>
  ));

  return (
    <Fragment>
      {resultList.length ? resultList : searchMessage}
      {/* {props.results.length > 10?  */}
      {/* <Button color="primary">Load More...</Button> */}
    </Fragment>
  );
};

export default ResultList;
