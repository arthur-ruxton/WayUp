import React from 'react'
import { doc, deleteDoc } from '@firebase/firestore'
import { Card, CardContent, Typography, CardActions, IconButton } from '@mui/material'

import { DeleteIcon } from '../../assets/icons'
import { db } from '../../firebase/firebase'

const BranchCard = ({id, title}) => {


   // deletes entire Trees (Projects)
   const onDelete = async(e) => {
    e.stopPropagation();
    const docRef = doc(db, "Branches", id)
    await deleteDoc(docRef)
  }

  return (
    <>
    <Card 
      sx={{ minWidth: 275, mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: '#FAFAFA' }}
    >
      <CardContent>
      <Typography>
        {title}
      </Typography>
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