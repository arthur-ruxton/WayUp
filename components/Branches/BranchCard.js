import React, { useState } from 'react'
import { doc, deleteDoc, updateDoc } from '@firebase/firestore'
import { Card, CardContent, Typography, CardActions, IconButton, TextField } from '@mui/material'

import { CheckIcon, CloseIcon, DeleteIcon } from '../../assets/icons'
import { db } from '../../firebase/firebase'
import LeafList from '../Leaves/LeafList'

const BranchCard = ({thisBranch, leafList}) => {
  const [editing, setEditing] = useState()
  const [newBranchData, setNewBranchData] = useState({})
  const [currentBranch, setCurrentBranch] = useState(thisBranch)

   // functionality for editing the trees title.
   const onEditButtonClick = () => {
    setEditing(true)
  }
  const onTitleChange = (e) => {
    setNewBranchData({...currentBranch, title: e.target.value})
  }
  const onSaveButtonClick = async() => {
    setEditing(false)
    const docRef = doc(db, "Branches", currentBranch.id)
    const updatedBranch = {...newBranchData}
    setCurrentBranch(updatedBranch)
    await updateDoc(docRef, updatedBranch)
    setNewBranchData({title: '', favourite: false})
  }
  const onCancleEdit = () => {
    setEditing(false)
    setNewBranchData({title: '', favourite: false})
  }

   // deletes entire Trees (Projects)
   const onDelete = async(e) => {
    e.stopPropagation();
    const docRef = doc(db, "Branches", thisBranch.id)
    await deleteDoc(docRef)
  }

  return (
    <>
    <Card 
      sx={{ minWidth: 275, mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: '#FAFAFA' }}
    >
      <CardContent>
        {
          !editing ?
          <Typography onClick={onEditButtonClick}>
            {currentBranch.title}
          </Typography> :
          (<>
            <TextField 
              id="outlined-basic" 
              label={currentBranch.title} 
              variant="outlined" 
              type='text' 
              onChange={onTitleChange}
            />
            <IconButton onClick={onSaveButtonClick}>
              <CheckIcon/>
            </IconButton>
            <IconButton onClick={onCancleEdit}>
              <CloseIcon/>
            </IconButton>
            </>)
        }
        <LeafList leafList={leafList} />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton  onClick={e => onDelete(e)}>
          <DeleteIcon/>
        </IconButton>
      </CardActions>
    </Card>
  </>
  )
}

export default BranchCard