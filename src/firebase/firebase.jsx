// Import the functions you need from the SDKs you need
// import firebase from "firebase/app";
import { getDatabase, ref, set, child, remove, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5KbMlWhSapJ1pN_yPkmGZ_uIhvDdcchk",
  authDomain: "movie-ratingapp.firebaseapp.com",
  databaseURL: "https://movie-ratingapp-default-rtdb.firebaseio.com",
  projectId: "movie-ratingapp",
  storageBucket: "movie-ratingapp.appspot.com",
  messagingSenderId: "433125654950",
  appId: "1:433125654950:web:b1705518fc77ddf37dcf67",
  measurementId: "G-X4YSM1ED4Y"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// export const movieRef = ref(db, 'movies');

export {db, ref, set, child, remove, onValue};
// Initialize Firebase
// const app = initializeApp(firebaseConfig);