const initState = {};

const advertReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_ADVERT':
      console.log('create advert', action.advert);
      return state;
    case 'CREATE_ADVERT_ERROR':
      console.log('ошибился =(', action.err);
      return state;
    default:
      return state;
  }
};

export default advertReducer;
