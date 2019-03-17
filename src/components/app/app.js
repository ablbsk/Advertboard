import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppHeader from '../app-header';
import AdvertBoard from '../advert-board';
import AdvertDetails from '../advert-details';
import CreateAdvert from '../create-advert';
import UpdateAdvert from '../update-advert';
import SignIn from '../sign-in';
import SignUp from '../sign-up';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <AppHeader />
          <main>
            <Switch>
              <Route exact path="/" component={AdvertBoard} />
              <Route exact path="/advert/:id" component={AdvertDetails} />
              <Route path="/create-advert" component={CreateAdvert} />
              <Route path="/advert/:id/update-advert" component={UpdateAdvert} />
              <Route path="/sign-in" component={SignIn} />
              <Route path="/sign-up" component={SignUp} />
            </Switch>
          </main>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
