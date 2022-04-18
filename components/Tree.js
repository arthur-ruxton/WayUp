import React, { useContext } from 'react'

import { doc, deleteDoc } from '@firebase/firestore'

import { ListItem, IconButton, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { db } from '../firebase/firebase'
import { TreeContext } from '../pages/TreeContext'


import moment from "moment"

const Tree = ({id, favourite, timestamp, title}) => {

  const { showAlert } = useContext(TreeContext)

  const onDelete = async(e) => {
    e.stopPropagation();
    const docRef = doc(db, "Trees", id)
    await deleteDoc(docRef)
    showAlert("error", `Tree with id ${id} deleted successfully`)
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
      <ListItemText
        primary={title}
        secondary={moment(timestamp).format("DD MMMM, YYYY ")}
      />
    </ListItem>
  )
}

export default Tree