import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';


import AdvertList from '../advert-list';

class AdvertBoard extends Component {
  render() {
    const { adverts } = this.props;
    return (
      <AdvertList adverts={adverts} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adverts: state.firestore.ordered.adverts,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'adverts' },
    { collection: 'users' },
  ])
)(AdvertBoard);
