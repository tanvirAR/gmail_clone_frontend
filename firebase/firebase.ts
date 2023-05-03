import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAl0TZQlE_tYbL2gyXwVVC1sV95GuQ7_QA",
  authDomain: "test-5de46.firebaseapp.com",
  databaseURL:
    "https://test-5de46-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-5de46",
  storageBucket: "test-5de46.appspot.com",
  messagingSenderId: "809252758365",
  appId: "1:809252758365:web:b163ca1def59e6a027beb4",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export default app;
