import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { removeAdvert, viewsAdvert } from "../../actions/advert-actions";

import './advert-details.css';

class AdvertDetails extends Component {

  handleSubmitRemove = (e) => {
    e.preventDefault();
    this.props.removeAdvert(this.props.match.params.id);
  };

  componentDidMount() {
    let { views } = this.props.advert;
    views++;
    this.props.viewsAdvert(this.state, this.props.match.params.id, views)
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    const { advert } = this.props;
    const { id } = this.props.match.params;
    return (
      <div className="advert-details-div" key={id}>
        <h2>{advert.title}</h2>
        <img src="../public/img/no_image.jpg" alt="no photo"/>
        <table>
          <tbody>
            <tr>
              <td>Описание</td>
              <td>{advert.description}</td>
            </tr>
            <tr>
              <td>Стоимость</td>
              <td>{advert.price}</td>
            </tr>
            <tr>
              <td>Добавил</td>
              <td>{advert.username}</td>
            </tr>
            <tr>
              <td>Категория</td>
              <td>{advert.category}</td>
            </tr>
            <tr>
              <td>Просмотрели</td>
              <td>{advert.views}</td>
            </tr>
            <tr>
              <td>Добавлено</td>
              <td>{moment(advert.created.toDate()).subtract(10, 'days').calendar()}</td>
            </tr>
          </tbody>
        </table>
        <form onSubmit={this.handleSubmitRemove}>
          <button>REMOVE ADVERT</button>
        </form>
        <div>
          <NavLink to={`/advert/${id}/update-advert`}>Update Advert</NavLink>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  console.log(state);
  const { adverts } = state.firestore.data;
  const advert = adverts ? adverts[id] : null;

  return {
    advert,
    removeStatus: state.advert.removeStatus
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
  firestoreConnect([{
    collection: 'adverts',
  }]),
)(AdvertDetails);
