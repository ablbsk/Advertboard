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
    const { advertsList } = this.props.user;
    const {curPassUserEmail, email} = this.state;
    const resultValid = changeUserEmailValidation(this.state);
    if (resultValid) {
      delete this.state.curPassUserEmail;
      delete this.state.validError;
      this.props.changeEmail(curPassUserEmail, email, advertsList);
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
        <h4 className="headline-h4">CHANGE EMAIL</h4>
        <div className="content">
          <label
            className="label"
            htmlFor="curPassUserEmail"
          >
            Confirm the password
          </label>
          <input
            className="input"
            type="password"
            id="curPassUserEmail"
            placeholder="Enter current password ..."
            onChange={this.handleChange}
          />
        </div>
        <div className="content">
          <label
            className="label"
            htmlFor="email"
          >
            New email
          </label>
          <input
            className="input"
            type="email"
            id="email"
            minLength="6"
            maxLength="30"
            placeholder="Enter new email ..."
            onChange={this.handleChange}
          />
        </div>
        <button className="button">UPDATE EMAIL</button>
        {changeEmailError ?
          <p className="error">{changeEmailError}</p> : null}
        {validError ? <p className="error">{validError}</p> : null}
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
  changeEmail: (curPassword, newEmail, advertsList) => dispatch(changeEmail(curPassword, newEmail, advertsList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserEmail);
