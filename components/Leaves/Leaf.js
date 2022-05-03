import { useState, useContext } from 'react'

import { doc, deleteDoc, updateDoc } from '@firebase/firestore'
import { ListItem, IconButton, ListItemText, TextField } from '@mui/material'

import { CheckIcon, CloseIcon, DeleteIcon } from '../../assets/icons'
import { db } from '../../firebase/firebase'
import { DataContext } from '../../pages/DataContext'

const Leaf = ({thisLeaf}) => {
  const [editing, setEditing] = useState()
  // const [newLeafData, setNewLeafData] = useState({})
  const [currentLeaf, setCurrentLeaf] = useState(thisLeaf)

  const { newData, setNewData } = useContext(DataContext)

   // functionality for editing the leaf conent.
   const onEditButtonClick = () => {
    setEditing(true)
  }
  const onConentChange = (e) => {
    setNewData({...currentLeaf, text: e.target.value})
  }
  const onSaveButtonClick = async() => {
    setEditing(false)
    const docRef = doc(db, "Leaves", currentLeaf.id)
    const updatedLeaf = {...newData}
    setCurrentLeaf(updatedLeaf)
    await updateDoc(docRef, updatedLeaf)
    setNewData({title: '', highlight: false})
  }
  const onCancleEdit = () => {
    setEditing(false)
    setNewData({title: '', highlight: false})
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
            sx={{ flexGrow: 1, maxWidth: 250, mt: 2, boxShadow: 2 }}
            style={{ backgroundColor: '#FAFAFA' }}
            secondaryAction={
              <>
                <IconButton  onClick={e => onDelete(e)}>
                  <DeleteIcon/>
                </IconButton>
              </>
            }
          >
          <ListItemText sx={{ maxWidth: '90%'}}>
            <div style={{ overflow: "hidden", textOverflow: 'ellipsis' }} onClick={onEditButtonClick}>
              {thisLeaf.text}
            </div>
          </ListItemText>
          </ListItem>
        </>
      ) :
      (<>
        <TextField 
          id="outlined-basic" 
          label={currentLeaf.text} 
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