import React, { useState, useContext } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd-next';
import { doc, deleteDoc, updateDoc, serverTimestamp } from '@firebase/firestore'
import { Box, Card, CardContent, Typography, TextField, IconButton, CardActions } from '@mui/material';

import { db } from '../../firebase/firebase'
import { CheckIcon, CloseIcon, DragHandleIcon, DeleteIcon, AddIcon } from '../../assets/icons'
import { BoardContext } from '../../pages/boards/BoardContext'
import { DataContext } from '../../pages/DataContext'
import ItemList from './ItemList'
import NewDataForm from '../NewDataForm'


const SingleCard = ({card, itemMap, index, setRefreshCard}) => {
  const { currentBoard, setRefreshBoard } = useContext(BoardContext)
  const { newData, setNewData } = useContext(DataContext)
  const [currentCard, setCurrentCard] = useState(card)
  const [editing, setEditing] = useState(false)
  const [showForm, setShowForm] = useState(false)

  // switching from card to currentCard caused an arror when moving items. -> useing state didnt work either.
  // you must unravell this in order to add items.
  // I believe this has to stay constant for some reason --> 
  // I will try to refresh from the parent component 'dndcontainer' instead.
  const items = card.itemIds.map(itemId => itemMap.filter(item => item.id === itemId)[0])

  const showNewForm = () => {
    setShowForm(true)
  }
   // functionality for editing the boards title.
   const onEditButtonClick = () => {
    setEditing(true)
  }
  const onTitleChange = (e) => {
    // setNewData({...currentCard, text: e.target.value})
    setNewData({...card, text: e.target.value})
  }
  const onSaveButtonClick = async() => {
    const docRef = doc(db, "Cards", card.id)
    const updatedCard = {...newData}
    setCurrentCard(updatedCard) 
    setEditing(false)
    await updateDoc(docRef, updatedCard)
    setNewData({text: '', highlight: false})
  }

  const onCancleEdit = () => {
    setEditing(false)
    setNewData({text: '', highlight: false})
  }

    // deletes entire card (Projects) including the cardId stored in board object
    const onDelete = async(e) => {
      e.stopPropagation();
      // strat by deleting the card id from the boards data
      const newCardsOrder = Array.from(currentBoard.cardsOrder)
      const cardIndex = newCardsOrder.indexOf(card)
      newCardsOrder.splice(cardIndex, 1)
      const updatedData = {
        ...currentBoard,
        cardsOrder: newCardsOrder,
        timestamp: serverTimestamp()
      }
      const updateBoardData = async () => {
        const docRef = doc(db, "Boards", currentBoard.id)
        // setBoardData(updatedData)
        await updateDoc(docRef, updatedData)
      }
      updateBoardData()

      // delete the card itself
      const docRef = doc(db, "Cards", card.id)
      await deleteDoc(docRef)
      
      // delete all items belonging to that card
      const deleteitem = async(item) => {
        const docRef = doc(db, "Items", item.id)
        await deleteDoc(docRef)
      }
      await items.forEach(item => deleteitem(item)) 
      setRefreshBoard("refresh board")
    }

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => {
        return (
          <Card 
            ref={provided.innerRef}
            {...provided.draggableProps}
            type="item-list"
            sx={{margin: 1,
             minWidth: 275, 
             padding: 0, 
             border:1, 
             borderColor: "gray",
             borderRadius: 3, 
             backgroundColor: 'white', 
             boxShadow: 3}}
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
              <Droppable droppableId={card.id}>
                {(provided, snapshot) => {
                  return (
                    <Box 
                      ref={provided.innerRef} 
                      {...provided.droppableProps}
                      className={`drop-item ${snapshot.isDraggingOver?'drop-active':''}`}
                      sx={{flexGrow: 1, marginBottom: 3, margin: 1, padding: 1, borderRadius: 3}}
                    >
                      <ItemList items={items} />
                      {provided.placeholder}
                    </Box>
                  )
                }}
              </Droppable>
              {
                showForm ? 
                <NewDataForm 
                  setShowForm={setShowForm} 
                  setRefreshCard={setRefreshCard}
                  currentCard={currentCard}
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
            <CardActions>
              <IconButton  onClick={e => onDelete(e)}>
                <DeleteIcon/>
              </IconButton>
              <div {...provided.dragHandleProps}>
                <DragHandleIcon sx={{ fontSize: "2rem", color: "#808080"}} className="drag-handle"/>
              </div>
            </CardActions>
          </Card>
        )
      }}
    </Draggable>
    )
  }

export default React.memo(SingleCard)