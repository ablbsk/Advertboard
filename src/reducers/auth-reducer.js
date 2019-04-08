import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from '../constants/action-types';

const initState = {
  signInError: null,
  signUpError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log('Login success');
      return state;
    case LOGIN_ERROR:
      console.log('Login failed', action.err);
      return {
        ...state,
        signInError: action.err.message,
        signUpError: null,
      };

    case SIGNOUT_SUCCESS:
      console.log('Signout success');
      return state;

    case SIGNUP_SUCCESS:
      console.log('Signup success');
      return state;
    case SIGNUP_ERROR:
      console.log('Signup error', action.err);
      return {
        ...state,
        signInError: null,
        signUpError: action.err.message,
      };

    default:
      return state;
  }
};

export default authReducer;
