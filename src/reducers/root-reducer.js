import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import advertReducer from './advert-reducer';
import authReducer from './auth-reducer';

const rootReducer = combineReducers({
  advert: advertReducer,
  auth: authReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
