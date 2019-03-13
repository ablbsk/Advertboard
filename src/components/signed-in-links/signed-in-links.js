import React from 'react';
import { NavLink } from 'react-router-dom';

import './signed-in-links.css';

const SignedInLinks = () => {
  return (
    <ul>
      <li><NavLink to="/create-advert">New Advert</NavLink></li>
      <li><NavLink to="/">Log Out</NavLink></li>
    </ul>
  );
};

export default SignedInLinks;
