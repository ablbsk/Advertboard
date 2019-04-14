import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCYA5cFTIG3-RN-1Bp6rI7XURlZh_rdSOs',
  authDomain: 'advertboard-test.firebaseapp.com',
  databaseURL: 'https://advertboard-test.firebaseio.com',
  projectId: 'advertboard-test',
  storageBucket: 'advertboard-test.appspot.com',
  messagingSenderId: '108551502202',
};

firebase.initializeApp(config);

export default firebase;
