import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCCG-a65qHZhBW5jXm6DRbBQ1DGoIM_2fU",
    authDomain: "story-hub-3f77b.firebaseapp.com",
    projectId: "story-hub-3f77b",
    storageBucket: "story-hub-3f77b.appspot.com",
    messagingSenderId: "300028069021",
    appId: "1:300028069021:web:15f41cf77c9c637add4074"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  export default firebase.firestore()