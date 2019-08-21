import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changePasswordValidation } from '../../../../utils/validation/user-change-password-validation';
import { changePassword } from '../../../../actions/user-actions';

class UpdateUserPassword extends Component {

  state = {
    errors: {}
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  changePassword = (e) => {
    e.preventDefault();
    const { curPassUserPass, newPassword } = this.state;
    const result = changePasswordValidation(this.state);

    result === 'good' ?
      this.props.changePassword(curPassUserPass, newPassword)
      : this.addErrors(result);
  };

  addErrors = (result) => {
    this.setState({
      errors: result
    }, () => {
      console.log(this.state.errors);
    })
  };

  render() {
    const { errors } = this.state;
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
            className={ "input" + ('curPassUserPass' in errors ? " input_color_red" : "")}
            type="password"
            id="curPassUserPass"
            placeholder="Enter current password ..."
            onChange={this.handleChange}
          />
          { 'curPassUserPass' in errors ? <span className="error">{errors.curPassUserPass}</span> : null }
        </div>
        <div className="content">
          <label
            className="label"
            htmlFor="newPassword"
          >
            New password
          </label>
          <input
            className={ "input" + ('newPassword' in errors ? " input_color_red" : "")}
            type="password"
            id="newPassword"
            placeholder="Enter new password ..."
            onChange={this.handleChange}
          />
          { 'newPassword' in errors ? <span className="error">{errors.newPassword}</span> : null }
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
