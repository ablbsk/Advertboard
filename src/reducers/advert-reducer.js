const initState = {};

const advertReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_ADVERT':
      console.log('create advert', action.advert);
      return state;
    case 'CREATE_ADVERT_ERROR':
      console.log('ошибился =(', action.err);
      return state;

    case 'REMOVE_ADVERT':
      console.log('Удачно удалил', action.advert);
      return state;
    case 'REMOVE_ADVERT_ERROR':
      console.log('Ошибка удаления', action.err);
      return state;

    case 'UPDATE_ADVERT':
      console.log('Удачно изменил', action.advert);
      return state;
    case 'UPDATE_ADVERT_ERROR':
      console.log('Ошибка обновления', action.err);
      return state;

    case 'UPDATE_VIEWS_ADVERT':
      console.log('+ просмотр', action.advert);
      return state;

    default:
      return state;
  }
};

export default advertReducer;
