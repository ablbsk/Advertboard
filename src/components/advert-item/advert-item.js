import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './advert-item.css';

const AdvertItem = ({ advert }) => {
  return (
    <article
      className="advert-item__article">
      <img src="../public/img/no_image.jpg" alt="no photo" />
      <div className="advert-item__content">
        <div>
          <Link
            className="advert-item__title"
            to={`/advert/${ advert.id }`}
          >
            {advert.title}
          </Link>
          <p className="advert-item__owner">
            <span>Added </span>
            <span>{advert.username}</span>
            <span> in </span>
            <span>
              {moment(advert.created
                .toDate())
                .subtract(10, 'days')
                .calendar()}
            </span>
          </p>
        </div>
        <p className="advert-item__price">${advert.price}</p>
      </div>
    </article>
  );
};

export default AdvertItem;
