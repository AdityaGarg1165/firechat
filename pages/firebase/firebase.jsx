import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAjcSURYnbrbFMUUEXf2-NcfWjlb2phUno",
  authDomain: "adityafirechat.firebaseapp.com",
  projectId: "adityafirechat",
  storageBucket: "adityafirechat.appspot.com",
  messagingSenderId: "87674050829",
  appId: "1:87674050829:web:283f375259ed92f17ab844",
  measurementId: "G-S4C6RX61WY"
};


function Firebase() {
  return (
    <div>CANNOT GET /Firebase</div>
  )
}

export default Firebase

export const app = initializeApp(firebaseConfig);;