import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyACa-mY-jAWa9FDu3LLSrgPRYc13-ikoK4",
    authDomain: "panel-612a7.firebaseapp.com",
    projectId: "panel-612a7",
    storageBucket: "panel-612a7.appspot.com",
    messagingSenderId: "1072945783791",
    appId: "1:1072945783791:web:4c15dc5dbe48db1e21cc1a",
    measurementId: "G-2XDL1B979H"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;