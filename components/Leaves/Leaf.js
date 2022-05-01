import { useState } from 'react'

import { doc, deleteDoc, updateDoc } from '@firebase/firestore'
import { ListItem, IconButton, ListItemText, TextField } from '@mui/material'

import { CheckIcon, CloseIcon, DeleteIcon } from '../../assets/icons'
import { db } from '../../firebase/firebase'

const Leaf = ({thisLeaf, branchId, treeId}) => {
  const [editing, setEditing] = useState()
  const [newLeafData, setNewLeafData] = useState({})
  const [currentLeaf, setCurrentLeaf] = useState(thisLeaf)

   // functionality for editing the leaf conent.
   const onEditButtonClick = () => {
    setEditing(true)
  }
  const onConentChange = (e) => {
    setNewLeafData({...currentLeaf, content: e.target.value})
  }
  const onSaveButtonClick = async() => {
    setEditing(false)
    const docRef = doc(db, "Leaves", currentLeaf.id)
    const updatedLeaf = {...newLeafData}
    setCurrentLeaf(updatedLeaf)
    await updateDoc(docRef, updatedLeaf)
    setNewLeafData({title: '', favourite: false})
  }
  const onCancleEdit = () => {
    setEditing(false)
    setNewLeafData({title: '', favourite: false})
  }

  // deletes entire Trees (Projects)
  const onDelete = async(e) => {
    e.stopPropagation();
    const docRef = doc(db, "Leaves", thisLeaf.id)
    await deleteDoc(docRef)
  }

  return (
    <>
    {
      !editing ? 
      (
        <>
          <ListItem
            sx={{ mt: 3, boxShadow: 3 }}
            style={{ backgroundColor: '#FAFAFA' }}
            secondaryAction={
              <>
                <IconButton  onClick={e => onDelete(e)}>
                  <DeleteIcon/>
                </IconButton>
              </>
            }
          >
          <ListItemText
          onClick={onEditButtonClick}
          primary={thisLeaf.content}
          /> 
          </ListItem>
        </>
      ) :
      (<>
        <TextField 
          id="outlined-basic" 
          label={currentLeaf.content} 
          variant="outlined" 
          type='text' 
          onChange={onConentChange}
        />
        <IconButton onClick={onSaveButtonClick}>
          <CheckIcon/>
        </IconButton>
        <IconButton onClick={onCancleEdit}>
          <CloseIcon/>
        </IconButton>
        </>)
      }
    </>
  )
}

export default Leaf