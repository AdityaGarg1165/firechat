import styles from '../../../styles/Home.module.css'
import {app} from '../../firebase/firebase'
import cookie from 'js-cookie'
import { addDoc, collection,getFirestore,limit,orderBy,query } from 'firebase/firestore'
import { getAuth} from 'firebase/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import Router,{ useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
export default function Chat() {
  const db = getFirestore(app)
  const auth = getAuth(app)
  const authstate = useAuthState(auth)
  let coll;
  const name = cookie.get("name")
  let jcoll;
  let acoll;
  const router = useRouter()
  const {slug} = useRouter().query
  if (router.isReady){
  //@ts-ignore
    coll = collection(db,slug)
    jcoll = collection(db,slug + "-"+"users")
    acoll = collection(db,slug + "-"+"invites")
  }
  
  const join = async ()=>{
    await addDoc(jcoll,{
      "name":name
    })
    Router.push(`/chats/${slug}`)
  }
  // @ts-ignore
  const [value] = useCollectionData(coll)
  const [value2] = useCollectionData(jcoll)
  const [value3] = useCollectionData(acoll)
  
  if(value != undefined){
    value.map((item)=>{
      if(item.val === "true"){
        
      }
      else{
        Router.push("/not invited")
      }
    })
  }
  let arr = []
  if(value2 != undefined){
    value2.map((item)=>{
      arr.push(item.name)
      
    })
    if(arr.includes(name)){
        
        
    }
    else{
      Router.push("/invalid-group")
    }
  }
 
  if(value3 != undefined){
    console.log(value3)
    let autharr = []
    value3.map((item)=>{
      autharr.push(item.name)


    }) 
    if (autharr.includes(name)){
    }
    else{
      Router.push("/not-invited")
    }
  }
  
  


  return (
    <div className={styles.container}>
      <button onClick={join} className={styles.jn}>Join Group firechat 🔥</button>
    </div>
  )
}
