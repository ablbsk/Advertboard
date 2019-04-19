import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import UpdateUserData from '../update-user-data';
import UpdateUserEmail from '../update-user-email';
import UpdateUserPassword from '../update-user-password';
import UpdateUserDelete from '../update-user-delete';

const UpdateUser = (props) => {
  const { user, auth } = props;
  if (!auth.uid) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <BreadcrumbsItem
        className="breadcrumbs__item"
        to={`/users/${auth.uid}`}
      >
        {user.username}
      </BreadcrumbsItem>
      <BreadcrumbsItem
        className="breadcrumbs__item"
        to={`/users/${auth.uid}/update`}
      >
          Update
      </BreadcrumbsItem>
      <div className="block">
        <h4 className="headline-h4">update profile</h4>
        <UpdateUserData user={user} />
        <UpdateUserEmail user={user} auth={auth} />
        <UpdateUserPassword auth={auth} />
        <UpdateUserDelete user={user} auth={auth} />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { users } = state.firestore.data;
  const user = users ? users[id] : null;
  return {
    user,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(UpdateUser);
