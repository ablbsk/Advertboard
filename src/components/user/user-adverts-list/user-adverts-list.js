import React from 'react';
import UserAdvertItem from '../user-advert-item';

import './user-adverts-list.css';

const UserAdvertsList = ({ userAdvertsId, adverts }) => {

  const getProperties = (id) => {
    for (let i = 0; i < adverts.length; i++) {
      if (id === adverts[i].id) {
        return {
          title: adverts[i].title,
          views: adverts[i].views,
          created: adverts[i].created
        };
      }
    }
  };

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
      { userAdvertsId && userAdvertsId.map(id => (
        <UserAdvertItem
          id={id}
          key={id}
          data={getProperties(id)}
        />
      ))}
    </div>
  );
};

export default UserAdvertsList;
