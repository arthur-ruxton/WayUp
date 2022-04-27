import React, { useContext } from 'react'
import { useSession } from 'next-auth/client'
import { TextField, Button } from "@mui/material"
import { collection, addDoc, serverTimestamp} from '@firebase/firestore' // firebase methods 

import { TreeContext } from '../pages/TreeContext' //context used to create alert messages
import { db } from '../firebase/firebase' // getting the database
import { AddIcon, CloseIcon } from "../assets/icons" // getting icons


const TreeForm = ({ setShowTreeForm }) => {

  const [session] = useSession()
  const email = session.user.email

  // use context because this object is used to create data in multiple places
  const { newTreeData, setNewTreeData } = useContext(TreeContext)

  // creating object with data from input field
  const onChange = (e) => {
    const titleInput = e.target.value
    setNewTreeData({...newTreeData, title: titleInput})
  }

  // firebase crud methods -> here we add data (addDoc) to the db
  const onSubmit = async () => {
    setShowTreeForm(false)
    const collectionRef = collection(db, 'Trees')
    const docRef = await addDoc(collectionRef, {...newTreeData, email: email, timestamp: serverTimestamp()})
    setNewTreeData({title: '', favourite: false})
  }

  // simply abort the crud op
  const onCancle = () => {
    setShowTreeForm(false)
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(tree)}</pre> this saves us from using console.log super cool*/}
      <TextField 
      fullWidth
      label="title" 
      margin="normal"
      value={setNewTreeData.title}
      onChange={onChange}
      />
      <Button 
        variant="contained" 
        sx={{ mt: 3 }}
        onClick={onSubmit}
      >
      <AddIcon />
      </Button>
      <Button 
        variant="contained" 
        sx={{ mt: 3 }}
        onClick={onCancle}
      >
      <CloseIcon />
      </Button>
    </div>
  )
}

export default TreeForm