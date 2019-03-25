import React, { Component, Fragment } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import AppHeader from '../app-header';
import CreateAdvert from '../create-advert';
import SignIn from '../sign-in';
import SignUp from '../sign-up';

import AdvertBoard from '../advert-board';
import AdvertDetails from '../advert-details';
import UpdateAdvert from '../update-advert';

import UsersList from '../users-list';
import UserDetails from '../user-details';
import UpdateUser from '../update-user';

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
    <div>
      <BreadcrumbsItem to="/users">Users</BreadcrumbsItem>
      <Switch>
        <Route exact path="/users" component={UsersList} />
        <Route exact path="/users/:id" component={UserDetails} />
        <Route path="/users/:id/update" component={UpdateUser} />
      </Switch>
    </div>
  );
};

const Main = () => {
  return (
    <main>
      <BreadcrumbsItem to="/">Home</BreadcrumbsItem>
      <Switch>
        <Route exact path="/" component={AdvertBoard} />
        <Route path="/advert/:id" component={Advert} />
        <Route path="/users" component={Users} />
        <Route path="/create-advert" component={CreateAdvert} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </Switch>
    </main>
  );
};

class App extends Component {
  render() {
    return (
        <Fragment>
          <AppHeader />
          <Breadcrumbs
            separator={<i> / </i>}
            item={ NavLink }
            finalItem={"i"}
            />
          <Main />
        </Fragment>
    );
  }
}

export default App;
