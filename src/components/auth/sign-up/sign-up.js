import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { toastr } from 'react-redux-toastr';

import { signUpValidation } from '../../../utils/validation/validation';
import { signUp } from '../../../actions/auth-actions';

class SignUp extends Component {

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const resultValid = signUpValidation(this.state);
    const resultUsername = this.uniqueCheck();
    if (resultUsername) {
      resultValid === 'good' ? this.props.signUp(this.state) : toastr.error('Error', resultValid);
    }
  };

  uniqueCheck() {
  const { username } = this.state;
  const { users } = this.props;
  for (let i = 0; i < users.length; i++) {
    if (username === users[i].username) {
      toastr.error('Error', 'Such username already exists');
      return false;
      }
    }
  return true;
  }

  render() {
    const { auth } = this.props;
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
                className="input"
                id={item.id}
                type={item.type}
                placeholder={`Enter ${item.placeholder}`}
                onChange={this.handleChange}
              />
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
