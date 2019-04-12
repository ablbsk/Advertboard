import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from '../constants/action-types';

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log('Login success');
      return state;
    case LOGIN_ERROR:
      console.log('Login failed', action.err);
      return state;

    case SIGNOUT_SUCCESS:
      console.log('Sign out success');
      return state;

    case SIGNUP_SUCCESS:
      console.log('Sign up success');
      return state;
    case SIGNUP_ERROR:
      console.log('Sign up error', action.err);
      return state;

    default:
      return state;
  }
};

export default authReducer;
