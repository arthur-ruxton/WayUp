//import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { getSession } from 'next-auth/client'
// import { collection, query, where, orderBy, getDocs } from '@firebase/firestore';
import { Container, Button } from '@mui/material'

// file system imports
// import { db } from '../firebase/firebase'
// import TreesList from '../components/Trees/TreesList'
// import NewDataForm from '../components/NewDataForm';

export default function Home({session}) {

  const [showForm, setShowForm] = useState(false)

  const showNewForm = () => {
    setShowForm(true)
  }

  return (
    <Container>
      <h1>hello world</h1>
    </Container>
  )
}


export async function getServerSideProps(context) {

  const session = await getSession(context)

  if(!session){
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      }
    }
  }

  const email = session.user.email

  // const collectionRef = collection(db, "Trees")
  // const q = query(collectionRef, where("email", "==", email), orderBy("timestamp", "desc"))
  // const querySnapshot = await getDocs(q)
  // let treeList = []
  // querySnapshot.forEach((doc) => {
  //   treeList.push({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })
  // })

  return {
    props: { 
      session,
      // treeListProps: JSON.stringify(treeList) || [], 
    }, // will be passed to the page component as props
  }
}
