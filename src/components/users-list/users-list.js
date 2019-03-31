import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import UserItem from '../user-item';

class UsersList extends Component {
  render() {
    const { users } = this.props;
    console.log(this.props);
    return (
      <div>
        <BreadcrumbsItem to="/users">Users</BreadcrumbsItem>

        <div>
          {users && users.map(user => (
            <Link to={`/users/${user.id}`} key={user.id}>
              <UserItem user={user} />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.firestore.ordered.users,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'users' },
  ]),
)(UsersList);
