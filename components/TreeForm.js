import React, { useState, useContext } from 'react'
import { TreeContext } from '../pages/TreeContext' //context used to create alert messages

import { TextField, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

import { collection, addDoc, serverTimestamp} from '@firebase/firestore' // firebase methods 

import { db } from '../firebase/firebase' // getting the database

const TreeForm = ({ setShowTreeForm }) => {
  const { showAlert, tree, setTree } = useContext(TreeContext) // getting the context

  const onChange = (e) => {
    const titleInput = e.target.value
    setTree({...tree, title: titleInput})
  }

  // using firebase methods we add a document to the database (the object we built with the form)
  const onSubmit = async () => {
    setShowTreeForm(false)
    const collectionRef = collection(db, 'Trees')
    const docRef = await addDoc(collectionRef, {...tree, timestamp: serverTimestamp()})
    showAlert('success', `${tree.title} - Tree added successfully`)
    setTree({title: '', favourite: false})
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(tree)}</pre> this saves us from using console.log super cool*/}
      <TextField 
      fullWidth
      label="title" 
      margin="normal"
      value={tree.title}
      onChange={onChange}
      />
      <Button 
        variant="contained" 
        sx={{ mt: 3 }}
        onClick={onSubmit}
      >
      <AddIcon />
      </Button>
    </div>
  )
}

export default TreeForm