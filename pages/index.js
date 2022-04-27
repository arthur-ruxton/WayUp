//import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useSession, getSession } from 'next-auth/client'
import { Container, Button } from '@mui/material'
import { collection, query, where, orderBy, getDocs } from '@firebase/firestore';

// file system imports
import { db } from '../firebase/firebase'
import TreesList from '../components/TreesList'
import TreeForm from '../components/TreeForm'

export default function Home({treeListProps}) {
  // const [session, loading] = useSession()
  // when using server side auth, loading is always false. 
  // console.log('session, loading: ', {session, loading})
  const [showTreeForm, setShowTreeForm] = useState(false)

  const showNewTreeForm = () => {
    setShowTreeForm(true)
  }

  return (
    <Container maxWidth='xs'>
      <TreesList treeListProps={treeListProps}/>
      {showTreeForm ? <TreeForm setShowTreeForm={setShowTreeForm}/> 
      :  
      <Button 
        variant="contained" 
        sx={{ mt: 3 }}
        onClick={showNewTreeForm}
      >
        New Tree
      </Button>}
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

  const collectionRef = collection(db, "Trees")
  const q = query(collectionRef, where("email", "==", email), orderBy("timestamp", "desc"))
  const querySnapshot = await getDocs(q)
  let treeList = []
  querySnapshot.forEach((doc) => {
    treeList.push({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })
  })

  return {
    props: { 
      session,
      treeListProps: JSON.stringify(treeList) || [], 
    }, // will be passed to the page component as props
  }
}
