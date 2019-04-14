import { toastr } from 'react-redux-toastr';
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

export const updateUser = user => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const { uid } = firebase.auth().currentUser;
  firestore.collection('users').doc(uid).update({
    ...user,
  })
    .then(() => {
      dispatch({ type: UPDATE_USER });
      toastr.success('Success', 'Profile has been updated');
    })
    .catch((err) => {
      dispatch({ type: UPDATE_USER_ERROR, err });
      toastr.error('Error', 'Something went wrong');
    });
};

const reauthenticate = (currentPassword, firebase) => {
  const user = firebase.auth().currentUser;
  const cred = firebase.auth.EmailAuthProvider
    .credential(user.email, currentPassword);
  return user.reauthenticateWithCredential(cred);
};

export const deleteUser = currentPassword => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  reauthenticate(currentPassword, firebase).then(() => {
    user.delete()
      .then(() => {
        dispatch({ type: DELETE_USER });
        toastr.success('Success', 'User has been deleted');
      });
    firestore.collection('users').doc(user.uid).delete()
      .then(() => {
        dispatch({ type: DELETE_USER_DB });
      })
      .catch((err) => {
        dispatch({ type: DELETE_USER_DB_ERROR, err });
      });
  })
    .catch((err) => {
      dispatch({ type: DELETE_USER_ERROR, err });
      toastr.error('Error', err.message);
    });
};

export const changePassword = (currentPassword, newPassword) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  reauthenticate(currentPassword, firebase)
    .then(() => {
      user.updatePassword(newPassword)
        .then(() => {
          dispatch({ type: UPDATE_USER_PASSWORD });
          toastr.success('Success', 'Password has been updated');
        })
        .catch((err) => {
          dispatch({ type: UPDATE_USER_PASSWORD_ERROR, err });
        });
    })
    .catch((err) => {
      dispatch({ type: UPDATE_USER_PASSWORD_ERROR, err });
      toastr.error('Error', err.message);
    });
};

export const changeEmail = (currentPassword, newEmail, advertsList) => (dispatch, getState, { getFirestore, getFirebase }) => {
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
          toastr.success('Success', 'Email has been updated');
        })
        .then(() => {
          if (typeof(advertsList) !== 'undefined') {
            for (let i = 0; i < advertsList.length; i++) {
              const id = advertsList[i];
              firestore.collection('adverts').doc(id).update({
                email: newEmail,
              })
                .then(() => {
                  dispatch({type: UPDATE_ADVERT_EMAIL});
                })
                .catch((err) => {
                  dispatch({type: UPDATE_ADVERT_EMAIL_ERROR, err});
                });
            }
          }
        })
        .catch((err) => {
          dispatch({ type: UPDATE_USER_EMAIL_ERROR, err });
          toastr.error('Error', err.message);
        });
    })
    .catch((err) => {
      dispatch({ type: UPDATE_USER_EMAIL_ERROR, err });
      toastr.error('Error', err.message);
    });
};
