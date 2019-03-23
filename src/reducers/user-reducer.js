const initState = {};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      console.log('update user successfully', action.advert);
      return state;
    case 'UPDATE_USER_ERROR':
      console.log('update user error', action.err);
      return state;

    case 'UPDATE_USER_PASSWORD':
      console.log('update user password successfully', action.advert);
      return state;
    case 'UPDATE_USER_PASSWORD_ERROR':
      console.log('update user password error', action.err);
      return state;

    case 'UPDATE_USER_EMAIL':
      console.log('update user email successfully', action.advert);
      return state;
    case 'UPDATE_USER_EMAIL_ERROR':
      console.log('update user email error', action.err);
      return state;

    case 'DELETE_USER':
      console.log('delete user successfully', action.advert);
      return state;
    case 'DELETE_USER_ERROR':
      console.log('delete user error', action.err);
      return state;

    case 'DELETE_USER_DB':
      console.log('delete user(db) successfully', action.advert);
      return state;
    case 'DELETE_USER_DB_ERROR':
      console.log('delete user(db) error', action.err);
      return state;

    default:
      return state;
  }
};

export default userReducer;
