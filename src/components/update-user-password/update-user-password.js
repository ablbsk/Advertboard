import React, { Component } from 'react';
import { connect } from 'react-redux';

import {changeUserPassValidation} from '../../utils/validation/validation';
import {changePassword} from '../../actions/user-actions';

class UpdateUserPassword extends Component {

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  changePassword = (e) => {
    e.preventDefault();
    const { curPassUserPass, newPassword } = this.state;
    const obj = { curPassUserPass, newPassword };
    const result = changeUserPassValidation(obj);
    if (result === 'good') {
      this.props.changePassword(curPassUserPass, newPassword);
    } else {
      console.log(result);
    }
  };

  render() {
    return (
      <form onSubmit={this.changePassword}>
        <h4 className="update-user__h4">CHANGE PASSWORD</h4>
        <div className="update-user__data">
          <label
            className="update-user__label"
            htmlFor="curPassUserPass"
          >
            Confirm the password
          </label>
          <input
            className="update-user__input"
            type="password"
            id="curPassUserPass"
            placeholder="Enter current password ..."
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
        <button className="update-user__button">CHANGE PASSWORD</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changePassword: (curPassword, newPassword) => dispatch(changePassword(curPassword, newPassword)),
});

export default connect(null, mapDispatchToProps)(UpdateUserPassword);
