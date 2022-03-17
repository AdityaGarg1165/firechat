import React from 'react'
import styles from '../styles/Home.module.css'
import cookie from 'js-cookie'
import { useState } from 'react'
import { useEffect } from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useRouter} from 'next/router'
import {app} from './firebase/firebase'
import { getAuth, signOut } from 'firebase/auth'
function Navbar() {
  const auth = getAuth(app)
  const [photoURL,seturl] = useState(null)
  const authstate = useAuthState(auth)
  const router = useRouter()
  const name = cookie.get("name")
  let [state,setState] = useState(null)
  useEffect(()=>{
    try{
      seturl(authstate[0].photoURL)
    }
    catch{
  
    }
  })
  
  const route = () => {
  if(name === undefined){
    
    router.push("/auth")
  }
  else{
    cookie.remove("name")
    signOut(auth)
    
    
    
  }}
  const routetowr = () => {router.push("/write")}
  const routehm = () => {router.push("/")}
  useEffect(()=>{
    if(name === undefined){
      setState("Sign in")
    }
    else{
      setState("Sign out")
    }
    
  })
  
  return (
    <div>
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <button className={styles.li} id={styles.home} onClick={routehm}>FIRECHAT</button>
                <button className={styles.li} id={styles.mb} onClick={routetowr}>Write a message</button>
                <button className={styles.li} id={styles.soi} onClick={route}>{state}</button>
                <img className={styles.photo} src={photoURL} alt="" />
            </ul>
        </nav>
    </div>
  )
}

export default Navbar