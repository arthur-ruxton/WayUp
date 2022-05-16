import React, { useContext } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd-next';
import { doc, deleteDoc, updateDoc, serverTimestamp } from '@firebase/firestore'
import { Box, Card, CardHeader, IconButton, CardActions } from '@mui/material';

import { db } from '../../firebase/firebase'
import { DragHandleIcon, DeleteIcon } from '../../assets/icons'
import { BoardContext } from '../../pages/boards/BoardContext'
import ItemList from './ItemList'

const SingleCard = ({card, itemMap, index}) => {

  const { currentBoard, setRefresh } = useContext(BoardContext)
  
  const items = card.itemIds.map(itemId => itemMap.filter(item => item.id === itemId)[0])

    // deletes entire card (Projects)
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
      setRefresh(true)
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
            <CardHeader
            titleTypographyProps={{variant:'h6' }}
            title={card.text} 
            action={
              <div {...provided.dragHandleProps}>
                <DragHandleIcon sx={{ fontSize: "2rem", color: "#808080"}} className="drag-handle"/>
              </div>
            }
            />
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
            <CardActions>
              <IconButton  onClick={e => onDelete(e)}>
                <DeleteIcon/>
              </IconButton>
            </CardActions>
          </Card>
        )
      }}
    </Draggable>
    )
  }

export default React.memo(SingleCard)