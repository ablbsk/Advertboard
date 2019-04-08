import { SEARCH } from '../constants/action-types';

export const searchAdverts = value => (dispatch) => {
  dispatch({ type: SEARCH, search: value });
};
