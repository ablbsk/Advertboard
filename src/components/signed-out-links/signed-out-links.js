import React from 'react';
import { NavLink } from 'react-router-dom';

import './signed-out-links.css';

const SignedOutLinks = () => (
  <div className="auth">
    <ul className="auth-list">
      <li className="auth-list__item">
        <NavLink
          className="auth-list__link"
          to="/sign-in"
        >
          Login
        </NavLink>
      </li>
      <li className="auth-list__item">
        <NavLink
          className="auth-list__link"
          to="/sign-up"
        >
          Sign Up
        </NavLink>
      </li>
    </ul>
  </div>
);

export default SignedOutLinks;
