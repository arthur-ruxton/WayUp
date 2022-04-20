import React from 'react'
import { useRouter } from 'next/router'
import moment from "moment"
import { doc, deleteDoc } from '@firebase/firestore'
import { ListItem, IconButton, ListItemText } from '@mui/material'

import { DeleteIcon } from '../assets/icons'
import { db } from '../firebase/firebase'

const TreeCard = ({id, favourite, timestamp, title}) => {

  // deletes entire Trees (Projects)
  const onDelete = async(e) => {
    e.stopPropagation();
    const docRef = doc(db, "Trees", id)
    await deleteDoc(docRef)
  }

  // route to individual Tree page
  const router = useRouter()
  // follows route to Tree page using id
  const onExpand = (e) => {
    e.stopPropagation();
    router.push(`/trees/${id}`)
  }

  return (
    <ListItem
      onClick={onExpand}
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
    primary={title}
    secondary={moment(timestamp).format("DD MMMM, YYYY ")}
    /> 
    </ListItem>
  )
}

export default TreeCard