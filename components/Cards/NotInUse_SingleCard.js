import React, { useState, useContext } from 'react'
import { doc, deleteDoc, updateDoc } from '@firebase/firestore'
import { Card, CardContent, Typography, CardActions, IconButton, TextField } from '@mui/material'

import { CheckIcon, CloseIcon, DeleteIcon, AddIcon } from '../../assets/icons'
import { db } from '../../firebase/firebase'
import { DataContext } from '../../pages/DataContext'
import ItemList from '../Items/ItemList'
import NewDataForm from '../NewDataForm'

const SingleCard = ({thisCard, itemList}) => {
  const [editing, setEditing] = useState()
  const [currentCard, setCurrentCard] = useState(thisCard)
  const [showForm, setShowForm] = useState(false)

  const { newData, setNewData } = useContext(DataContext)

  const showNewForm = () => {
    setShowForm(true)
  }

   // functionality for editing the boards title.
   const onEditButtonClick = () => {
    setEditing(true)
  }
  const onTitleChange = (e) => {
    setNewData({...currentCard, text: e.target.value})
  }
  const onSaveButtonClick = async() => {
    setEditing(false)
    const docRef = doc(db, "Cards", currentCard.id)
    const updatedCard = {...newData}
    setCurrentCard(updatedCard)
    await updateDoc(docRef, updatedCard)
    setNewData({text: '', highlight: false})
  }
  const onCancleEdit = () => {
    setEditing(false)
    setNewData({text: '', highlight: false})
  }

   // deletes entire card 
   const onDelete = async(e) => {
    e.stopPropagation();
    const docRef = doc(db, "Cards", thisCard.id)
    await deleteDoc(docRef)

    const deleteitem = async(item) => {
      const docRef = doc(db, "Items", item.id)
      await deleteDoc(docRef)
    }
    await itemList.forEach(item => deleteitem(item)) 
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
            {currentCard.text}
          </Typography> :
          (<>
            <TextField 
              id="outlined-basic" 
              label={currentCard.text} 
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
        <ItemList itemList={itemList} cardId={currentCard.id} boardId={currentCard.boardId}/>
        {
          showForm ? 
          <NewDataForm 
            setShowForm={setShowForm} 
            cardId={currentCard.id}
            boardId={currentCard.boardId}
            dataCollection="Items" 
            type="item" 
            maxLength={250}
          />
          :
          <IconButton 
            size="large"
            variant="outlined" 
            sx={{ mt: 3, alignItems: "center"}}
            onClick={showNewForm}
          >
            <AddIcon />
          </IconButton>
        }
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

export default SingleCard