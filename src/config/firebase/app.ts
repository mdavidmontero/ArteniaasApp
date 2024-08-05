import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBv-4le2l0SAYj_FDCiUFjqdNE7pXW_c7w",
  authDomain: "artesaniasapp-8965e.firebaseapp.com",
  projectId: "artesaniasapp-8965e",
  storageBucket: "artesaniasapp-8965e.appspot.com",
  messagingSenderId: "130487597914",
  appId: "1:130487597914:web:c7897a8e7a9792c6b4d163",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };
