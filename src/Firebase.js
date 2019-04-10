import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDo6KVvleXjLs2VQxL1AYvXtu__LEoa-dU",
  authDomain: "dev-site-2019.firebaseapp.com",
  databaseURL: "https://dev-site-2019.firebaseio.com",
  projectId: "dev-site-2019",
  storageBucket: "dev-site-2019.appspot.com",
  messagingSenderId: "280106823298",
};
firebase.initializeApp(config);

export default firebase;

