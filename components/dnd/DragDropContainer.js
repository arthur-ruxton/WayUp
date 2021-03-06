import React, { useState, useEffect, useContext } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd-next'
import { 
  getDocs,
  doc, 
  updateDoc, 
  serverTimestamp, 
  collection, 
  where, 
  query
} from 'firebase/firestore'

import { Box } from '@mui/material';

import { CardContext } from '../../pages/boards/CardContext'
import { db } from '../../firebase/firebase'
import { BoardContext } from '../../pages/boards/BoardContext'
import SingleCard from './SingleCard';

const DragDropContainer = ({boardProps, cardListProps, itemListProps}) => {
  const [boardData, setBoardData] = useState(JSON.parse(boardProps))
  const [cardData, setCardData] = useState(cardListProps)
  const [itemData, setItemData] = useState(itemListProps)
  const [refreshCard, setRefreshCard] = useState(false)

  const { currentBoard } = useContext(BoardContext)

  useEffect(() => {
    if(refreshCard === "refresh card"){
      // get the new item data first so that when itemId is added to the card ->
      // the item can be found in the item data.
      const updateItemData = async () => {
        const itemCollectionRef = collection(db, "Items")
        const q = query(itemCollectionRef, where("boardId", "==", boardData.id))
        const snapshot = await getDocs(q)
        let itemList = []
        snapshot.forEach((doc) => {
          itemList.push({ ...doc.data(), id: doc.id })
        })
        setItemData(itemList)
      }
      updateItemData()
    }
    // if a card is added, current board will refresh, add the card id to the baord data ->
    // then this will be triggered and the card will be added.
    // if an item is added, it will be added to state and then this will be triggered updating the card
    if(currentBoard.id || refreshCard === "refresh card"){
      const updateCardData = async () => {
        const cardsCollectionRef = collection(db, "Cards")
        const q = query(cardsCollectionRef, where("boardId", "==", boardData.id))
        const snapshot = await getDocs(q)
        let cardList = []
        snapshot.forEach((doc) => {
          cardList.push({ ...doc.data(), id: doc.id })
        })
        setCardData(cardList)
      }
      const updateBoardData = async () => {
        await updateCardData()
        setBoardData(currentBoard)
      }
      updateBoardData()
      // use this if statement to avoid setting the state unnecesarily
      if(refreshCard === "refresh card"){
        setRefreshCard(false)
      }
    }
  }, [currentBoard, refreshCard]) 

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
        cardsOrder: newCardsOrder,
        timestamp: serverTimestamp()
      }
      const updateBoardData = async () => {
        const docRef = doc(db, "Boards", boardData.id)
        setBoardData(updatedData)
        await updateDoc(docRef, updatedData)
      }
      updateBoardData()
      return
    }
    
    // ----------> reorder the itemIds 

      // 1. retrive start collumn from state 
      const startCard = cardData.filter(card => card.id === source.droppableId)[0]
      // 2. retrive destination collumn from state 
      const finishCard = cardData.filter(card => card.id === destination.droppableId)[0]

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

      const newData = [...cardData]
      // get index of card, splice to replace it with updated card 
      const index = newData.indexOf(startCard)
      newData.splice(index, 1, newCard)

      const updateCardData = async () => {
        const docRef = doc(db, "Cards", startCard.id)
        setCardData(newData)
        await updateDoc(docRef, newCard)
      }
      updateCardData()
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
      const newData = [...cardData]
      const startIndex = newData.indexOf(startCard)
      const finishIndex = newData.indexOf(finishCard)
      newData.splice(startIndex, 1, newStartCard)
      newData.splice(finishIndex, 1, newFinishCard)

      const updateCardData = async () => {
        const startCardDocRef = doc(db, "Cards", startCard.id)
        const finishCardDocRef = doc(db, "Cards", finishCard.id)
        setCardData(newData)
        await updateDoc(startCardDocRef, newStartCard)
        await updateDoc(finishCardDocRef, newFinishCard)
      }
      updateCardData()
        return;
  }

  return (
    <CardContext.Provider value={{setRefreshCard}}>
      <div className='total-cards-div'>
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
                <Box
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                  sx={{display:'flex', maxWidth:"full", overflowX: 'scroll'}}
                  padding={3}
                  >
                  {
                    boardData.cardsOrder.map((cardId, index) => {
                      const card = cardData.filter(card => card.id === cardId)[0]
                      return (
                        <SingleCard
                          key={card.id} 
                          card={card} 
                          itemMap={itemData}
                          index={index}
                          setRefreshCard={setRefreshCard}
                        />
                      )
                    })
                  }
                  {provided.placeholder}
                </Box>
              )
            }
          }
          </Droppable>
        </DragDropContext>
      </div>
    </CardContext.Provider>
  )
}

export default DragDropContainer