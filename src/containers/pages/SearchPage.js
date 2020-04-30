import React, { Fragment } from 'react';
import ResultList from '../../components/ResultList';
import { useAppContext } from '../AppController';

const SearchPage = (props) => {
  const { results } = useAppContext();
  return <ResultList results={results} />;
};

export default SearchPage;
