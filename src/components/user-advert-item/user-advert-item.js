import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './user-advert-item.css';

const UserAdvertItem = ({ id, properties }) => {
  return (
    <div className="user-advert-item__content">
      <Link to={`/advert/${id}`}>
        {properties.title}
      </Link>
      <ul>
        <li className="user-advert-item__li">
          {properties.views}
        </li>
        <li className="user-advert-item__li">
          {moment(properties.created
            .toDate())
            .subtract(10, 'days')
            .calendar()}
        </li>
      </ul>
    </div>
  );
};

export default UserAdvertItem;
