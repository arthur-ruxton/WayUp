//import styles from '../styles/Home.module.css'
import { useState} from 'react'
import { Container, Button, Box, Avatar, Typography, IconButton } from '@mui/material'

import nookies from 'nookies'

import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'

// import { auth } from '../firebase/firebase'
// import { db } from '../firebase/firebase'
import { db, auth } from '../firebase/firebase'
import { verifyIdToken } from '../fireBaseAdmin'

import { useAuth } from '../Auth'
import TreesList from '../components/TreesList'
import TreeForm from '../components/TreeForm'

export default function Home({ treeListProps }) {
  const {currentUser} = useAuth()

  const [showTreeForm, setShowTreeForm] = useState(false)

  const showNewTreeForm = () => {
    setShowTreeForm(true)
  }

  return (
    <Container maxWidth='xs'>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mt={3}>
        <IconButton onClick={() => auth.signOut()}>
          <Avatar src={currentUser.photoURL} />
        </IconButton>
        <Typography variant='h5'>
          {currentUser.displayName}
        </Typography>
      </Box>
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


 export async function getServerSideProps(ctx) {
  try{
    const cookies = nookies.get(ctx)
    const token = await verifyIdToken(cookies.token)
    const { email } = token
    console.log('email', email)
    const collectionRef = collection(db, "Trees")
    console.log('db', db)
    const q = query(collectionRef, where("email", "==", email), orderBy("timestamp", "desc"))
    const querySnapshot = await getDocs(q)
    let treeList = []
    querySnapshot.forEach((doc) => {
      treeList.push({...doc.data(), id: doc.id, timestamp: doc.data().timestamp.toDate().getTime()})
    })
    return {
      props: {
        treeListProps: JSON.stringify(treeList) || [],
      }, // will be passed to the page component as props
    }
  } catch (error) {
    console.log('error: ', error)
    return { props: {} }
  }
}
