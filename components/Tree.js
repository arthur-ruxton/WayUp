import React, { useContext, useState } from 'react'

import { doc, deleteDoc, updateDoc, serverTimestamp } from '@firebase/firestore'

import { ListItem, IconButton, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckIcon from '@mui/icons-material/Check';

import { db } from '../firebase/firebase'
import { TreeContext } from '../pages/TreeContext'

import moment from "moment"

const Tree = ({id, favourite, timestamp, title}) => {
  
  const { showAlert, tree, setTree } = useContext(TreeContext)

  const [editing, setEditing] = useState(false)

  const onEditButtonClick = () => {
    setEditing(true)
  }
  const onTitleChange = (e) => {
    setTree({id, favourite, timestamp, title: e.target.value})
  }
  const onSaveButtonClick = async() => {
    setEditing(false)
    const docRef = doc(db, "Trees", id)
    const updatedTree = { ...tree, timestamp: serverTimestamp()}
    await updateDoc(docRef, updatedTree)
    showAlert('success', `${tree.title} - Tree updated successfully`)
    setTree({title: '', favourite: false})
  }

  const onDelete = async(e) => {
    e.stopPropagation();
    const docRef = doc(db, "Trees", id)
    await deleteDoc(docRef)
    showAlert("error", `${title} - Tree deleted successfully`)
  } 

  return (
    <ListItem
      sx={{ mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: '#FAFAFA' }}
      secondaryAction={
        <>
          <IconButton>
            <DeleteIcon onClick={e => onDelete(e)}/>
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </>
      }
    >
    {!editing ? 
      <ListItemText
      primary={title}
      secondary={moment(timestamp).format("DD MMMM, YYYY ")}
      onClick={onEditButtonClick}
      /> :
      (<>
      <input placeholder={title} type='text' onChange={onTitleChange}/>
      <IconButton>
        <CheckIcon onClick={onSaveButtonClick}/>
      </IconButton>
      </>)
    }
    </ListItem>
  )
}

export default Tree