import {
  CREATE_ADVERT,
  CREATE_ADVERT_ERROR,
  REMOVE_ADVERT,
  REMOVE_ADVERT_ERROR,
  UPDATE_ADVERT,
  UPDATE_ADVERT_ERROR,
  UPDATE_VIEWS_ADVERT,
} from '../constants/action-types';

const advertReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ADVERT:
      console.log('Create advert', action.advert);
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
      console.log('Update advert', action.advert);
      return state;
    case UPDATE_ADVERT_ERROR:
      console.log('Update advert error', action.err);
      return state;

    case UPDATE_VIEWS_ADVERT:
      return state;

    default:
      return state;
  }
};

export default advertReducer;
