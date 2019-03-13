export const createAdvert = (advert) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('adverts').add({
      ...advert,
      views: 100500,
      category: 'test-category',
      username: 'Aliaksei'
    }).then(() => {
      dispatch({ type: 'CREATE_ADVERT', advert });
    }).catch((err) => {
      dispatch({ type: 'CREATE_ADVERT_ERROR', err });
    });
  };
};
