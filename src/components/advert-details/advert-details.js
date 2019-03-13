import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import './advert-details.css';

const AdvertDetails = (props) => {
  const { advert } = props;

  return (
    <div className="advert-details-div">
      <h2>{advert.title}</h2>
      <img src="../public/img/no_image.jpg" alt="no photo" />
      <table>
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
      </table>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { adverts } = state.firestore.data;
  const advert = adverts ? adverts[id] : null;

  return {
    advert,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'adverts',
  }]),
)(AdvertDetails);
