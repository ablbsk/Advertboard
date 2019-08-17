import React, { Component } from 'react';
import { connect } from 'react-redux';
import {toastr} from 'react-redux-toastr';

import { changePasswordValidation } from '../../../../utils/validation/validation';
import {changePassword} from '../../../../actions/user-actions';

class UpdateUserPassword extends Component {

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  changePassword = (e) => {
    e.preventDefault();
    const { curPassUserPass, newPassword } = this.state;
    const resultValid = changePasswordValidation(this.state);

    resultValid === 'good' ?
      this.props.changePassword(curPassUserPass, newPassword)
      : toastr.error('Error', result);
  };

  render() {
    return (
      <form onSubmit={this.changePassword}>
        <h4 className="headline-h4">change password</h4>
        <div className="content">
          <label
            className="label"
            htmlFor="curPassUserPass"
          >
            Confirm the password
          </label>
          <input
            className="input"
            type="password"
            id="curPassUserPass"
            placeholder="Enter current password ..."
            onChange={this.handleChange} />
        </div>
        <div className="content">
          <label
            className="label"
            htmlFor="newPassword"
          >
            New password
          </label>
          <input
            className="input"
            type="password"
            id="newPassword"
            placeholder="Enter new password ..."
            onChange={this.handleChange} />
        </div>
        <button className="button button_color_blue">change password</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changePassword: (curPassword, newPassword) => dispatch(changePassword(curPassword, newPassword)),
});

export default connect(null, mapDispatchToProps)(UpdateUserPassword);
