import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { signIn } from '../../../actions/auth-actions';

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
    const { auth } = this.props;

    if (auth.uid) {
      return <Redirect to='/' />
    }
    return (
      <Fragment>
        <BreadcrumbsItem
          className="breadcrumbs__item"
          to="/sign-in"
        >
          Login
        </BreadcrumbsItem>
        <form
          className="block"
          onSubmit={this.handleSubmit}>
          <div className="content">
            <label
              className="label"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="input"
              type="email"
              id="email"
              minLength="6"
              maxLength="30"
              placeholder="Enter email"
              onChange={this.handleChange} />
          </div>
          <div className="content">
            <label
              className="label"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="input"
              type="password"
              id="password"
              placeholder="Enter password"
              onChange={this.handleChange} />
          </div>
          <button className="button button_color_blue">login</button>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
