import styles from '../styles/Home.module.css'
import {app} from './firebase/firebase'
import cookie from 'js-cookie'
import { collection,addDoc,getFirestore,limit,orderBy,query, Timestamp } from 'firebase/firestore'
import { getAuth} from 'firebase/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useRef} from 'react'
import { useEffect,useState } from 'react'
import Router from 'next/router'
export default function Home() {
  const db = getFirestore(app)
  const auth = getAuth(app)
  const authstate = useAuthState(auth)
  const firecoll = collection(db,"mmsgs")
  //@ts-ignore
  const sorted = firecoll
  const view = useRef()
  const [inpval,setval] = useState(null)
  const docref = collection(db,"mmsgs")
  const add = () => {
    if(name != undefined){
      const docsd = addDoc(docref,{
        message:inpval,
        name:cookie.get("name"),
        createdAt:Timestamp.now().seconds
      })
    }
    else{
      if(name != undefined){
        Router.push("/auth")
      }
      else{
      }
    }
    setval("")
}

  useEffect(()=>{
    view.current.scrollIntoView({behavior:"smooth"})
  })
  // @ts-ignore
  const [message] = useCollectionData(sorted,{idFeild:'id'})
  const name = cookie.get("name")

  useEffect(()=>{
    Router.push("/auth")
  })


  return (
    <div className={styles.container}>
      {message && message.map((message)=>(
        <div className={styles.messagecontainer} key={message.id}>
          <p className={styles.message}>{message.message}</p>
          <img className={styles.photo} src=""></img>
          <p className={styles.name}>from @{message.name}</p>
        </div>
      ))}
      <div ref={view} className="view"></div>
      <div className={styles.icont}>
      <input value={inpval} type="text" onChange={(e)=>{setval(e.target.value)}} className={styles.minp} />
      <button onClick={add} className={styles.mbtn}>Submit</button>
      </div>
    </div>
  )
}
