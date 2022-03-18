import styles from '../../styles/Home.module.css'
import {app} from '../firebase/firebase'
import cookie from 'js-cookie'
import { addDoc, collection,getFirestore,limit,orderBy,query } from 'firebase/firestore'
import { getAuth} from 'firebase/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useRef,useState} from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
export default function ChatHome() {
  const db = getFirestore(app)
  const auth = getAuth(app)
  const [value,setValue] = useState("test")
  const [nv,snv] = useState('')
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
        console.log(input1.current.value)
        collectiondata = undefined
        error = "name already taken! or the field is empty"
      }
    })
  }
  const click = async()=>{
    if(error === "name already taken!"){

    }
    else{
      addDoc(firecoll,{
        "name":value
      })
      const newcoll = collection(db,value)
      const invcoll = collection(db,value + "-" + "invites")
      await addDoc(newcoll,{
        val:"true",
        message:"welcome to a new firechat 🔥",
        name:"firechat team"
      })
      addDoc(invcoll,{
        name:name
      })
      input1.current.value = ""
    }
  }
  const test = useRef()
 


  return (
    <div>
          <p className={styles.err}>{error}</p>
          <input type="text" onChange={(e)=>{setValue(e.target.value)}} className={styles.newinp} ref={input1} name='inp' placeholder='name of new chat...' />
          <button onClick={click} className={styles.create}>Create new group firechat 🔥</button>
      <div className={styles.container}>
        {message && message.map((item)=>(
          <form action="" key={item.id} onSubmit={(e)=>{
            e.preventDefault();
              const val = e.target.inp2.value
              const coll = collection(db,message.name + "-" + "invites")
              addDoc(coll,{
                name:val
              })
              
            }}>
              <div key={item.id} className={styles.gncont} onClick={()=>{Router.push("chats/" + item.name)}}>
            <p className={styles.message}>{item.name}</p>
              </div>
              <div className={styles.invcont}>
            <button className={styles.invite} onClick={(e)=>{
                test.current.value = "https://firechat-gray.vercel.app/chats/invite/" + item.name
            }}>invite</button>
            <input name='inp2' ref={test} className={styles.invinp} type="text" placeholder='username of the person' />
              </div>
            </form>
        ))}
      </div>
    </div>
  )
}
