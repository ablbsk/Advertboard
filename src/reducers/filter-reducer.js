import { SEARCH } from '../constants/action-types';

const initState = {
  search: '',
};

const filterReducer = (state = initState, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        search: action.search,
      };

    default:
      return state;
  }
};

export default filterReducer;
