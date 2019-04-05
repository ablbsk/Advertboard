import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeEmail } from '../../actions/user-actions';
import { changeUserEmailValidation } from '../../utils/validation/validation';

class UpdateUserEmail extends Component {

  state = {
    validError: null
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  changeEmail = (e) => {
    e.preventDefault();
    const {curPassUserEmail, email} = this.state;
    const resultValid = changeUserEmailValidation(this.state);
    if (resultValid) {
      delete this.state.curPassUserEmail;
      this.props.changeEmail(curPassUserEmail, email)
    } else {
      this.setValidError(resultValid);
    }
  };

  setValidError(result) {
    this.setState( {
      validError: result
    });
  }

  render() {
    const { changeEmailError } = this.props;
    const { validError } = this.state;
    return (
      <form onSubmit={this.changeEmail}>
        <h4 className="update-user__h4">CHANGE EMAIL</h4>
        <div className="update-user__data">
          <label
            className="update-user__label"
            htmlFor="curPassUserEmail"
          >
            Confirm the password
          </label>
          <input
            className="update-user__input"
            type="password"
            id="curPassUserEmail"
            placeholder="Enter current password ..."
            onChange={this.handleChange}
          />
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
            onChange={this.handleChange}
          />
        </div>
        <button className="update-user__button">UPDATE EMAIL</button>
        {changeEmailError ?
          <p className="sign-up__error">{changeEmailError}</p> : null}
        {validError ? <p className="sign-up__error">{validError}</p> : null}
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    changeEmailError: state.user.changeEmailError
  }
};

const mapDispatchToProps = dispatch => ({
  changeEmail: (curPassword, newEmail) => dispatch(changeEmail(curPassword, newEmail)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserEmail);
