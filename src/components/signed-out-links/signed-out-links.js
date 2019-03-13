import React from 'react';
import { NavLink } from 'react-router-dom';

import './signed-out-links.css';

const SignedOutLinks = () => {
  return (
    <ul>
      <li><NavLink to="/">Login</NavLink></li>
      <li><NavLink to="/">Sign Up</NavLink></li>
    </ul>
  );
};

export default SignedOutLinks;
