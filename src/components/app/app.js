import React, { Fragment } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import AppHeader from '../app-header';
import CreateAdvert from '../create-advert';
import SignIn from '../sign-in';
import SignUp from '../sign-up';

import AdvertList from '../advert-list';
import AdvertDetails from '../advert-details';
import UpdateAdvert from '../update-advert';

import UsersList from '../users-list';
import UserDetails from '../user-details';
import UpdateUser from '../update-user';

import Search from '../search';

const Advert = () => {
  return (
    <Switch>
      <Route exact path="/advert/:id" component={AdvertDetails} />
      <Route path="/advert/:id/update-advert" component={UpdateAdvert} />
    </Switch>
  );
};

const Users = () => {
  return (
    <Fragment>
      <BreadcrumbsItem
        className="breadcrumbs__item"
        to="/users"
      >
        Users
      </BreadcrumbsItem>
      <Switch>
        <Route exact path="/users" component={UsersList} />
        <Route exact path="/users/:id" component={UserDetails} />
        <Route path="/users/:id/update" component={UpdateUser} />
      </Switch>
    </Fragment>
  );
};

const Main = () => {
  return (
    <main>
      <BreadcrumbsItem
        className="breadcrumbs__item"
        to="/"
      >
        Home
      </BreadcrumbsItem>
      <Switch>
        <Route exact path="/" component={AdvertList} />
        <Route path="/advert/:id" component={Advert} />
        <Route path="/users" component={Users} />
        <Route path="/create-advert" component={CreateAdvert} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </Switch>
    </main>
  );
};

const App = () => {
  const location = window.location.pathname;
  const search = (location === '/') ? <Search /> : null;
  return (
    <Fragment>
      <AppHeader />
      <div className="breadcrumbs">
        <Breadcrumbs
          separator={<i className="breadcrumbs__separator">/</i>}
          item={NavLink}
          finalItem="span"
          finalProps={{
            style: { color: 'var(--accentColor)', cursor: 'default' }
          }}
        />
      </div>
      {search}
      <Main />
      <footer />
    </Fragment>
  );
};

export default App;
