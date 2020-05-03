import React, { Fragment } from 'react';
import ResultCard from './ResultCard';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: '10px',
  },
}));

const ResultList = (props) => {
  const classes = useStyles();

  const resultList = props.results?.map((r, i) => (
    <div key={r.title} className={classes.card}>
      <ResultCard result={r} />
    </div>
  ));

  return (
    <Fragment>
      {resultList}
      {/* <Button color="primary">Load More...</Button> */}
    </Fragment>
  );
};

export default ResultList;
