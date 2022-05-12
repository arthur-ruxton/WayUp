import { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd-next'

import Container from '@mui/material/Container';

import { initialItemData, initialCardData, initialBoardData } from '../../initial-data'
import ListContainer from './ListContainer';

import React from 'react'

const DragDropContainer = () => {
  const [itemData, setItemData] = useState(initialItemData)
  const [cardData, setCardData] = useState(initialCardData)
  const [boardData, setBoardData] = useState(initialBoardData)

  // function for persisting data when reordering
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result

    if(!destination) {
      return
    }
    // check if the items location has changed
    if(destination.droppableId === source.droppableId &&
      destination.index === source.index){
        return
      }

    if(type === 'card'){
      const newCardsOrder = Array.from(boardData.cardsOrder)
      newCardsOrder.splice(source.index, 1)
      newCardsOrder.splice(destination.index, 0, draggableId)
      const updatedData = {
        ...boardData,
        cardsOrder: newCardsOrder
      }
      setBoardData(updatedData)
      return
    }
    
    // ----------> reorder the itemIds 

      // 1. retrive start collumn from state 
      const startCard = cardData.cards[source.droppableId]
      // 2. retrive destination collumn from state 
      const finishCard = cardData.cards[destination.droppableId]

    // case 1. reodering items within a cards
    if(startCard === finishCard){
      // copy array of start cardss itemIds
        const newItemIds = Array.from(startCard.itemIds)
        //remove one item from source index 
      newItemIds.splice(source.index, 1)
        // insert itemId at the destination index
      newItemIds.splice(destination.index, 0, draggableId)
        // create newCards object with the updated itemIds array
      const newCard = {
        ...startCard,
        itemIds: newItemIds
      }
        // replace old cards with new cards 
      const newData = {
        ...cardData,
        cards: {
          ...cardData.cards, 
          [newCard.id]: newCard
        }
      }
        setCardData(newData)
        return;
    }

    // case 2. handle moving items between cards
    // start by creating copy of start/finish cards itemId's array
    const newStartCardItemIds = Array.from(startCard.itemIds)
    const newFinishCardItemIds = Array.from(finishCard.itemIds)
    //remove one item from source index 
    newStartCardItemIds.splice(source.index, 1)
    // insert itemId at the destination index
    newFinishCardItemIds.splice(destination.index, 0, draggableId)
    // create newStartCards/newFinishCards object with the updated itemIds array
    const newStartCard = {
      ...startCard,
      itemIds: newStartCardItemIds
    }
    const newFinishCard = {
      ...finishCard,
      itemIds: newFinishCardItemIds
    }
      // replace old cardss with new cardss
      const newData = {
        ...cardData,
        cards: {
          ...cardData.cards, 
          [newStartCard.id]: newStartCard,
          [newFinishCard.id]: newFinishCard
        }
      }
      setCardData(newData)
        return;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} >
      {/*-- here we wrap everything in a droppable, allowing us to make cardss draggable --*/}
      <Droppable 
      droppableId="total-droppable" 
      direction="horizontal" 
      // draggables can only be dropped if start/finish droppable have same type! VERY USEFUL
      type="card"
      >
        {(provided) => {
          return (
            <Container 
              ref={provided.innerRef} 
              {...provided.droppableProps}
              sx={{display:'flex',  maxWidth:"full"}}
              >
              {
                boardData.cardsOrder.map((cardId, index) => {
                  const card = cardData.cards[cardId]
                  return (
                    <ListContainer
                      key={card.id} 
                      card={card} 
                      itemMap={itemData.items} 
                      index={index}
                    />
                  )
                })
              }
              {provided.placeholder}
            </Container>
          )
        }
      }
      </Droppable>
    </DragDropContext>
  )
}

export default DragDropContainer