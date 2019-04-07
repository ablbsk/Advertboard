import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../actions/auth-actions';

import './signed-in-links.css';

const SignedInLinks = (props) => {
  const { uid } = props;
  const content = [
    { title: 'Create advert', link: 'create-advert', key: 'create-advert' },
    { title: 'Users', link: 'users', key: 'users' },
    { title: 'Profile', link: `users/${uid}`, key: 'profile' },
  ];
  return (
    <div className="navigation">
      <ul className="navigation-list">
        {content.map(item => (
          <li className="navigation-list__li" key={item.key}>
            <NavLink to={`/${item.link}`} title={item.title}>
              <img
                className="navigation-list__img"
                src={`../../../public/img/${item.key}.png`}
                alt={item.title}
              />
            </NavLink>
          </li>
        ))}
        <li className="navigation-list__li">
          <NavLink onClick={props.signOut} to="/" title="Logout">
            <img
              className="navigation-list__img"
              src="../../../public/img/logout.png"
              alt="Logout"
            />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default connect(null, mapDispatchToProps)(SignedInLinks);
