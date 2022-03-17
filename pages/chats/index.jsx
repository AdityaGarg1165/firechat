import styles from '../../styles/Home.module.css'
import {app} from '../firebase/firebase'
import cookie from 'js-cookie'
import { addDoc, collection,getFirestore,limit,orderBy,query } from 'firebase/firestore'
import { getAuth} from 'firebase/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useRef,useState} from 'react'
import { useEffect } from 'react'
export default function ChatHome() {
  const db = getFirestore(app)
  const auth = getAuth(app)
  const [value,setValue] = useState("test")
  let error = ""
  const authstate = useAuthState(auth)
  const name = cookie.get("name")
  const firecoll = collection(db,name + "-" + "chats")
  //@ts-ignore
  const sorted = firecoll
  useEffect(()=>{
    input1.current.value = ""
  },[])
  // @ts-ignore
  const [message] = useCollectionData(sorted,{idFeild:'id'})
  const input1 = useRef()
  let newcollection = collection(db,value)
  let [collectiondata] = useCollectionData(newcollection,{idFeild:"id"})
  if(collectiondata!= undefined){
    collectiondata.map((item)=>{
      if(item.val === "true"){
        collectiondata = undefined
        error = "name already taken!"
      }
    })
  }
  const click = ()=>{
    if(error === "name already taken!"){

    }
    else{
      addDoc(firecoll,{
        "name":value
      })
      const newcoll = collection(db,value)
      addDoc(newcoll,{
        val:"true"
      })
      input1.current.value = ""
    }
  }
  
 


  return (
    <div className={styles.container}>
        <p>{error}</p>
        <input type="text" onChange={(e)=>{setValue(e.target.value)}} className={styles.newinp} ref={input1} name='inp' placeholder='name of new chat...' />
        <button onClick={click} className={styles.create}>Create new group firechat 🔥</button>
      {message && message.map((message)=>(
        <div key={message.id} className={styles.gncont}>
          <p className={styles.message}>{message.name}</p>
        </div>
      ))}
    </div>
  )
}
