import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firestoreConnect from 'react-redux-firebase/lib/firestoreConnect';
import { isLoaded, isEmpty } from 'react-redux-firebase/lib/helpers';

import AdvertItem from '../advert-item';
import Spinner from '../spinner';

import './advert-list.css';
import EmptyMessage from '../empty-message';

const AdvertList = (props) => {
  const { adverts, search } = props;

  if (!isLoaded(adverts)) {
    return <Spinner />;
  }

  if (isEmpty(adverts)) {
    return <EmptyMessage />;
  }

  return (
    <section className="advert-list">
      { adverts && adverts
        .filter((advert) => {
          const title = advert.title.toLowerCase();
          const searchLower = search.toLowerCase();
          return title.indexOf(searchLower) > -1;
        })
        .map(advert => (
          <AdvertItem advert={advert} key={advert.id} />))}
    </section>
  );
};

const mapStateToProps = state => ({
  adverts: state.firestore.ordered.adverts,
  search: state.filter.search,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'adverts', orderBy: ['created', 'desc'] },
    { collection: 'users', orderBy: ['username'] },
  ]),
)(AdvertList);
