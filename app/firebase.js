// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC80E_4QlRHpfSTy4BWB8nctqkPxocGw9Q",
  authDomain: "d-webapp-c2847.firebaseapp.com",
  projectId: "d-webapp-c2847",
  storageBucket: "d-webapp-c2847.appspot.com",
  messagingSenderId: "60348679369",
  appId: "1:60348679369:web:9ca340a8bc66b40ae83918"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };