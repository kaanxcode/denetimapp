import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBD_K2dzRUi6ik4FYfQ0tHFJCcF5X2lnKY",
  authDomain: "denetim-app.firebaseapp.com",
  projectId: "denetim-app",
  storageBucket: "denetim-app.appspot.com",
  messagingSenderId: "167545998012",
  appId: "1:167545998012:web:bf9e8a29408334b6bc1eb9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { db, auth };
