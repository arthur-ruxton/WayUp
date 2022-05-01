import React, { useState, useContext } from 'react'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { Container, Box, IconButton, Typography, TextField } from '@mui/material'

import moment from 'moment'

// imports from project files including icons
import { db } from '../../firebase/firebase'
import { DataContext } from '../../pages/DataContext'
import { CheckIcon, CloseIcon, StarIcon, StarOutlineIcon, HomeIcon } from '../../assets/icons'

const TreeHeader = ({ currentTree, setCurrentTree }) => {
  const [editing, setEditing] = useState(false)

  // use context because this object used on different pages
  const { newData, setNewData } = useContext(DataContext)

  // functionality for editing the trees title.
  const onEditButtonClick = () => {
    setEditing(true)
  }
  const onTitleChange = (e) => {
    setNewData({...currentTree, text: e.target.value})
  }
  const onSaveButtonClick = async() => {
    setEditing(false)
    const docRef = doc(db, "Trees", currentTree.id)
    const updatedTree = { ...newData, timestamp: serverTimestamp()}
    setCurrentTree(updatedTree)
    await updateDoc(docRef, updatedTree)
    setNewData({text: '', highlight: false})
  }
  const onCancleEdit = () => {
    setEditing(false)
    setNewData({text: '', highlight: false})
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem' }} mt={3}>
        {!editing ?
        <Typography variant='h5' onClick={onEditButtonClick}>
          {currentTree.text}  
        </Typography> :
        (<>
          <TextField 
            id="outlined-basic" 
            label={currentTree.text} 
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
        {!currentTree.highlight ? 
          <IconButton>
            <StarOutlineIcon/>
          </IconButton>
          : 
          <IconButton>
            <StarIcon/>
          </IconButton>
        }
        <IconButton href="/">
          <HomeIcon/>
        </IconButton>
        <Typography>
          {moment(currentTree.timestamp).format("DD MMMM, YYYY ")}
        </Typography>
      </Box>
    </Container>
  )
}

export default TreeHeader