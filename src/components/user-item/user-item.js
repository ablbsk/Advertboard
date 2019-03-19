import React from 'react';

const UserItem = ({ user }) => {
  return (
    <article>
      <div className="advert-text">
        <h4>{user.username}</h4>
      </div>
    </article>
  );
};

export default UserItem;
