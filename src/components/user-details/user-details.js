import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserDetails extends Component {
  render() {
    const { user } = this.props;
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
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { users } = state.firestore.data;
  const user = users ? users[id] : null;
  return {
    user
  };
};

export default connect(mapStateToProps)(UserDetails);
