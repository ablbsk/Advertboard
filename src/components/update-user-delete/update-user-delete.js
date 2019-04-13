import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteUser } from '../../actions/user-actions';
import { removeAdvert } from '../../actions/advert-actions';

class UpdateUserDelete extends Component {

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  deleteAccount = (e) => {
    e.preventDefault();
    const { advertsList } = this.props.user;
    const { curPassDelAcc } = this.state;

    if (typeof(advertsList) !== 'undefined') {
      for (let i = 0; i < advertsList.length; i++) {
        const id = advertsList[i];
        this.props.removeAdvert(id);
      }
    }
    this.props.deleteUser(curPassDelAcc);
  };

  render() {
    return (
      <form onSubmit={this.deleteAccount}>
        <h4 className="headline-h4_red">delete account</h4>
        <div className="content">
          <label
            className="label"
            htmlFor="curPassDelAcc"
          >
            Confirm the password
          </label>
          <input
            className="input"
            type="password"
            id="curPassDelAcc"
            placeholder="Enter password ..."
            onChange={this.handleChange} />
        </div>
        <button className="button_red">
          delete profile
        </button>
      </form>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  deleteUser: (currentPassword) => dispatch(deleteUser(currentPassword)),
  removeAdvert: (id) => dispatch(removeAdvert(id))
});

export default connect(null, mapDispatchToProps)(UpdateUserDelete);
