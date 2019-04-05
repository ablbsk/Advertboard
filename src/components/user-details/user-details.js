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
      <div>
        <h4 className="user-details__head">Users adverts</h4>
        <div className="user-details__advert-head">
          <span>Title</span>
          <ul className="user-details__advert-head-ul">
            <li>Views</li>
            <li>Created</li>
          </ul>
        </div>
        { advertsList && advertsList.map((id) => (
          <UserAdvertItem
            id={id}
            key={id}
            properties={this.getProperties(id)}
          />
        ))}
      </div>
    );
  }

  render() {
    console.log(this.props);
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
        className="user-details__button"
        to={`/users/${id}/update`}
      >
        Update
      </NavLink>
    ) : null;
    console.log(typeof(advertsList));
    const advertList = (typeof(advertsList) === 'object') ?
      this.viewUserAdverts(advertsList) : null;

    return (
      <Fragment>
        <BreadcrumbsItem
          className="breadcrumbs-item"
          to={`/users/${id}`}
        >
          {user.username}
        </BreadcrumbsItem>
        <div className="user-details__div">
          <h2 className="user-details__head">{user.username}</h2>
          {data.map((item) => (
            <div className="user-details__content" key={item.head}>
              <h5 className="user-details__h5">{item.head}</h5>
              <p className="user-details__p">{item.paragraph}</p>
            </div>
          ))}
          {link}
          {advertList}
        </div>
      </Fragment>
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

export default connect(mapStateToProps)(UserDetails);
