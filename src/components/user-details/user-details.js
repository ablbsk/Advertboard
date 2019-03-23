import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {NavLink} from "react-router-dom";

import UserAdvertItem from '../user-advert-item';

class UserDetails extends Component {

  getProperties(curAdvertId) {
    const { adverts } = this.props;
    for (let i = 0; i < adverts.length; i++) {
      if (curAdvertId === adverts[i].id) {
        return {
          title: adverts[i].title,
          views: adverts[i].views,
          created: adverts[i].created
        };
      }
    }
  }

  render() {
    const { user, auth } = this.props;
    const { id } = this.props.match.params;

    const link = (auth.uid && auth.uid === id) ? (
        <div>
          <NavLink to={`/users/${id}/update`}>Update User</NavLink>
        </div>
      ) : null;
    console.log(this.props);
    return (
      <div className="advert-details-div">
        <h2>{user.username}</h2>
        <table>
          <tbody>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>First Name</td>
            <td>{user.firstName}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{user.lastName}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{user.phone}</td>
          </tr>
          </tbody>
        </table>
        {link}
        <div>
          { user.advertsId && user.advertsId.map((id) => (
            <UserAdvertItem id={id} key={id} properties={this.getProperties(id)} />
          ))}
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { users } = state.firestore.data;
  const user = users ? users[id] : null;
  return {
    user,
    adverts: state.firestore.ordered.adverts,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'adverts'}
  ])
)(UserDetails);
