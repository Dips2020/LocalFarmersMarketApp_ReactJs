//? Test-2 - Firebase Database
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  update,
  onValue,
  get,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth"; // adding google authentication
//* for uploading image from UserProduct.jsx
import { getStorage } from "firebase/storage"; // to store img

const firebaseConfig = {
  apiKey: "AIzaSyCLsulx62VyARmsJ-DvrRfCLLw0z855nTc",
  authDomain: "test-2-69499.firebaseapp.com",
  databaseURL:
    "https://test-2-69499-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-2-69499",
  storageBucket: "test-2-69499.appspot.com",
  messagingSenderId: "709094388277",
  appId: "1:709094388277:web:998177e01d01ffdb8db77c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

//* for uploading image from UserProduct.jsx
const imgDB = getStorage(app);

export { database, ref, set, update, onValue, auth, get, imgDB, remove };
