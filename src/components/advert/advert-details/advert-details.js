import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firestoreConnect from 'react-redux-firebase/lib/firestoreConnect';
import { isEmpty } from 'react-redux-firebase/lib/helpers';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { removeAdvert, viewsAdvert } from '../../../actions/advert-actions';

import Spinner from '../../layout/spinner';

import './advert-details.css';

class AdvertDetails extends Component {

  removeAdvert = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    this.props.removeAdvert(id);
    this.props.history.push('/');
  };

  viewOwnerOptions(id) {
    return (
      <div className="content-options">
        <NavLink
          className="button"
          to={`/advert/${id}/update-advert`}
        >
          update advert
        </NavLink>
        <form
          className="content-options__delete-form"
          onSubmit={this.removeAdvert}
        >
          <button className="button_red">
            remove advert
          </button>
        </form>
      </div>
    )
  }

  static viewLastUpdate(modified) {
    return (
      <div>
        <label className="label">Last update</label>
        <p>
          {moment(modified
            .toDate())
            .subtract(10, 'days')
            .calendar()}
        </p>
      </div>
    )
  }

  componentDidMount() {
    setTimeout(() => {
      const {id} = this.props.match.params;
      let {views} = this.props.advert;
      views++;
      this.props.viewsAdvert(this.state, id, views)
    }, 2000);
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    const { advert, auth } = this.props;

    if (isEmpty(advert)) {
      return <Spinner />;
    }

    const { authorId } = advert;
    const { id } = this.props.match.params;

    const link = (auth.uid && auth.uid === authorId) ? (
      this.viewOwnerOptions(id)
    ) : null;

    const update = (advert.modified ?
      AdvertDetails.viewLastUpdate(advert.modified) : null);

    return (
      <Fragment>
        <BreadcrumbsItem
          className="breadcrumbs__item"
          to={`/advert/${id}`}
        >
          {advert.title}
        </BreadcrumbsItem>
        <div className="advert-details">
          <h2 className="details-title">{advert.title}</h2>
          <img
            className="advert-details__img"
            src="/assets/img/no_image.jpg"
            alt="no photo"
          />
          <div className="advert-details-content">
            <div className="content-description">
              <div className="content-description__text">
                <label className="label">Description</label>
                <p>{advert.description}</p>
              </div>
              <p className="content-description__price">${advert.price}</p>
            </div>
            <div className="content-contacts">
              <label className="label">Contacts</label>
              <div className="content-contacts-text">
                <p className="contacts-text-p-item">
                  <img
                    className="contacts-text-p-item__img"
                    src="/assets/img/owner.png"
                    alt="Owner" />
                  <NavLink
                    className="contacts-text-p-item__username"
                    to={`/users/${advert.authorId}`}
                  >
                    {advert.username}
                  </NavLink>
                </p>
                <p className="contacts-text-p-item">
                  <img
                    className="contacts-text-p-item__img"
                    src="/assets/img/email.png"
                    alt="Email" />
                  <span>{advert.email}</span>
                </p>
                <p className="contacts-text-p-item">
                  <img
                    className="contacts-text-p-item__img"
                    src="/assets/img/phone.png"
                    alt="Phone" />
                  <span>{advert.phone}</span>
                </p>
              </div>
            </div>
            <div className="content-additionally">
              <div className="content-additionally__div-item">
                <label className="label">Category</label>
                <p>{advert.category}</p>
              </div>
              <div className="content-additionally__div-item">
                <label className="label">Views</label>
                <p>{advert.views}</p>
              </div>
              <div className="content-additionally__div-item">
                <label className="label">Created at</label>
                <p>
                  {moment(advert.created
                    .toDate())
                    .subtract(10, 'days')
                    .calendar()}
                </p>
              </div>
              {update}
            </div>
            {link}
          </div>
        </div>
      </Fragment>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { adverts } = state.firestore.data;
  const advert = adverts ? adverts[id] : null;

  return {
    advert,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeAdvert: (id) => dispatch(removeAdvert(id)),
    viewsAdvert: (advert, id, views) => dispatch(viewsAdvert(advert, id, views))
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'adverts' },
  ]),
)(AdvertDetails);
