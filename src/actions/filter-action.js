export const searchAdverts = (value) => dispatch => {
  dispatch({ type: 'SEARCH', payload: value });
};
