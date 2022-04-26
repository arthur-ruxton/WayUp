//import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { useSession, getSession } from 'next-auth/client'

import { Container, Button } from '@mui/material'

import TreesList from '../components/TreesList'
import TreeForm from '../components/TreeForm'

export default function Home({data}) {
  const [session, loading] = useSession()
  // console.log('session, loading: ', {session, loading})
  const [showTreeForm, setShowTreeForm] = useState(false)

  const showNewTreeForm = () => {
    setShowTreeForm(true)
  }

  return (
    <Container maxWidth='xs'>
      <h3>{session.user.name}</h3>
      <TreesList />
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

  const email = session.user
  console.log('email from session', email)

  // const collectionRef = collection(db, "Trees")
  // const q = query(collectionRef, where("email", "==", email), orderBy("timestamp", "desc"))
  // const querySnapshot = await getDocs(q)
  // let treeList = []
  // querySnapshot.forEach((doc) => {
  //   treeList.push({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })
  // })

  // return {
  //   props: { 
  //     session,
  //     treeListProps: JSON.stringify(treeList) || [], 
  //   }, // will be passed to the page component as props
  // }

  return {
    props: {
      session,
      data: session ? 'list of trees' : 'no list'
    }, // will be passed to the page component as props
  }
}
