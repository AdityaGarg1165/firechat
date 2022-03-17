import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import {collection,addDoc, setDoc,doc, getFirestore} from 'firebase/firestore'
import {app} from './firebase/firebase'
import cookie from 'js-cookie'
import { getAuth, signOut } from 'firebase/auth'
import Router from 'next/router'
function Write() {
  const auth = getAuth(app)
  useEffect(()=>{
    if (cookie.get("name") === undefined){
      Router.push("/auth")
    }
  },[])
  
  const db = getFirestore(app)
  const [inpval,setval] = useState(null)
  const docref = collection(db,"coll1")
  const add = () => {
    const docsd = addDoc(docref,{
      message:inpval,
      name:cookie.get("name")
    })
}
  return (
    <div>
        <input type="text" onChange={(e)=>{setval(e.target.value)}} placeholder='Write your message!' className={styles.inp} />
        <button onClick={add} className={styles.sbmt}>Submit</button>
    </div>
  )
}

export default Write