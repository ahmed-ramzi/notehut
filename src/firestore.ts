import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const env = import.meta.env
const firebaseConfig = {
  apiKey: env.VITE_API_KEY,
  authDomain: env.VITE_AUTH_DOMAIN,
  databaseURL: env.VITE_DATABASE_URL,
  projectId: env.VITE_PROJECTID,
  storageBucket: env.VITE_STORAGEBUCKET,
  messagingSenderId: env.VITE_MESSAGINGSENDERID,
  appId: env.VITE_APPID,
  measurementId: env.VITE_MEASUREMENTID,
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
export default db
