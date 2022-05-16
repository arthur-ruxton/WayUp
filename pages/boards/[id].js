import React, { useState, useEffect } from 'react'
import { getDocs, getDoc, doc, collection, query, where } from 'firebase/firestore'
import { Box, IconButton } from '@mui/material'

import { getSession } from 'next-auth/client'

// file system imports 
import { BoardContext } from './BoardContext'
import { AddIcon } from '../../assets/icons'
import { db } from '../../firebase/firebase'
import DragDropContainer from '../../components/dnd/DragDropContainer'
import BoardHeader from '../../components/Boards/BoardHeader'
import NewDataForm from '../../components/NewDataForm'

export default function Home({boardProps, cardListProps, itemListProps}) {
  const [currentBoard, setCurrentBoard] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [refresh, setRefresh] = useState('page load')

  const showNewForm = () => {
    setShowForm(true)
  }
 
  useEffect(() => {
    if(refresh === 'page load'){
      setCurrentBoard(JSON.parse(boardProps))
    }
    if(refresh === true){
      const updateBoardData = async () => {
        const boardDocRef = doc(db, 'Boards', currentBoard.id)
        const docSnap = await getDoc(boardDocRef)
        const updatedBoardProps = 
        JSON.stringify({ ...docSnap.data(), id: docSnap.id, timestamp: docSnap.data().timestamp?.toDate().getTime() }) || null
        setCurrentBoard(JSON.parse(updatedBoardProps))
      }
      updateBoardData()
    }
    setRefresh(false)
  }, [refresh])

  return (
    <BoardContext.Provider value={{currentBoard, setCurrentBoard, refresh, setRefresh}}>
      <div className="board-page">
        <BoardHeader />
        <DragDropContainer 
        boardProps={boardProps} 
        cardListProps={cardListProps} 
        itemListProps={itemListProps}
        />
        <Box>
        {
          showForm ? 
          <NewDataForm
            setShowForm={setShowForm} 
            dataCollection="Cards" 
            type="card" 
            maxLength={26}
          />
          :
          <IconButton 
            variant="contained" 
            sx={{ mt: 3 }}
            onClick={showNewForm}
          >
            <AddIcon />
          </IconButton>
        }
        </Box>
      </div>
    </BoardContext.Provider>
  )
}

// getServerSideProps allows server side rendering, I'm not super clear on the difference this makes.
export const getServerSideProps = async (context) => {

  const session = await getSession(context)

  if(!session){
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      }
    }
  }

  const id = context.params.id

  const docRef = doc(db, 'Boards', id)
  const docSnap = await getDoc(docRef)

  const cardsRef = collection(db, "Cards")
  const cardsQ = query(cardsRef, where("boardId", "==", id))
  const cardsQuerySnapshot = await getDocs(cardsQ)
  let cardList = []
  cardsQuerySnapshot.forEach((doc) => {
    cardList.push({ ...doc.data(), id: doc.id })
  })

  const itemsRef = collection(db, "Items")
  const itemsQ = query(itemsRef, where("boardId", "==", id))
  const itemsQuerySnapshot = await getDocs(itemsQ)
  let itemList = []
  itemsQuerySnapshot.forEach((doc) => {
    itemList.push({ ...doc.data(), id: doc.id })
  })

  return {
    props: { 
      session,
      boardProps: JSON.stringify({ ...docSnap.data(), id: docSnap.id, timestamp: docSnap.data().timestamp?.toDate().getTime() }) || null,
      cardListProps: cardList || [],
      itemListProps: itemList || [],
    },
  }
}