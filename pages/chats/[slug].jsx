import styles from '../../styles/Home.module.css'
import {app} from '../firebase/firebase'
import cookie from 'js-cookie'
import { addDoc,Timestamp, collection,getFirestore,limit,orderBy,query } from 'firebase/firestore'
import { getAuth} from 'firebase/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import Router,{useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
export default function Chat() {
  const db = getFirestore(app)
  const auth = getAuth(app)
  const authstate = useAuthState(auth)
  let coll;
  let jcoll;
  const router = useRouter()
  const {slug} = useRouter().query
  if (router.isReady){
  //@ts-ignore
    coll = collection(db,slug)
    jcoll = collection(db,slug + "-"+"invites")
  }
  // @ts-ignore
  const [message] = useCollectionData(coll,{idFeild:'id'})
  const name = cookie.get("name")
  const  input = useRef()
  const add = () => {
    const newmessage = addDoc(coll,{
      "message":input.current.value,
      "name":name,
      "createdAt":Timestamp.now().seconds 
    })

  }
  const [value2] = useCollectionData(jcoll)
  let arr = []
  if(value2 != undefined){
    value2.map((item)=>{
      arr.push(item.name)
      if(arr.includes(name)){
      }
      else{
        Router.push("/not-invited")
      }
    })
  }
  const [value] = useCollectionData(coll)
  let valearr = []
  if(value != undefined){
    value.map((item)=>{
      valearr.push(item.val)
    })
    if(valearr.includes("true")){
      // console.log(coll.orderBy(""))
    }
    else{
      Router.push("/invalid-group")
    }
  }


  return (
    <div className={styles.container}>
      {message && message.map((item)=>(
        <div key={item.id} className={styles.messagecontainer}>
          <div className={styles.message}>{item.message}</div>
          <div className={styles.name}>from @{item.name}</div>
          </div>
      ))}
      <input className={styles.inpu} ref={input} type="text" />
      <button onClick={add} className={styles.msgb}>Submit</button>
    </div>
  )
}