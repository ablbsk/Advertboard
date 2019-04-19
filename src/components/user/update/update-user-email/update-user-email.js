import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { changeEmail } from '../../../../actions/user-actions';
import { changeUserEmailValidation } from '../../../../utils/validation/validation';

class UpdateUserEmail extends Component {

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
    console.log(resultValid);
    if (resultValid === 'good') {
      delete this.state.curPassUserEmail;
      this.props.changeEmail(curPassUserEmail, email, advertsList);
    } else {
      toastr.error('Error', resultValid);
    }
  };

  render() {
    return (
      <form onSubmit={this.changeEmail}>
        <h4 className="headline-h4">change email</h4>
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
        <button className="button">update email</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeEmail: (curPassword, newEmail, advertsList) => dispatch(changeEmail(curPassword, newEmail, advertsList)),
});

export default connect(null, mapDispatchToProps)(UpdateUserEmail);
