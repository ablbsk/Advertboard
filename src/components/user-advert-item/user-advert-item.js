import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './user-advert-item.css';

const UserAdvertItem = ({ id, data }) => (
  <div className="user-advert-item">
    <Link
      className="user-advert-item__link"
      to={`/advert/${id}`}
    >
      {data.title}
    </Link>
    <ul className="user-advert-item-info">
      <li className="user-advert-item-info__item">
        {data.views}
      </li>
      <li className="user-advert-item-info__item">
        {moment(data.created
          .toDate())
          .subtract(10, 'days')
          .calendar()}
      </li>
    </ul>
  </div>
);

export default UserAdvertItem;
