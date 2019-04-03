import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { signIn } from '../../actions/auth-actions';

import './sign-in.css';

class SignIn extends Component {

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    const { signInError, auth } = this.props;

    if (auth.uid) {
      return <Redirect to='/' />
    }
    return (
      <Fragment>
        <BreadcrumbsItem
          className="breadcrumbs-item"
          to="/sign-in"
        >
          Login
        </BreadcrumbsItem>
        <form
          className="sign-in__form"
          onSubmit={this.handleSubmit}>
          <div className="sign-in__content">
            <label
              className="sign-in__label"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="sign-in__input"
              type="email"
              id="email"
              placeholder="Enter email"
              onChange={this.handleChange} />
          </div>
          <div className="sign-in__content">
            <label
              className="sign-in__label"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="sign-in__input"
              type="password"
              id="password"
              placeholder="Enter password"
              onChange={this.handleChange} />
          </div>
          <button className="sign-in__button">Login</button>
          { signInError ? <p className="sign-in__error">{ signInError }</p> : null }
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signInError: state.auth.signInError,
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
