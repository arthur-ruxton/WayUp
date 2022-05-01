import React, { useState } from 'react'
import { TextField, Button } from "@mui/material"
import { collection, addDoc} from '@firebase/firestore' // firebase methods 

import { db } from '../../firebase/firebase' // getting the database
import { AddIcon, CloseIcon } from "../../assets/icons" // getting icons


const BranchForm = ({ setShowBranchForm, treeId }) => {
  // use context because this object is used to create data in multiple places ?
  const [ newBranchData, setNewBranchData ] = useState({})

  // creating object with data from input field
  const onChange = (e) => {
    const titleInput = e.target.value
    setNewBranchData({title: titleInput})
  }

  // firebase crud methods -> here we add data (addDoc) to the db
  const onSubmit = async () => {
    setShowBranchForm(false)
    const collectionRef = collection(db, 'Branches')
    const docRef = await addDoc(collectionRef, {...newBranchData, treeId: treeId})
    setNewBranchData({title: '', favourite: false})
  }

  // simply abort the crud op
  const onCancle = () => {
    setShowBranchForm(false)
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(tree)}</pre> this saves us from using console.log super cool*/}
      <TextField 
      fullWidth
      label="title" 
      margin="normal"
      value={newBranchData.title}
      inputProps={{maxLength: 26}}
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

export default BranchForm