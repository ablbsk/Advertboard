import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { updateUser } from '../../actions/user-actions';
import { updateUserValidation } from '../../utils/validation/validation';

import UpdateUserEmail from '../update-user-email';
import UpdateUserPassword from '../update-user-password';
import UpdateUserDelete from '../update-user-delete';

import './update-user.css';

class UpdateUser extends Component {

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { username, firstName, lastName, phone } = this.state;
    const obj = { username, firstName, lastName, phone };
    const result = updateUserValidation(obj);
    console.log(this.state);
    if (result === 'good') {
      this.props.updateUser(obj, id);
      this.props.history.push(`/users/${ id }`);
    } else {
      console.log(result);
    }
  };

  render() {
    const { user, auth } = this.props;
    const content = [
      {head: 'Username', id: 'username', placeholder: 'username', defaultValue: user.username},
      {head: 'First name', id: 'firstName', placeholder: 'first name', defaultValue: user.firstName},
      {head: 'Last name', id: 'lastName', placeholder: 'last name', defaultValue: user.lastName},
      {head: 'Phone', id: 'phone', placeholder: 'phone', defaultValue: user.phone}
    ];
    if (!auth.uid) {
      return <Redirect to='/' />
    }
    return (
      <Fragment>
        <BreadcrumbsItem
          className="breadcrumbs-item"
          to={`/users/${auth.uid}`}
        >
          {user.username}
        </BreadcrumbsItem>
        <BreadcrumbsItem
          className="breadcrumbs-item"
          to={`/users/${auth.uid}/update`}
        >
          Update
        </BreadcrumbsItem>
        <div className="update-user__div">
          <form onSubmit={this.handleSubmit}>
            {content.map((item) => (
              <div className="update-user__data" key={item.id}>
                <label
                  className="update-user__label"
                  htmlFor={item.id}
                >
                  {item.head}
                </label>
                <input
                  className="update-user__input"
                  type="text"
                  id={item.id}
                  placeholder={item.placeholder}
                  defaultValue={item.defaultValue}
                  onChange={this.handleChange}/>
              </div>
            ))}
            <button className="update-user__button">ACCEPT</button>
          </form>
          <UpdateUserEmail auth={auth}/>
          <UpdateUserPassword auth={auth}/>
          <UpdateUserDelete user={user} auth={auth}/>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { users } = state.firestore.data;
  const user = users ? users[id] : null;
  return {
    user,
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (user, id) => dispatch(updateUser(user, id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
