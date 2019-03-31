import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import SignedInLinks from '../signed-in-links';
import SignedOutLinks from '../signed-out-links';

import './app-header.css';

class AppHeader extends Component {
  render() {
    const { auth } = this.props;
    console.log(auth);
    const links = auth.uid ? <SignedInLinks uid={auth.uid} /> : <SignedOutLinks />;
    return (
      <header>
        <nav>
          <h1 className="logo"><NavLink to="/">Callboard</NavLink></h1>
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
