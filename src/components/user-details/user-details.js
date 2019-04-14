import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firestoreConnect from 'react-redux-firebase/lib/firestoreConnect';
import { isEmpty } from 'react-redux-firebase/lib/helpers';
import { NavLink } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import UserAdvertsList from '../user-adverts-list';
import Spinner from '../spinner';

import './user-details.css';

const UserDetails = (props) => {
  const { adverts, auth, user } = props;
  const { id } = props.match.params;

  if (isEmpty(user)) {
    return <Spinner />;
  }

  const { advertsList } = user;

  const data = [
      { head: 'Email', paragraph: user.email },
      { head: 'Phone', paragraph: user.phone },
      { head: 'First name', paragraph: user.firstName },
      { head: 'Last name', paragraph: user.lastName },
    ];
  const link = (auth.uid && auth.uid === id) ? (
    <NavLink
        className="button"
        to={`/users/${id}/update`}
      >
        update profile
      </NavLink>
  ) : null;

  const usersAdverts = (typeof(advertsList) === 'object')
    ? <UserAdvertsList
      userAdvertsId={advertsList}
      adverts={adverts}
    /> : null;

  return (
    <Fragment>
      <BreadcrumbsItem
        className="breadcrumbs__item"
        to={`/users/${id}`}
      >
        {user.username}
      </BreadcrumbsItem>
      <div className="block">
        <h2 className="details-title">{user.username}</h2>
        {data.map(item => (
          <div className="user-details-content" key={item.head}>
            <label className="label">{item.head}</label>
            <p className="user-details-content__p-item">
              {item.paragraph}
            </p>
          </div>
        ))}
        {link}
        {usersAdverts}
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
    adverts: state.firestore.ordered.adverts,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'adverts', orderBy: ['created', 'desc'] },
    { collection: 'users' },
  ]),
)(UserDetails);
