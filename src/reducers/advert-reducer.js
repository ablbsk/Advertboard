import {
  CREATE_ADVERT,
  CREATE_ADVERT_ERROR,
  REMOVE_ADVERT,
  REMOVE_ADVERT_ERROR,
  UPDATE_ADVERT,
  UPDATE_ADVERT_ERROR,
  UPDATE_VIEWS_ADVERT,
  UPDATE_ADVERT_USERNAME,
  UPDATE_ADVERT_USERNAME_ERROR,
  UPDATE_ADVERT_PHONE,
  UPDATE_ADVERT_PHONE_ERROR,
  UPDATE_ADVERT_EMAIL,
  UPDATE_ADVERT_EMAIL_ERROR,
} from '../constants/action-types';

const advertReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ADVERT:
      console.log('Create advert');
      return state;
    case CREATE_ADVERT_ERROR:
      console.log('Create advert error', action.err);
      return state;

    case REMOVE_ADVERT:
      console.log('Remove advert');
      return state;
    case REMOVE_ADVERT_ERROR:
      console.log('Remove advert error', action.err);
      return state;

    case UPDATE_ADVERT:
      console.log('Update advert');
      return state;
    case UPDATE_ADVERT_ERROR:
      console.log('Update advert error', action.err);
      return state;

    case UPDATE_ADVERT_USERNAME:
      console.log('Update username in advert');
      return state;
    case UPDATE_ADVERT_USERNAME_ERROR:
      console.log('Update username in advert error', action.err);
      return state;

    case UPDATE_ADVERT_PHONE:
      console.log('Update phone in advert');
      return state;
    case UPDATE_ADVERT_PHONE_ERROR:
      console.log('Update phone in advert error', action.err);
      return state;

    case UPDATE_ADVERT_EMAIL:
      console.log('Update email in advert');
      return state;
    case UPDATE_ADVERT_EMAIL_ERROR:
      console.log('Update email in advert error');
      return state;

    case UPDATE_VIEWS_ADVERT:
      return state;

    default:
      return state;
  }
};

export default advertReducer;
