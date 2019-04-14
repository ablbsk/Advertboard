import React from 'react';
import UserAdvertItem from '../user-advert-item';

import './user-adverts-list.css';

const UserAdvertsList = ({ adverts }) => {
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
      { adverts && adverts.map(item => (
        <UserAdvertItem
          id={item.id}
          key={item.id}
          data={item}
        />
      ))}
    </div>
  );
};

export default UserAdvertsList;
