import React, { useContext } from 'react'
import { useSession } from 'next-auth/client'
import { collection, addDoc, serverTimestamp} from '@firebase/firestore' // firebase methods 
import { TextField, Button } from "@mui/material" // mui components

import { db } from '../firebase/firebase'
import { DataContext } from '../pages/DataContext' // reusable new data object 
import { AddIcon, CloseIcon } from "../assets/icons" // mui icons from my file system

const NewDataForm = ({
  setShowForm,
  branchId,
  treeId,
  dataCollection,
  type,
  maxLength
}) => {

  const [session] = useSession() // next-auth cookies method
  const email = session.user.email 

  const { newData, setNewData } = useContext(DataContext) // reusable object from context

  const onChange = (e) => {
    const textInput = e.target.value
    setNewData({...newData, text: textInput})
  }

  // firebase crud methods -> here we add data (addDoc) to the db
  const onSubmit = async () => {
    setShowForm(false)
    const collectionRef = collection(db, dataCollection)

    let docRef;
    switch (type) {
      case "tree":
        docRef = await addDoc(collectionRef, {...newData, email: email, timestamp: serverTimestamp()});
        break;
      case "branch":
        docRef = await addDoc(collectionRef, {...newData, treeId: treeId});
        break;
      case "leaf":
        docRef = await addDoc(collectionRef, {...newData, branchId: branchId, treeId: treeId});
        break;
    }
    setNewData({text: '', highlight: false})
  }

  // simply abort the crud opx
  const onCancle = () => {
    setShowForm(false)
  }

  return (
    <div>
      <TextField 
        fullWidth
        label="title" 
        margin="normal"
        value={newData.title}
        inputProps={{maxLength: maxLength}}
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

export default NewDataForm