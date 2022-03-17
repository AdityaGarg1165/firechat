import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCajBTkZKcPrbXzmla4Nip3rSEV2kuWBc8",
  authDomain: "chat-f7396.firebaseapp.com",
  projectId: "chat-f7396",
  storageBucket: "chat-f7396.appspot.com",
  messagingSenderId: "151570516700",
  appId: "1:151570516700:web:1a8b8c793d87ad9f918219",
  measurementId: "G-4NWD194SX0"
};

import React from 'react'

function Firebase() {
  return (
    <div>CANNOT GET /Firebase</div>
  )
}

export default Firebase

export const app = initializeApp(firebaseConfig);;