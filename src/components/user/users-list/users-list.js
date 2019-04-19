import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firestoreConnect from 'react-redux-firebase/lib/firestoreConnect';
import { isLoaded, isEmpty } from 'react-redux-firebase/lib/helpers';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import UserItem from '../user-item';
import Spinner from '../../layout/spinner';
import EmptyMessage from '../../layout/empty-message';

import './users-list.css';

const UsersList = (props) => {
  const { users } = props;

  if (!isLoaded(users)) {
    return <Spinner />;
  }

  if (isEmpty(users)) {
    return <EmptyMessage />;
  }

  return (
    <Fragment>
      <BreadcrumbsItem
        className="breadcrumbs__item"
        to="/users"
      >
        Users
      </BreadcrumbsItem>
      <section className="users-list">
        {users && users.map(user => (
          <UserItem user={user} key={user.id} />
        ))}
      </section>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  users: state.firestore.ordered.users,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'users', orderBy: ['username'] },
  ]),
)(UsersList);
