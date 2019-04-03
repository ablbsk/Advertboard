import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { updateUser, deleteUser, deleteUserDB, changePassword, changeEmail } from '../../actions/user-actions';
import { removeAdvert } from '../../actions/advert-actions';
import { Redirect } from "react-router-dom";
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { updateUserValidation, changeUserEmailValidation, changeUserPassValidation } from '../../utils/validation/validation';

import './update-user.css';

class UpdateUser extends Component {

  state = {
    username: this.props.user.username,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    email: this.props.user.email,
    phone: this.props.user.phone,
    currentPassword: this.props.user.currentPassword,
    curPassword: this.props.user.curPassword,
    newPassword: this.props.user.newPassword,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { username, firstName, lastName, phone } = this.state;
    const obj = { username, firstName, lastName, phone };
    const result = updateUserValidation(obj);
    console.log(this.state);
    if (result === 'good') {
      this.props.updateUser(obj, id);
      this.props.history.push(`/users/${ id }`);
    } else {
      console.log(result);
    }
  };

  changeEmail = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { currentPassword, email } = this.state;
    const obj = { currentPassword, email };
    const result = changeUserEmailValidation(obj);
    if (result === 'good') {
      this.props.changeEmail(currentPassword, email);
      this.deleteItems(email);
      this.props.updateUser(this.state, id);
    } else {
      console.log(result);
    }
  };

  changePassword = (e) => {
    e.preventDefault();
    const { curPassword, newPassword } = this.state;
    const obj = { curPassword, newPassword };
    const result = changeUserPassValidation(obj);
    if (result === 'good') {
      this.props.changePassword(curPassword, newPassword);
      this.deleteItems();
    } else {
      console.log(result);
    }
  };

  deleteItems = (email) => {
    this.state = { email };
    this.setState(this.state);
  };

  deleteAccount = () => {
    const { advertsId } = this.props.user;
    const { id } = this.props.match.params;
    for (let i = 0; i < advertsId.length; i++) {
      const id = advertsId[i];
      this.props.removeAdvert(id);
    }
    this.props.deleteUserDB(id);
    this.props.deleteUser();
  };

  render() {
    const { user, auth } = this.props;
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
          <form onSubmit={this.handleSubmit}>
            {content.map((item) => (
              <div className="update-user__data">
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

          <form onSubmit={this.changeEmail}>
            <h4 className="update-user__h4">CHANGE EMAIL</h4>
            <div className="update-user__data">
              <label
                className="update-user__label"
                htmlFor="currentPassword"
              >
                Confirm the password
              </label>
              <input
                className="update-user__input"
                type="password"
                id="currentPassword"
                placeholder="Enter current password ..."
                onChange={this.handleChange} />
            </div>
            <div className="update-user__data">
              <label
                className="update-user__label"
                htmlFor="email"
              >
                New email
              </label>
              <input
                className="update-user__input"
                type="email"
                id="email"
                placeholder="Enter new email ..."
                onChange={this.handleChange} />
            </div>
            <button className="update-user__button">UPDATE EMAIL</button>
          </form>

          <form onSubmit={this.changePassword}>
            <h4 className="update-user__h4">CHANGE PASSWORD</h4>
            <div className="update-user__data">
              <label
                className="update-user__label"
                htmlFor="curPassword"
              >
                Confirm the password
              </label>
              <input
                className="update-user__input"
                type="password"
                id="curPassword"
                placeholder="Enter password ..."
                onChange={this.handleChange} />
            </div>
            <div className="update-user__data">
              <label
                className="update-user__label"
                htmlFor="newPassword"
              >
                New password
              </label>
              <input
                className="update-user__input"
                type="password"
                id="newPassword"
                placeholder="Enter new password ..."
                onChange={this.handleChange} />
            </div>
            <button className="update-user__button">Change password</button>
          </form>

          <button
            className="update-user__button-warning"
            onSubmit={this.deleteAccount}
          >
            DELETE ACCOUNT
          </button>
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
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (user, id) => dispatch(updateUser(user, id)),
    changeEmail: (currentPassword, newEmail) => dispatch(changeEmail(currentPassword, newEmail)),
    changePassword: (currentPassword, newPassword) => dispatch(changePassword(currentPassword, newPassword)),
    deleteUser: () => dispatch(deleteUser()),
    deleteUserDB: (id) => dispatch(deleteUserDB(id)),
    removeAdvert: (id) => dispatch(removeAdvert(id))
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{
    collection: 'adverts',
  }]),
)(UpdateUser);
