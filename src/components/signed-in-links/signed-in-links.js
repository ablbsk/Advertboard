import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../actions/auth-actions';

import './signed-in-links.css';

const SignedInLinks = (props) => {
  return (
    <ul className="signed-in-links__ul">
      <li>
        <NavLink to="/create-advert" title="Create advert">
          <img
            className="signed-in-links__img"
            src="../../../public/img/create-advert_icon.png"
            alt="Create advert"
          />
        </NavLink>
      </li>
      <li>
        <NavLink to="/users" title="Users">
          <img
            className="signed-in-links__img"
            src="../../../public/img/users.png"
            alt="Users"
          />
        </NavLink>
      </li>
      <li>
        <NavLink to={`/users/${props.uid}`} title="Profile">
          <img
            className="signed-in-links__img"
            src="../../../public/img/profile.png"
            alt="Profile"
          />
        </NavLink>
      </li>
      <li>
        <NavLink onClick={props.signOut} to="/" title="Logout">
        <img
          className="signed-in-links__img"
          src="../../../public/img/logout.png"
          alt="Logout"
        />
        </NavLink>
      </li>
    </ul>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
