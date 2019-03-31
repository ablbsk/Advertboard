import React from 'react';
import { NavLink } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { signOut } from '../../actions/auth-actions';

import './signed-in-links.css';

const SignedInLinks = (props) => {
  const { username } = props.profile;
  return (
    <ul>
      <li><NavLink to="/create-advert">New Advert</NavLink></li>
      <li><NavLink to="/users">Users</NavLink></li>
      <li><NavLink to={`/users/${ props.uid }`}>{ username }</NavLink></li>
      <li><a onClick={ props.signOut }>Log Out</a></li>
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'users' },
  ])
)(SignedInLinks);
