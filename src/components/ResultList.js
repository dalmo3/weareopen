import React, { Fragment } from 'react';
import ResultCard from './ResultCard';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: '10px',
  },
}));


const ResultList = (props) => {
  const classes = useStyles();

  // const list = 
  return (
    <Fragment>
      {props.results.map((r, i) => (
        <div key={r.title} className={classes.card}>
          <ResultCard result={r} handleClaim={props.handleClaim} />
        </div>
      ))}
      {/* {props.results.length > 10?  */}
      {/* <Button color="primary">Load More...</Button> */}
    </Fragment>
  );
};

export default ResultList;
