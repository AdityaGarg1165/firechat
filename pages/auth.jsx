import React, { useEffect } from 'react'
import {FcGoogle} from 'react-icons/fc'
import styles from '../styles/Home.module.css'
import {getAuth, GoogleAuthProvider,signInAnonymously, signInWithCredential, signInWithPopup} from 'firebase/auth'
import {useAuthState} from 'react-firebase-hooks/auth'
import cookie from 'js-cookie'
import {app} from './firebase/firebase'
import Router from 'next/router'
import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore'

function Auth() {
  const auth = getAuth(app)
  const authstate = useAuthState(auth)
  const db = getFirestore(app)
  const googlesin = () => {
    const signin = signInWithPopup(auth,new GoogleAuthProvider()).then((result)=>{
      const credential = signInWithCredential(auth,GoogleAuthProvider.credentialFromResult(result))
      const coll = doc(db,`users/${result.user.displayName}`)
      const url = result.user.photoURL
      const a = setDoc(coll,{
        name:result.user.displayName,
        photo:url,
      })
      cookie.set('name',result.user.displayName)
      Router.push("/")
      
    })
  }
  return (
    <div>
        <div className={styles.goog}>
            <FcGoogle className={styles.gl} size={40}/>
            <button onClick={googlesin} className={styles.gb}>Sign in with google</button>
        </div>
    </div>
  )
}

export default Auth
