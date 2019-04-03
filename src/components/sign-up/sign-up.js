import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { signUpValidation } from '../../utils/validation/validation';
import { signUp } from '../../actions/auth-actions';

import './sign-up.css';

class SignUp extends Component {

  state = {
    validError: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const result = signUpValidation(this.state);
    if (result === 'good') {
      this.props.signUp(this.state);
    } else {
      this.setValidError(result);
    }
  };

  setValidError(result) {
    this.setState( {
      validError: result
    });
  }

  render() {
    const { auth, singUpError } = this.props;
    const { validError } = this.state;
    const content = [
      {id: 'username', label: 'Username', type: 'text', placeholder: 'username'},
      {id: 'email', label: 'Email', type: 'email', placeholder: 'email'},
      {id: 'password', label: 'Password', type: 'password', placeholder: 'password'},
      {id: 'firstName', label: 'First name', type: 'text', placeholder: 'first name'},
      {id: 'lastName', label: 'Last name', type: 'text', placeholder: 'last name'},
      {id: 'phone', label: 'Phone', type: 'text', placeholder: 'phone'},
    ];
    if (auth.uid) {
      return <Redirect to='/' />
    }

    return (
      <Fragment>
        <BreadcrumbsItem
          className="breadcrumbs-item"
          to="/sign-in"
        >
          Sign Up
        </BreadcrumbsItem>
        <form
          className="sign-up__form"
          onSubmit={this.handleSubmit}
        >
          { content.map((item) => (
            <div className="sign-up__content" key={item.id}>
              <label
                className="sign-up__label"
                htmlFor={item.id}
              >
                {item.label}
              </label>
              <input
                className="sign-up__input"
                id={item.id}
                type={item.type}
                placeholder={`Enter ${item.placeholder}`}
                onChange={this.handleChange}
              />
            </div>
          ))}
          <button className="sign-up__button">Create User</button>
          { singUpError ? <p className="sign-up__error">{singUpError}</p> : null }
          { validError ? <p className="sign-up__error">{validError}</p> : null }
        </form>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    singUpError: state.auth.singUpError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
