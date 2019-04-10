import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firestoreConnect from 'react-redux-firebase/lib/firestoreConnect';
import { isLoaded, isEmpty } from 'react-redux-firebase/lib/helpers';

import AdvertItem from '../advert-item';
import Spinner from '../spinner';

import './advert-list.css';

const AdvertList = (props) => {
  const { adverts, search } = props;

  if (!isLoaded(adverts)) {
    return <Spinner />;
  }
  if (isEmpty(adverts)) {
    return <div>Oooops.... nothing =(</div>;
  }

  return (
    <section className="advert-list">
        { adverts && adverts
          .filter(advert => advert.title.indexOf(search) > -1)
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
