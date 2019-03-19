import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../actions/auth-actions';

import './signed-in-links.css';

const SignedInLinks = (props) => {
  const { uid } = props.auth;
  return (
    <ul>
      <li><NavLink to="/create-advert">New Advert</NavLink></li>
      <li><NavLink to="/users">Users</NavLink></li>
      <li><NavLink to={`/users/${uid}`}>Profile</NavLink></li>
      <li><a onClick={props.signOut}>Log Out</a></li>
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);
