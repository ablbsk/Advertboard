import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import SignedInLinks from '../signed-in-links';
import SignedOutLinks from '../signed-out-links';

import './app-header.css';

class AppHeader extends Component {
  render() {
    const { auth } = this.props;
    const links = auth.uid ? <SignedInLinks uid={auth.uid} /> : <SignedOutLinks />;
    return (
      <header className="app-header">
        <nav className="app-header__nav">
          <NavLink className="app-header__logo" to="/">Callboard</NavLink>
          { links }
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(AppHeader);
