import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import { userValidation } from '../../../utils/validation/user-validation';
import { signUp } from '../../../actions/auth-actions';

class SignUp extends Component {

  state = {
    errors: {}
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const resultValid = userValidation(this.state);
    const resultUsername = this.uniqueCheck();
    if (resultUsername) {
      resultValid === 'good' ? this.props.signUp(this.state) : this.addErrors(resultValid);
    }
  };

  addErrors = (result) => {
    this.setState({
      errors: result
    }, () => {
      console.log(this.state.errors);
    })
  };

  uniqueCheck() {
  const { username } = this.state;
  const { users } = this.props;
  const error = {
    username: 'Such username already exists'
  };
  for (let i = 0; i < users.length; i++) {
    if (username === users[i].username) {
      this.addErrors(error);
      return false;
      }
    }
  return true;
  }

  render() {
    const { errors } = this.state;
    const { auth } = this.props;
    const content = [
      {id: 'username', label: 'Username', type: 'text', placeholder: 'username', error: errors.username},
      {id: 'email', label: 'Email', type: 'email', placeholder: 'email', error: errors.email},
      {id: 'password', label: 'Password', type: 'password', placeholder: 'password', error: errors.password},
      {id: 'firstName', label: 'First name', type: 'text', placeholder: 'first name', error: errors.firstName},
      {id: 'lastName', label: 'Last name', type: 'text', placeholder: 'last name', error: errors.lastName},
      {id: 'phone', label: 'Phone', type: 'text', placeholder: 'phone', error: errors.phone},
    ];

    if (auth.uid) {
      return <Redirect to='/' />
    }

    return (
      <Fragment>
        <BreadcrumbsItem
          className="breadcrumbs__item"
          to="/sign-in"
        >
          Sign Up
        </BreadcrumbsItem>
        <form
          className="block"
          onSubmit={this.handleSubmit}
        >
          { content.map((item) => (
            <div className="content" key={item.id}>
              <label
                className="label"
                htmlFor={item.id}
              >
                {item.label}
              </label>
              <input
                className={ "input" + (item.id in errors ? " input_color_red" : "")}
                id={item.id}
                type={item.type}
                placeholder={`Enter ${item.placeholder}`}
                onChange={this.handleChange}
              />
              { item.id in errors ? <span className="error">{item.error}</span> : null }
            </div>
          ))}
          <button className="button button_color_blue">create user</button>
        </form>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'users' }
  ])
)(SignUp);
