import {
  CREATE_ADVERT,
  CREATE_ADVERT_ERROR,
  REMOVE_ADVERT,
  REMOVE_ADVERT_ERROR,
  UPDATE_ADVERT,
  UPDATE_ADVERT_ERROR,
  UPDATE_VIEWS_ADVERT,
} from '../constants/action-types';

export const createAdvert = advert => (dispatch, getState, { getFirestore }) => {
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
    created: new Date(),
  }).then(() => {
    dispatch({ type: CREATE_ADVERT, advert });
  }).catch((err) => {
    dispatch({ type: CREATE_ADVERT_ERROR, err });
  });

  firestore.collection('adverts').orderBy('created', 'desc').limit(1).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        firestore.collection('users').doc(`${authorId}`).update({
          advertsList: firestore.FieldValue.arrayUnion(doc.id),
        });
      });
    });
};

export const removeAdvert = id => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authorId = getState().firebase.auth.uid;
  const usersRef = firestore.collection('users').doc(`${authorId}`);

  firestore.collection('adverts').doc(id).delete()
    .then(() => {
      dispatch({ type: REMOVE_ADVERT });
    })
    .catch((err) => {
      dispatch({ type: REMOVE_ADVERT_ERROR, err });
    });

  usersRef.update({
    advertsList: firestore.FieldValue.arrayRemove(id),
  });

  usersRef.get().then((doc) => {
    const data = doc.data();
    const { advertsList } = data;

    if (advertsList.length === 0) {
      firestore.collection('users')
        .doc(`${authorId}`)
        .update({
          advertsList: firestore.FieldValue.delete(),
        });
    }
  });
};

export const updateAdvert = (advert, id) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection('adverts').doc(id).update({
    ...advert,
    modified: new Date(),
  }).then(() => {
    dispatch({ type: UPDATE_ADVERT, advert });
  })
    .catch((err) => {
      dispatch({ type: UPDATE_ADVERT_ERROR, err });
    });
};

export const viewsAdvert = (advert, id, views) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection('adverts').doc(id).update({
    ...advert,
    views,
  }).then(() => {
    dispatch({ type: UPDATE_VIEWS_ADVERT });
  });
};
