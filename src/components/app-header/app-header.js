import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import SignedInLinks from '../signed-in-links';
import SignedOutLinks from '../signed-out-links';

import './app-header.css';

const AppHeader = (props) => {
  const { auth } = props;
  const links = auth.uid ? <SignedInLinks uid={auth.uid} /> : <SignedOutLinks />;
  return (
    <header className="app-header">
      <nav className="app-header__nav">
        <div className="logo">
          <NavLink className="logo__title" to="/">Advertboard</NavLink>
        </div>
        { links }
      </nav>
    </header>
  );
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps)(AppHeader);
