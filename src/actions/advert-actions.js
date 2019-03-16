export const createAdvert = (advert) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('adverts').add({
      ...advert,
      views: 0,
      username: 'Owner',
      created: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_ADVERT', advert });
    }).catch((err) => {
      dispatch({ type: 'CREATE_ADVERT_ERROR', err });
    });
  };
};

export const removeAdvert = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('adverts').doc(id).delete().then(() => {
      dispatch({ type: 'REMOVE_ADVERT', id });
    }).catch((err) => {
      dispatch({ type: 'REMOVE_ADVERT_ERROR', err });
    });
  };
};

export const updateAdvert = (advert, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('adverts').doc(id).update({
      ...advert,
      modified: new Date()
    }).then(() => {
      dispatch({ type: 'UPDATE_ADVERT', id });
    }).catch((err) => {
      dispatch({ type: 'UPDATE_ADVERT_ERROR', err });
    });
  };
};

export const viewsAdvert = (advert, id, views) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('adverts').doc(id).update({
      ...advert,
      views
    }).then(() => {
      dispatch({ type: 'UPDATE_VIEWS_ADVERT', id });
    });
  };
};
