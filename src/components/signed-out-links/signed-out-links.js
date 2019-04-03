import React from 'react';
import { NavLink } from 'react-router-dom';

import './signed-out-links.css';

const SignedOutLinks = () => {
  return (
    <ul className="signed-out-links__ul">
      <li>
        <NavLink
          className="signed-out-links__a"
          to="/sign-in"
        >
          Login
        </NavLink>
      </li>
      <li>
        <NavLink
          className="signed-out-links__a"
          to="/sign-up"
        >
          Sign Up
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
