import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

import AdvertItem from '../advert-item';

import './advert-list.css';

class AdvertList extends Component {

  render() {
    const { adverts, search } = this.props;
    return (
      <section>
        { adverts && adverts
          .filter((advert) => {
            return advert.title.indexOf(search) > -1;
          })
          .map((advert) => (
          <Link to={`/advert/${ advert.id}`} key={advert.id}>
            <AdvertItem advert={advert} />
          </Link>
          )) }
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adverts: state.firestore.ordered.adverts,
    search: state.filter.search
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'adverts' },
  ])
)(AdvertList);
