import React from 'react';
import { Link } from 'react-router-dom';

import './user-item.css';

const UserItem = ({ user }) => {
  return (
    <article className="user-item">
      <Link
        className="user-item__link"
        to={`/users/${user.id}`}>
        {user.username}
      </Link>
      <p className="user-item__fullname">
        {user.firstName} {user.lastName}
      </p>
    </article>
  );
};

export default UserItem;
