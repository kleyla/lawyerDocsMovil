import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore'
import 'firebase/database'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBZItrlRNfMmKIpV5Raf_rR4-ltN14tBQw',
  authDomain: 'lawyerdocs-764c9.firebaseapp.com',
  databaseURL: 'https://lawyerdocs-764c9.firebaseio.com',
  projectId: 'lawyerdocs-764c9',
  storageBucket: 'lawyerdocs-764c9.appspot.com',
  messagingSenderId: '948986959877',
  appId: '1:948986959877:web:88310c47b3db88022e646c',
  measurementId: 'G-G7Y1MDLYVY',
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
if (!firebase.apps.length) {
  let Firebase = firebase.initializeApp(firebaseConfig);
}

//  firebase.initializeApp(firebaseConfig);

export default firebase;
