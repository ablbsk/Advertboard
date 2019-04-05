export const updateUser = (user, id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('users').doc(id).update({
      ...user,
    })
      .then(() => {
        dispatch({ type: 'UPDATE_USER', id });
      })
      .catch((err) => {
        dispatch({ type: 'UPDATE_USER_ERROR', err });
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
          dispatch({ type: 'DELETE_USER' });
        })
        .catch((err) => {
          dispatch({ type: 'DELETE_USER_ERROR', err });
        });
    });
    firestore.collection('users').doc(uid).delete()
      .then(() => {
        dispatch({ type: 'DELETE_USER_DB' });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_USER_DB_ERROR', err });
      });
  };
};

export const changePassword = (currentPassword, newPassword) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    reauthenticate(currentPassword, firebase).then(() => {
      user.updatePassword(newPassword)
        .then(() => {
          dispatch({ type: 'UPDATE_USER_PASSWORD' });
        })
        .catch((err) => {
          dispatch({ type: 'UPDATE_USER_PASSWORD_ERROR', err });
        });
    });
  };
};

export const changeEmail = (currentPassword, newEmail) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    reauthenticate(currentPassword, firebase).then(() => {
      user.updateEmail(newEmail)
        .then(() => {
          dispatch({ type: 'UPDATE_USER_EMAIL' });
        })
        .catch((err) => {
          dispatch({ type: 'UPDATE_USER_EMAIL_ERROR', err });
        });
    });
  };
};
