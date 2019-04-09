import {
  UPDATE_USER,
  UPDATE_USER_ERROR,
  DELETE_USER,
  DELETE_USER_ERROR,
  DELETE_USER_DB,
  DELETE_USER_DB_ERROR,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PASSWORD_ERROR,
  UPDATE_USER_EMAIL,
  UPDATE_USER_EMAIL_ERROR,

  UPDATE_ADVERT_EMAIL,
  UPDATE_ADVERT_EMAIL_ERROR,
} from '../constants/action-types';

export const updateUser = (user, id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('users').doc(id).update({
      ...user,
    })
      .then(() => {
        dispatch({ type: UPDATE_USER });
      })
      .catch((err) => {
        dispatch({ type: UPDATE_USER_ERROR, err });
      });
  };
};

const reauthenticate = (currentPassword, firebase) => {
  const user = firebase.auth().currentUser;
  const cred = firebase.auth.EmailAuthProvider
    .credential(user.email, currentPassword);
  return user.reauthenticateWithCredential(cred);
};

export const deleteUser = (currentPassword, uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    reauthenticate(currentPassword, firebase).then(() => {
      firebase.auth().currentUser.delete()
        .then(() => {
          firestore.collection('users').doc(uid).delete()
            .then(() => {
              dispatch({ type: DELETE_USER_DB });
            })
            .catch((err) => {
              dispatch({ type: DELETE_USER_DB_ERROR, err });
            });
          dispatch({ type: DELETE_USER });
        });
    })
      .catch((err) => {
        dispatch({ type: DELETE_USER_ERROR, err });
      });
  };
};

export const changePassword = (currentPassword, newPassword) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    reauthenticate(currentPassword, firebase)
      .then(() => {
        user.updatePassword(newPassword)
          .then(() => {
            dispatch({ type: UPDATE_USER_PASSWORD });
          })
          .catch((err) => {
            dispatch({ type: UPDATE_USER_PASSWORD_ERROR, err });
          });
      })
      .catch((err) => {
        dispatch({ type: UPDATE_USER_PASSWORD_ERROR, err });
      });
  };
};

export const changeEmail = (currentPassword, newEmail, advertsList) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    reauthenticate(currentPassword, firebase)
      .then(() => {
        user.updateEmail(newEmail)
          .then(() => {
            firestore.collection('users').doc(user.uid).update({
              email: newEmail,
            });
            dispatch({ type: UPDATE_USER_EMAIL });
          })
          .then(() => {
            for (let i = 0; i < advertsList.length; i++) {
              const id = advertsList[i];
              firestore.collection('adverts').doc(id).update({
                email: newEmail,
              })
                .then(() => {
                  dispatch({ type: UPDATE_ADVERT_EMAIL });
                })
                .catch((err) => {
                  dispatch({ type: UPDATE_ADVERT_EMAIL_ERROR, err });
                });
            }
          })
          .catch((err) => {
            dispatch({ type: UPDATE_USER_EMAIL_ERROR, err });
          });
      })
      .catch((err) => {
        dispatch({ type: UPDATE_USER_EMAIL_ERROR, err });
      });
  };
};
