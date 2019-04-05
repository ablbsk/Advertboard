import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { updateUser } from '../../actions/user-actions';
import { updateUserValidation } from '../../utils/validation/validation';

import UpdateUserEmail from '../update-user-email';
import UpdateUserPassword from '../update-user-password';
import UpdateUserDelete from '../update-user-delete';

import './update-user.css';

class UpdateUser extends Component {

  state = {
    username: this.props.user.username,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    phone: this.props.user.phone,
    validError: null
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { uid } = this.props.auth;
    const result = updateUserValidation(this.state);
    const resultUsername = this.uniqueCheck();
    if (resultUsername) {
      result === 'good' ? this.props.updateUser(this.state, uid) : this.setValidError(result);
    }
  };

  uniqueCheck() {
    const { username } = this.state;
    const { users } = this.props;
    for (let i = 0; i < users.length; i++) {
      if (username === users[i].username) {
        const result = 'Such username already exists';
        this.setValidError(result);
        return false;
      }
    }
    return true;
  }

  setValidError(result) {
    this.setState( {
      validError: result
    });
  }

  render() {
    const { user, auth } = this.props;
    const { validError } = this.state;
    const content = [
      {head: 'Username', id: 'username', placeholder: 'username', defaultValue: user.username},
      {head: 'First name', id: 'firstName', placeholder: 'first name', defaultValue: user.firstName},
      {head: 'Last name', id: 'lastName', placeholder: 'last name', defaultValue: user.lastName},
      {head: 'Phone', id: 'phone', placeholder: 'phone', defaultValue: user.phone}
    ];

    if (!auth.uid) {
      return <Redirect to='/' />
    }

    return (
      <Fragment>
        <BreadcrumbsItem
          className="breadcrumbs-item"
          to={`/users/${auth.uid}`}
        >
          {user.username}
        </BreadcrumbsItem>
        <BreadcrumbsItem
          className="breadcrumbs-item"
          to={`/users/${auth.uid}/update`}
        >
          Update
        </BreadcrumbsItem>
        <div className="update-user__div">
          <h4 className="update-user__h4">UPDATE PROFILE</h4>
          <form onSubmit={this.handleSubmit}>
            {content.map((item) => (
              <div className="update-user__data" key={item.id}>
                <label
                  className="update-user__label"
                  htmlFor={item.id}
                >
                  {item.head}
                </label>
                <input
                  className="update-user__input"
                  type="text"
                  id={item.id}
                  placeholder={item.placeholder}
                  defaultValue={item.defaultValue}
                  onChange={this.handleChange}/>
              </div>
            ))}
            <button className="update-user__button">ACCEPT</button>
          </form>
          {validError ? <p className="sign-up__error">{validError}</p> : null}
          <UpdateUserEmail auth={auth}/>
          <UpdateUserPassword auth={auth}/>
          <UpdateUserDelete user={user} auth={auth}/>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { users } = state.firestore.data;
  const user = users ? users[id] : null;
  return {
    user,
    users: state.firestore.ordered.users,
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (user, id) => dispatch(updateUser(user, id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
