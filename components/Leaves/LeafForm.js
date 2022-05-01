import React, { useState } from 'react'
import { TextField, Button } from "@mui/material"
import { collection, addDoc} from '@firebase/firestore' // firebase methods 

import { db } from '../../firebase/firebase' // getting the database
import { AddIcon, CloseIcon } from "../../assets/icons" // getting icons

const LeafForm = ({ setShowLeafForm, branchId, treeId }) => {
  // use context because this object is used to create data in multiple places ?
  const [ newLeafData, setNewLeafData ] = useState({})

  console.log('branch id', branchId, 'treeId', treeId)
    // creating object with data from input field
    const onChange = (e) => {
      const titleInput = e.target.value
      setNewLeafData({content: titleInput})
    }
  
    // firebase crud methods -> here we add data (addDoc) to the db
    const onSubmit = async () => {
      setShowLeafForm(false)
      const collectionRef = collection(db, 'Leaves')
      const docRef = await addDoc(collectionRef, {...newLeafData, branchId: branchId, treeId: treeId})
      setNewLeafData({})
    }
  
    // simply abort the crud opx
    const onCancle = () => {
      setShowLeafForm(false)
    }

  return (
    <div>
{/* <pre>{JSON.stringify(tree)}</pre> this saves us from using console.log super cool*/}
      <TextField 
        fullWidth
        label="title" 
        margin="normal"
        value={newLeafData.title}
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

export default LeafForm