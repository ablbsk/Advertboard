import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { removeAdvert, viewsAdvert } from '../../actions/advert-actions';

import './advert-details.css';

class AdvertDetails extends Component {

  handleSubmitRemove = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    this.props.removeAdvert(id);
    this.props.history.push('/');
  };

  viewOwnerOptions(id) {
    return (
      <div className="advert-details__options">
        <NavLink
          className="advert-details__button"
          to={`/advert/${id}/update-advert`}
        >
          UPDATE ADVERT
        </NavLink>
        <form
          className="advert-details__form"
          onSubmit={this.handleSubmitRemove}
        >
          <button className="advert-details__button-warning">
            REMOVE ADVERT
          </button>
        </form>
      </div>
    )
  }

  static viewLastUpdate(modified) {
    return (
      <div>
        <h5 className="advert-details__h5">Last update</h5>
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
    const { id } = this.props.match.params;
    let { views } = this.props.advert;
    views++;
    this.props.viewsAdvert(this.state, id, views)
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    const { advert, auth } = this.props;
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
          className="breadcrumbs-item"
          to={`/advert/${id}`}
        >
          {advert.title}
        </BreadcrumbsItem>
        <div className="advert-details__div">
          <h2 className="advert-details__head">{advert.title}</h2>
          <img src="../public/img/no_image.jpg" alt="no photo"/>
          <div className="advert-details__content">
            <div className="advert-details__description">
              <div>
                <h5 className="advert-details__h5">Description</h5>
                <p>{advert.description}</p>
              </div>
              <p className="advert-details__price">${advert.price}</p>
            </div>
            <div className="advert-details__contacts">
              <h5 className="advert-details__h5">Contacts</h5>
              <div className="advert-details__contacts-div">
                <p className="advert-details__contacts-p">
                  <img src="../../../public/img/owner.png" alt="Owner" />
                  <NavLink
                    className="advert-details__owner"
                    to={`/users/${advert.authorId}`}
                  >
                    {advert.username}
                  </NavLink>
                </p>
                <p className="advert-details__contacts-p">
                  <img src="../../../public/img/email.png" alt="Email" />
                  <span>{advert.email}</span>
                </p>
                <p className="advert-details__contacts-p">
                  <img src="../../../public/img/phone.png" alt="Phone" />
                  <span>{advert.phone}</span>
                </p>
              </div>
            </div>
            <div className="advert-details__additionally">
              <div>
                <h5 className="advert-details__h5">Category</h5>
                <p>{advert.category}</p>
              </div>
              <div>
                <h5 className="advert-details__h5">Views</h5>
                <p>{advert.views}</p>
              </div>
              <div>
                <h5 className="advert-details__h5">Created at</h5>
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
    removeStatus: state.advert.removeStatus,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeAdvert: (id) => dispatch(removeAdvert(id)),
    viewsAdvert: (advert, id, views) => dispatch(viewsAdvert(advert, id, views))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertDetails);
