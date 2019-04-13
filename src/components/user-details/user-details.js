import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import UserAdvertItem from '../user-advert-item';

import './user-details.css';

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

  viewUserAdverts(advertsList) {
    return (
      <div className="user-advert-list">
        <h4 className="headline-h4">user's adverts</h4>
        <ul className="list-header">
          <li className="list-header__title">
            Title
          </li>
          <li className="list-header__view">
            Views
          </li>
          <li>Created</li>
        </ul>
        { advertsList && advertsList.map((id) => (
          <UserAdvertItem
            id={id}
            key={id}
            data={this.getProperties(id)}
          />
        ))}
      </div>
    );
  }

  render() {
    const { user, auth } = this.props;
    const { id } = this.props.match.params;
    const { advertsList } = user;
    const data = [
      { head: 'Email', paragraph: user.email },
      { head: 'Phone', paragraph: user.phone },
      { head: 'First name', paragraph: user.firstName },
      { head: 'Last name', paragraph: user.lastName }
    ];

    const link = (auth.uid && auth.uid === id) ? (
      <NavLink
        className="button"
        to={`/users/${id}/update`}
      >
        update profile
      </NavLink>
    ) : null;

    const advertList = (typeof(advertsList) === 'object') ?
      this.viewUserAdverts(advertsList) : null;

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
          {data.map((item) => (
            <div className="user-details-content" key={item.head}>
              <label className="label">{item.head}</label>
              <p className="user-details-content__p-item">
                {item.paragraph}
              </p>
            </div>
          ))}
          {link}
          {advertList}
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
    adverts: state.firestore.ordered.adverts,
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(UserDetails);
