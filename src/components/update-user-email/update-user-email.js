import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateUser, changeEmail } from '../../actions/user-actions';
import { changeUserEmailValidation } from '../../utils/validation/validation';

class UpdateUserEmail extends Component {

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  changeEmail = (e) => {
    e.preventDefault();
    const { uid } = this.props.auth;
    const {curPassUserEmail, email} = this.state;
    const result = changeUserEmailValidation(this.state);
    if (result === 'good') {
      this.props.changeEmail(curPassUserEmail, email);
      delete this.state.curPassUserEmail;
      this.props.updateUser(this.state, uid);
    } else {
      console.log(result);
    }
  };

  render() {
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
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: (user, id) => dispatch(updateUser(user, id)),
  changeEmail: (curPassword, newEmail) => dispatch(changeEmail(curPassword, newEmail)),
});

export default connect(null, mapDispatchToProps)(UpdateUserEmail);
