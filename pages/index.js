//import styles from '../styles/Home.module.css'
import { useState} from 'react'
import { Container, Button, Box, Avatar, Typography, IconButton } from '@mui/material'

import { useAuth } from '../Auth'
import TreesList from '../components/TreesList'
import TreeForm from '../components/TreeForm'

import { auth } from '../firebase/firebase'

export default function Home() {
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
