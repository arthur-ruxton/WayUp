//import styles from '../styles/Home.module.css'
import { useState} from 'react'
import { Container, Snackbar, Alert, Button } from '@mui/material'

import { TreeContext } from './TreeContext'
import Trees from '../components/Trees'
import TreeForm from '../components/TreeForm'

export default function Home() {
  const [showTreeForm, setShowTreeForm] = useState(false)
  const [open, setOpen] = useState(false)
  const [alertType, setAlertType] = useState('succsess')
  const [alertMessage, setAlertMessasge] = useState('')
  const [tree, setTree] = useState({title: '', favourite: false})

  const showNewTreeForm = () => {
    setShowTreeForm(true)
  }

  const showAlert = (type, message) => {
    setAlertType(type)
    setAlertMessasge(message)
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <TreeContext.Provider value={{ showAlert, tree, setTree }}>
      <Container>
        <Snackbar 
          anchorOrigin={{vertical: 'bottom', horizontal: 'centre'}} 
          open={open} 
          autoHideDuration={6000} 
          onClose={handleClose}
        >
          <Alert 
            onClose={handleClose} 
            severity={alertType} 
            sx={{ width: '100%' }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
        <Trees />
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
    </TreeContext.Provider>
  )
}
