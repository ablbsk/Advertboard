import {
  UPDATE_USER,
  UPDATE_USER_ERROR,
  DELETE_USER,
  DELETE_USER_ERROR,
  DELETE_USER_DB,
  DELETE_USER_DB_ERROR,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PASSWORD_ERROR,
  UPDATE_USER_EMAIL,
  UPDATE_USER_EMAIL_ERROR,
} from '../constants/action-types';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      console.log('Update user successfully');
      return state;
    case UPDATE_USER_ERROR:
      console.log('Update user error', action.err);
      return state;

    case UPDATE_USER_PASSWORD:
      console.log('update user\'s password successfully', action.advert);
      return state;
    case UPDATE_USER_PASSWORD_ERROR:
      console.log('update user\'s password error', action.err);
      return state;

    case UPDATE_USER_EMAIL:
      console.log('Update user\'s email successfully');
      return state;
    case UPDATE_USER_EMAIL_ERROR:
      console.log('Update user\'s email error', action.err);
      return state;

    case DELETE_USER:
      console.log('Delete user successfully');
      return state;
    case DELETE_USER_ERROR:
      console.log('Delete user error', action.err);
      return state;

    case DELETE_USER_DB:
      console.log('Delete user(db) successfully');
      return state;
    case DELETE_USER_DB_ERROR:
      console.log('Delete user(db) error', action.err);
      return state;

    default:
      return state;
  }
};

export default userReducer;
