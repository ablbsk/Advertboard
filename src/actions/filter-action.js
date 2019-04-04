export const searchAdverts = value => (dispatch) => {
  dispatch({ type: 'SEARCH', search: value });
};
