import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { updateUserValidation } from '../../../../utils/validation/validation';
import { updateUser } from '../../../../actions/user-actions';
import { updatePhonelnAdvert, updateUsernamelnAdvert } from '../../../../actions/advert-actions';

class UpdateUserData extends Component {
  state = {
    username: this.props.user.username,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    phone: this.props.user.phone,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const result = updateUserValidation(this.state);
    const resultUsername = this.uniqueCheck();
    if (resultUsername) {
      result === 'good' ? this.setData() : toastr.error('Error', result);
    }
  };

  uniqueCheck() {
    const { username, oldUsername } = this.state;
    const { users } = this.props;

    if (username === oldUsername) {
      return true;
    }

    for (let i = 0; i < users.length; i++) {
      if (username === users[i].username) {
        toastr.error('Error', 'Such username already exists.');
        return false;
      }
    }
    return true;
  }

  setData() {
    const { oldUsername, oldPhone, username, phone } = this.state;
    const { advertsList } = this.props.user;
    if (typeof(advertsList) === 'object') {
      if (oldUsername !== username) {
        const type = 'username';
        this.updateContactsInAdvert(username, type);
      }

      if (oldPhone !== phone) {
        const type = 'phone';
        this.updateContactsInAdvert(phone, type);
      }
    }
    this.cleanState();
    this.props.updateUser(this.state);
  }

  updateContactsInAdvert(newValue, type) {
    const { advertsList } = this.props.user;
    for (let i = 0; i < advertsList.length; i++) {
      const id = advertsList[i];
      if (type === 'username') {
        this.props.updateUsernamelnAdvert(newValue, id);
      }
      if (type === 'phone') {
        this.props.updatePhonelnAdvert(newValue, id);
      }
    }
  }

  cleanState() {
    delete this.state.oldUsername;
    delete this.state.oldPhone;
  }

  componentDidMount() {
    const { username, phone } = this.state;
    this.setState( {
      oldUsername: username,
      oldPhone: phone
    });
  }

  render() {
    const { user } = this.props;
    const content = [
      {head: 'Username', id: 'username', placeholder: 'username', defaultValue: user.username},
      {head: 'First name', id: 'firstName', placeholder: 'first name', defaultValue: user.firstName},
      {head: 'Last name', id: 'lastName', placeholder: 'last name', defaultValue: user.lastName},
      {head: 'Phone', id: 'phone', placeholder: 'phone', defaultValue: user.phone}
    ];
    return (
      <form onSubmit={this.handleSubmit}>
        {content.map((item) => (
          <div className="content" key={item.id}>
            <label
              className="label"
              htmlFor={item.id}
            >
              {item.head}
            </label>
            <input
              className="input"
              type="text"
              id={item.id}
              placeholder={item.placeholder}
              defaultValue={item.defaultValue}
              onChange={this.handleChange}
            />
          </div>
        ))}
        <button className="button button_color_blue">accept</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    updateUsernamelnAdvert: (username, advertId) => dispatch(updateUsernamelnAdvert(username, advertId)),
    updatePhonelnAdvert: (phone, advertId) => dispatch(updatePhonelnAdvert(phone, advertId)),
  }
};

export default connect(null, mapDispatchToProps)(UpdateUserData);
