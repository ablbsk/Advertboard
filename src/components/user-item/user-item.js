import React from 'react';
import { Link } from 'react-router-dom';

import './user-item.css';

const UserItem = ({ user }) => {
  return (
    <article className="user-item__content">
      <Link to={`/users/${user.id}`}>
        {user.username}
      </Link>
      <p>{user.firstName} {user.lastName}</p>
    </article>
  );
};

export default UserItem;
