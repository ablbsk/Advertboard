import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firestoreConnect from 'react-redux-firebase/lib/firestoreConnect';
import { isEmpty } from 'react-redux-firebase/lib/helpers';
import { NavLink } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import UserAdvertsList from '../user-adverts-list';
import Spinner from '../spinner';

import './user-details.css';

class UserDetails extends Component {
  render() {
    const { adverts, auth, user } = this.props;
    const { id } = this.props.match.params;

    if (isEmpty(user)) {
      return <Spinner />;
    }

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

    const advertsList = (typeof (adverts) === 'object')
      ? <UserAdvertsList adverts={adverts} /> : null;

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
          {advertsList}
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
    id,
    user,
    adverts: state.firestore.ordered.adverts,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    { collection: 'adverts', where: [['authorId', '==', props.id]] },
    { collection: 'users' },
  ]),
)(UserDetails);
