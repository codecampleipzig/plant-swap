import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpwGw6WIskMmM3swpkl9PqYa9GZLtH7gI",
  authDomain: "plant-swap-5615e.firebaseapp.com",
  databaseURL: "https://plant-swap-5615e.firebaseio.com",
  projectId: "plant-swap-5615e",
  storageBucket: "plant-swap-5615e.appspot.com",
  messagingSenderId: "85126010868",
  appId: "1:85126010868:web:efe9813f8125ba4c274ba1"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
