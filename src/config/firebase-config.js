import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAi3I2xj1XBXMSUp-wj8BDobGL6CS3YnV8',
  authDomain: 'callboard-a12345.firebaseapp.com',
  databaseURL: 'https://callboard-a12345.firebaseio.com',
  projectId: 'callboard-a12345',
  storageBucket: 'callboard-a12345.appspot.com',
  messagingSenderId: '479822630994',
};

firebase.initializeApp(config);

export default firebase;
