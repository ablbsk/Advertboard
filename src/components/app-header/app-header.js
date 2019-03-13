import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SignedInLinks from '../signed-in-links';
import SignedOutLinks from '../signed-out-links';

import './app-header.css';

class AppHeader extends Component {
  render() {
    return (
      <header>
        <nav>
          <h1 className="logo"><NavLink to="/">Callboard</NavLink></h1>
          <SignedInLinks />
          <SignedOutLinks />
        </nav>
      </header>
    );
  }
}

export default AppHeader;
