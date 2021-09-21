import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBQpO12durEOknKwWIrNQoNEG1sJJRoc3s",
    authDomain: "quora-for-ev-6fbd8.firebaseapp.com",
    projectId: "quora-for-ev-6fbd8",
    storageBucket: "quora-for-ev-6fbd8.appspot.com",
    messagingSenderId: "391561599213",
    appId: "1:391561599213:web:532abf62f90fd896d9d4e4"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const db = firebaseApp.firestore();

export {auth,provider};
export default db;