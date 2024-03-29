import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update, onValue, get } from "firebase/database";
import { getAuth } from "firebase/auth"; // adding google authentication

const firebaseConfig = {
  apiKey: "AIzaSyB3BGS6xGLaVF9UVxSelStdS26SQ-NUoF0",
  authDomain: "agronomy-emporium-af14b.firebaseapp.com",
  databaseURL:
    "https://agronomy-emporium-af14b-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "agronomy-emporium-af14b",
  storageBucket: "agronomy-emporium-af14b.appspot.com",
  messagingSenderId: "415141290388",
  appId: "1:415141290388:web:41f38209dc3b46b7e82f81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, ref, set, update, onValue, auth, get };
