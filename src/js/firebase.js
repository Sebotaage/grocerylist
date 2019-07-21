import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDDE0NYAEEyK251k2pc6WCLI04E2cya95w',
  authDomain: 'grocerylistthing.firebaseapp.com',
  databaseURL: 'https://grocerylistthing.firebaseio.com',
  projectId: 'grocerylistthing',
  storageBucket: 'grocerylistthing.appspot.com',
  messagingSenderId: '223833820143',
  appId: '1:223833820143:web:c7af32b3c1b45500',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
