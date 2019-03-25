export const createAdvert = (advert) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const { profile } = getState().firebase;
    const authorId = getState().firebase.auth.uid;
    const { email } = getState().firebase.auth;
    firestore.collection('adverts').add({
      ...advert,
      authorId,
      email,
      phone: profile.phone,
      username: profile.username,
      views: 0,
      created: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_ADVERT', advert });
    }).catch((err) => {
      dispatch({ type: 'CREATE_ADVERT_ERROR', err });
    });

     firestore.collection('adverts').orderBy('created', 'desc').limit(1).get()
       .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          firestore.collection('users').doc(`${authorId}`).update({
            advertsId: firestore.FieldValue.arrayUnion(doc.id)
          });
        });
      });
  };
};

export const removeAdvert = (id) => {
  return (dispatch, getState, { getFirestore }) => {
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
