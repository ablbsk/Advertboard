import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changePasswordValidation } from '../../utils/validation/validation';
import {changePassword} from '../../actions/user-actions';

class UpdateUserPassword extends Component {

  state = {
    validError: null
  };

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
      : this.setValidError(resultValid);
  };

  setValidError(result) {
    this.setState( {
      validError: result
    });
  }

  render() {
    const { changePassError } = this.props;
    const { validError } = this.state;
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
        {changePassError ?
          <p className="sign-up__error">{changePassError}</p> : null}
        {validError ? <p className="sign-up__error">{validError}</p> : null}
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    changePassError: state.user.changePassError
  }
};

const mapDispatchToProps = dispatch => ({
  changePassword: (curPassword, newPassword) => dispatch(changePassword(curPassword, newPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserPassword);
