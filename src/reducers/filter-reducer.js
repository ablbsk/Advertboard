const initState = {
  search: ''
};

const filterReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SEARCH':
      console.log('search');
      return {
        ...state,
        search: action.payload
      };

    default:
      return state;
  }
};

export default filterReducer;
