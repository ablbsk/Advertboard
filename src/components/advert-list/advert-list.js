import React from 'react';
import { Link } from 'react-router-dom';

import AdvertItem from '../advert-item';

import './advert-list.css';

const AdvertList = ({ adverts }) => {
  return (
    <section>
      { adverts && adverts.map((advert) => (
          <Link to={`/advert/${ advert.id}`} key={advert.id}>
            <AdvertItem advert={advert} />
          </Link>
      ))}
    </section>
  );
};

export default AdvertList;
