import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGObptqRPGdaSvbtoksGIt4ppKtAfFb8s",
  authDomain: "notehut-14bd0.firebaseapp.com",
  projectId: "notehut-14bd0",
  storageBucket: "notehut-14bd0.appspot.com",
  messagingSenderId: "56061727737",
  appId: "1:56061727737:web:53acf575ab6f7a5036e328",
  measurementId: "G-Y3B6RD5SRC",
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
export default db
