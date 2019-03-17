import React from 'react';
import { NavLink } from 'react-router-dom';

import './signed-out-links.css';

const SignedOutLinks = () => {
  return (
    <ul>
      <li><NavLink to="/sign-in">Login</NavLink></li>
      <li><NavLink to="/sign-up">Sign Up</NavLink></li>
    </ul>
  );
};

export default SignedOutLinks;
