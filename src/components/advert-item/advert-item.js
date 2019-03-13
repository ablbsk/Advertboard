import React from 'react';

import './advert-item.css';

const AdvertItem = ({ advert }) => {
  return (
    <article>
      <img src="../public/img/no_image.jpg" alt="no photo" />
      <div className="advert-text">
        <div className="advert-text-left">
          <h4>{advert.title}</h4>
          <p>{advert.description}</p>
        </div>
        <p>${advert.price}</p>
      </div>
    </article>
  );
};

export default AdvertItem;
