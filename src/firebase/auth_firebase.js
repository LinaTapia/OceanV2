import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAfWfkqFWI7D-RupBkW_TRQGJ4OU_ZMFuM",
  authDomain: "oceanplugs-6a5dd.firebaseapp.com",
  databaseURL: "https://oceanplugs-6a5dd-default-rtdb.firebaseio.com",
  projectId: "oceanplugs-6a5dd",
  storageBucket: "oceanplugs-6a5dd.appspot.com",
  messagingSenderId: "456402951174",
  appId: "1:456402951174:web:da755d65788dc8f130f787"
};

export const app = initializeApp(firebaseConfig);
export const auth_firebase = getAuth()