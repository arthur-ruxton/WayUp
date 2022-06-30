//import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { getSession } from 'next-auth/client'
import { collection, query, where, orderBy, getDocs } from '@firebase/firestore';
import { Container, Button } from '@mui/material'

// file system imports
import { db } from '../firebase/firebase'
// a component that uses mui grid to list 'boards' horizontally 
import BoardList from '../components/Boards/BoardList'
// a reusable form which you can pass various arguments to do different things with data (nifty trick)
import NewDataForm from '../components/NewDataForm';

export default function Home({boardListProps}) {

  // this state can be passed to different components
  // they can then use it to manipulate what's displayed on this page
  // if showForm === false, no form shows, simple
  const [showForm, setShowForm] = useState(false)

  const showNewForm = () => {
    setShowForm(true)
  }

  return (
    <Container>
      <BoardList boardListProps={boardListProps}/>
      {showForm ?  
      <NewDataForm 
        setShowForm={setShowForm} 
        dataCollection="Boards" 
        type="board" 
        maxLength={26}
      />
      :  
      <Button 
        variant="contained" 
        sx={{ mt: 3 }}
        onClick={showNewForm}
      >
        New Board
      </Button>}
    </Container>
  )
}


export async function getServerSideProps(context) {

  const session = await getSession(context) // next auth gives us the session object, less awks than fb

  // if there is no session we send a user to login page -> 
  // this security measure works on every page, aleviating the need for 'fb rules'
  if(!session){
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      }
    }
  }

  // now we get an email which comes with next auth session object
  const email = session.user.email

  // use the email to only return relevant data using the fb where method
  const collectionRef = collection(db, "Boards")
  const q = query(collectionRef, where("email", "==", email), orderBy("timestamp", "desc"))
  const querySnapshot = await getDocs(q)
  let boardList = []
  querySnapshot.forEach((doc) => {
    boardList.push({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })
  })

  return {
    props: { 
      session,
      boardListProps: JSON.stringify(boardList) || [], 
    }, // will be passed to the page component as props
  }
}
