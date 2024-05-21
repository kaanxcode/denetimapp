import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC1qrhmUaClar79v5o3p4rKfyEStN0NHpg",
  authDomain: "dnx-igs.firebaseapp.com",
  projectId: "dnx-igs",
  storageBucket: "dnx-igs.appspot.com",
  messagingSenderId: "742240978332",
  appId: "1:742240978332:web:8eeab1515bd5eafb203459",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { db, auth };
