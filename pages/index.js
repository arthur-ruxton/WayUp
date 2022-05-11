//import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { getSession } from 'next-auth/client'
import { collection, query, where, orderBy, getDocs } from '@firebase/firestore';
import { Container, Button } from '@mui/material'

// file system imports
import { db } from '../firebase/firebase'
import BoardList from '../components/Boards/BoardList'
import NewDataForm from '../components/NewDataForm';

export default function Home({boardListProps}) {

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
