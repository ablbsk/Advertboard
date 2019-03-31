import React, { Fragment } from 'react';
import AdvertList from '../advert-list';
import Search from '../search';

const AdvertBoard = () => {
  return (
    <Fragment>
      <AdvertList />
      <Search />
    </Fragment>
  );
};

export default AdvertBoard;
