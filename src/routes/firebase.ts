import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFYClslT_9-N2nKQQwJyC-FvD6HSDMrHw",
  authDomain: "ywitter-reloaded-70965.firebaseapp.com",
  projectId: "ywitter-reloaded-70965",
  storageBucket: "ywitter-reloaded-70965.appspot.com",
  messagingSenderId: "1024337563360",
  appId: "1:1024337563360:web:737e4eb507da894d8f4a85"
};
// 권한 부여
const app = initializeApp(firebaseConfig);
// 인증 권한
export const auth = getAuth(app);
// 스토리지 권한
export const stroage = getStorage(app);
// db권한
export const db = getFirestore(app);