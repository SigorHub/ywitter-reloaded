import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFYClslT_9-N2nKQQwJyC-FvD6HSDMrHw",
  authDomain: "ywitter-reloaded-70965.firebaseapp.com",
  projectId: "ywitter-reloaded-70965",
  storageBucket: "ywitter-reloaded-70965.appspot.com",
  messagingSenderId: "1024337563360",
  appId: "1:1024337563360:web:737e4eb507da894d8f4a85"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);