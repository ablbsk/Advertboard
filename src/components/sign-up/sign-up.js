import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../actions/auth-actions';

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  render() {
    const { auth, authError } = this.props;

    if (auth.uid) {
      return <Redirect to='/' />
    }

    return (
      <form onSubmit={this.handleSubmit} className="create-advert-form">
        <div className="create-form-div">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" onChange={this.handleChange}/>
        </div>
        <div className="create-form-div">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" onChange={this.handleChange}/>
        </div>
        <div className="create-form-div">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" onChange={this.handleChange}/>
        </div>
        <div className="create-form-div">
          <label htmlFor="firstName">First name</label>
          <input id="firstName" type="text" onChange={this.handleChange}/>
        </div>
        <div className="create-form-div">
          <label htmlFor="lastName">Last name</label>
          <input id="lastName" type="text" onChange={this.handleChange}/>
        </div>
        <div className="create-form-div">
          <label htmlFor="phone">Phone</label>
          <input id="phone" type="text" onChange={this.handleChange}/>
        </div>
        <button className="create-btn">Create User</button>
        <div>
          { authError ? <p>{authError}</p> : null }
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
