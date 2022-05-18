import { useState, useContext } from 'react'

import { doc, deleteDoc, updateDoc } from '@firebase/firestore'
import { ListItem, IconButton, ListItemText, TextField } from '@mui/material'

import { CheckIcon, CloseIcon, DeleteIcon } from '../../assets/icons'
import { db } from '../../firebase/firebase'
import { DataContext } from '../../pages/DataContext'

const Item = ({thisItem}) => {
  const [editing, setEditing] = useState()
  // const [newitemData, setNewitemData] = useState({})
  const [currentItem, setCurrentItem] = useState(thisItem)

  const { newData, setNewData } = useContext(DataContext)

   // functionality for editing the item conent.
   const onEditButtonClick = () => {
    setEditing(true)
  }
  const onConentChange = (e) => {
    setNewData({...currentItem, text: e.target.value})
  }
  const onSaveButtonClick = async() => {
    setEditing(false)
    const docRef = doc(db, "Items", currentItem.id)
    const updatedItem = {...newData}
    setCurrentItem(updatedItem)
    await updateDoc(docRef, updatedItem)
    setNewData({title: '', highlight: false})
  }
  const onCancleEdit = () => {
    setEditing(false)
    setNewData({title: '', highlight: false})
  }

  // deletes entire Item (list items / tasks)
  const onDelete = async(e) => {
    e.stopPropagation();
    const docRef = doc(db, "Items", thisItem.id)
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
              {thisItem.text}
            </div>
          </ListItemText>
          </ListItem>
        </>
      ) :
      (<>
        <TextField 
          id="outlined-basic" 
          label={currentItem.text} 
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

export default Item