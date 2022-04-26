//import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { useSession, getSession, signIn } from 'next-auth/client'

import { Container, Button } from '@mui/material'

import TreesList from '../components/TreesList'
import TreeForm from '../components/TreeForm'

export default function Home({data}) {
  const [session, loading] = useSession()
  console.log('session, loading: ', {session, loading})
  const [showTreeForm, setShowTreeForm] = useState(false)

  const showNewTreeForm = () => {
    setShowTreeForm(true)
  }

  return (
    <>
    {
      session ?
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
    :
    <></>
    }
    </>
  )
}


export async function getServerSideProps(context) {

  const session = await getSession(context)
  return {
    props: {
      session,
      data: session ? 'list of trees' : 'no list'
    }, // will be passed to the page component as props
  }
}
