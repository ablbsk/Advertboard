import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions/auth-actions';
import {Redirect} from "react-router-dom";

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };

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
    const { authError, auth } = this.props;
    if (auth.uid) {
      return <Redirect to='/' />
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={this.handleChange} />
        </div>
        <div>
          <button>Login</button>
          <div>
            { authError ? <p>{ authError }</p> : null }
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
