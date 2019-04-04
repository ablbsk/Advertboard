import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import UserItem from '../user-item';

const UsersList = (props) => {
  const { users } = props;
  return (
    <Fragment>
      <BreadcrumbsItem
        className="breadcrumbs-item"
        to="/users"
      >
        Users
      </BreadcrumbsItem>
      {users && users.map(user => (
        <UserItem user={user} key={user.id} />
      ))}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  users: state.firestore.ordered.users,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'users' },
  ]),
)(UsersList);
