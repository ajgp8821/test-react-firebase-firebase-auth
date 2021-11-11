import firebase from "firebase";
import "firebase/auth";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyD089CrCdPF_V3Sn6OOujN8IJgAoB5iRrg",
  authDomain: "react-firebase-test-8ceb8.firebaseapp.com",
  projectId: "react-firebase-test-8ceb8",
  storageBucket: "react-firebase-test-8ceb8.appspot.com",
  messagingSenderId: "1019789572477",
  appId: "1:1019789572477:web:7031a3a157fc78ed953414",
  measurementId: "G-LN7FH0MX50",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const database = fire.firestore();

const auth = fire.auth();

export { auth, database };
