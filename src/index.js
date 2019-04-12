import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/firebase-config';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';
import ReduxToastr from 'react-redux-toastr';

import App from './components/app';
import rootReducer from './reducers/root-reducer';

import './style.css';
import './media-queries.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, { useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true }),
  ));

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <BreadcrumbsProvider>
        <BrowserRouter>
          <>
            <ReduxToastr
              timeOut={4000}
              position="bottom-right"
              transitionIn="fadeIn"
              transitionOut="fadeOut"
              closeOnToastrClick
            />
            <App />
          </>
        </BrowserRouter>
      </BreadcrumbsProvider>
    </Provider>,
    document.getElementById('root'),
  );
});
