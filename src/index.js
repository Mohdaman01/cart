import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjiHUGcz5ZCzBYrnY4ph1FW3D_K7tFjRo",
  authDomain: "my-cart-d9f89.firebaseapp.com",
  projectId: "my-cart-d9f89",
  storageBucket: "my-cart-d9f89.appspot.com",
  messagingSenderId: "573585794644",
  appId: "1:573585794644:web:a0f5865a8468756285afc1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


