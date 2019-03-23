import React, { Component } from 'react';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { updateUser, deleteUser, deleteUserDB, changePassword, changeEmail } from '../../actions/user-actions';
import { removeAdvert } from '../../actions/advert-actions';
import {Redirect} from "react-router-dom";

class UpdateUser extends Component {

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    this.props.updateUser(this.state, id);
  };

  changeEmailSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, email } = this.state;
    const { id } = this.props.match.params;
    this.props.changeEmail(currentPassword, email);
    this.deleteItems(email);
    this.props.updateUser(this.state, id);
  };

  changePasswordSubmit = (e) => {
    e.preventDefault();
    const { curPassword, newPassword } = this.state;
    this.props.changePassword(curPassword, newPassword);
    this.deleteItems();
  };

  deleteItems = (email) => {
    this.state = { email };
    this.setState(this.state);
  };

  deleteHandleSubmit = (e) => {
    e.preventDefault();
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
    if (!auth.uid) {
      return <Redirect to='/' />
    }
    return (
      <div className="update-div">
        <form onSubmit={this.handleSubmit}>
          <table>
            <tbody>
            <tr>
              <td>First Name</td>
              <td>
                <input type="text" id="firstName" defaultValue={user.firstName} onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>
                <input id="lastName" defaultValue={user.lastName} onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>
                <input type="text" id="phone" defaultValue={user.phone} onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <td>Username</td>
              <td>
                <input type="text" id="username" defaultValue={user.username} onChange={this.handleChange} />
              </td>
            </tr>
            </tbody>
          </table>
          <button>ACCEPT</button>
        </form>

        <form onSubmit={this.changeEmailSubmit}>
          <input
            type="password"
            id="currentPassword"
            placeholder="Enter password"
            onChange={this.handleChange} />
          <input
            type="email"
            id="email"
            placeholder="Enter new email"
            onChange={this.handleChange} />
          <button>UPDATE EMAIL</button>
        </form>

        <form onSubmit={this.changePasswordSubmit}>
          <input
            type="password"
            id="curPassword"
            placeholder="Enter password"
            onChange={this.handleChange} />
          <input
            type="password"
            id="newPassword"
            placeholder="Enter new password"
            onChange={this.handleChange} />
          <button>UPDATE PASSWORD</button>
        </form>

        <form onSubmit={this.deleteHandleSubmit}>
          <button>DELETE USER</button>
        </form>
      </div>
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
