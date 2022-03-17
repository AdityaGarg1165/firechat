import styles from '../styles/Home.module.css'
import {app} from './firebase/firebase'
import cookie from 'js-cookie'
import { collection,getFirestore,limit,orderBy,query } from 'firebase/firestore'
import { getAuth} from 'firebase/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
export default function Home() {
  const db = getFirestore(app)
  const auth = getAuth(app)
  const authstate = useAuthState(auth)
  const firecoll = collection(db,"coll1")
  //@ts-ignore
  const sorted = firecoll
  // @ts-ignore
  const [message] = useCollectionData(sorted,{idFeild:'id'})
  const name = cookie.get("name")


  return (
    <div className={styles.container}>
      {message && message.map((message)=>(
        <div className={styles.messagecontainer} key={message.id}>
          <p className={styles.message}>{message.message}</p>
          <img className={styles.photo} src=""></img>
          <p className={styles.name}>from @{message.name}</p>
        </div>
      ))}
    </div>
  )
}
