//import styles from '../styles/Home.module.css'
import { useState} from 'react'
import { Container, Button } from '@mui/material'

import TreesList from '../components/TreesList'
import TreeForm from '../components/TreeForm'

export default function Home() {
  const [showTreeForm, setShowTreeForm] = useState(false)

  const showNewTreeForm = () => {
    setShowTreeForm(true)
  }

  return (
    <Container>
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
