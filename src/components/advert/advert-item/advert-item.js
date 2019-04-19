import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

import './advert-item.css';

const AdvertItem = ({ advert }) => {
  return (
    <article className="advert">
      <img
        className="advert_img"
        src="/assets/img/no_image.jpg"
        alt="no photo"
      />
      <div className="advert-content">
        <div className="advert-text">
          <Link
            className="advert-text__title"
            to={`/advert/${ advert.id }`}
          >
            {advert.title}
          </Link>
          <p className="advert-text__owner">
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
        <p className="advert-content__price">${advert.price}</p>
      </div>
    </article>
  );
};

export default AdvertItem;
