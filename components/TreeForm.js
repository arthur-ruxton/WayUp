import React, { useRef, useState, useContext, useEffect } from 'react'
import { TreeContext } from '../pages/TreeContext' //context used to create alert messages

import { TextField, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

import { collection, addDoc, serverTimestamp} from '@firebase/firestore' // firebase methods 

import { db } from '../firebase/firebase' // getting the database

const TreeForm = ({ setShowTreeForm }) => {
  const inputAreaRef = useRef()

  const [tree, setTree] = useState({title: '', favourite: false})

  const { showAlert } = useContext(TreeContext) // getting the context

  const onChange = (e) => {
    const titleInput = e.target.value
    setTree({...tree, title: titleInput})
  }

  // using firebase methods we add a document to the database (the object we built with the form)
  const onSubmit = async () => {
    setShowTreeForm(false)
    const collectionRef = collection(db, 'Trees')
    const docRef = await addDoc(collectionRef, {...tree, timestamp: serverTimestamp()})
    setTree({title: '', favourite: false})
    showAlert('success', `Tree with id ${docRef.id} added successfully`)
  }

  useEffect(() => {
    const checkClickArea = (e) => {
      if(!inputAreaRef.current.contains(e.target)){
        console.log('clicked outside input');
        setTree({title: '', favourite: false})
      } else {
        console.log('clicked inside input')
      }
    }
    document.addEventListener("mousedown", checkClickArea)
    return () => {
      document.removeEventListener("mousedown", checkClickArea)
    }
  }, [])

  return (
    <div ref={inputAreaRef}>
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