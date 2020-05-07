import React from 'react';
import { navigate, Redirect } from '@reach/router';

const NotFoundPage = (props) => {
  // console.log('not found')
  // navigate('/')
  return <Redirect to='/' noThrow /> ;
}

export default NotFoundPage;
