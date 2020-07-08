import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvRjUQ2kgNz5WWOWazoNfMZTz7PTBOnqk",
  authDomain: "colby-16cd8.firebaseapp.com",
  databaseURL: "https://colby-16cd8.firebaseio.com",
  projectId: "colby-16cd8",
  storageBucket: "colby-16cd8.appspot.com",
  messagingSenderId: "488428379933",
  appId: "1:488428379933:web:03b88d58bde6737c8f0bf4",
  measurementId: "G-C9Q81SJ8VG"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
