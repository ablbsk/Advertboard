const initState = {
  signInError: null,
  signUpError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        signInError: null,
        signUpError: null
      };
    case 'LOGIN_ERROR':
      console.log('login failed');
      return {
        ...state,
        signInError: action.err.message,
        signUpError: null
      };

    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return state;

    case 'SIGNUP_SUCCESS':
      console.log('signup success');
      return {
        ...state,
        signInError: null,
        signUpError: null
      };
    case 'SIGNUP_ERROR':
      console.log('signup error');
      return {
        ...state,
        signInError: null,
        signUpError: action.err.message
      };

    default:
      return state;
  }
};

export default authReducer;
