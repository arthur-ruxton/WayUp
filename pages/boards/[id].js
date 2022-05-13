import React, { useState, useEffect } from 'react'
import { getDocs, getDoc, doc, collection, query, where } from 'firebase/firestore'
import Container from '@mui/material/Container';

import { getSession } from 'next-auth/client'

import { db } from '../../firebase/firebase'
import DragDropContainer from '../../components/dnd/DragDropContainer'
// import { initialBoardData } from '../../initial-data'
import BoardHeader from '../../components/Boards/BoardHeader'

export default function Home({boardProps, cardListProps, itemListProps}) {
  const [currentBoard, setCurrentBoard] = useState({})

  useEffect(() => {
    setCurrentBoard(JSON.parse(boardProps))
  }, [])

  return (
    <Container  sx={{display:'flex', flexDirection:"column",  maxWidth:"full"}}>
      <BoardHeader currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} />
      <DragDropContainer boardProps={boardProps} cardListProps={cardListProps} itemListProps={itemListProps}/>
    </Container>
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
  //console.log('card list', cardList)

  const itemsRef = collection(db, "Items")
  const itemsQ = query(itemsRef, where("boardId", "==", id))
  const itemsQuerySnapshot = await getDocs(itemsQ)
  let itemList = []
  itemsQuerySnapshot.forEach((doc) => {
    itemList.push({ ...doc.data(), id: doc.id })
  })
  // console.log('item list server side', itemList)

  return {
    props: { 
      session,
      boardProps: JSON.stringify({ ...docSnap.data(), id: docSnap.id, timestamp: docSnap.data().timestamp?.toDate().getTime() }) || null,
      cardListProps: JSON.stringify(cardList) || [],
      itemListProps: JSON.stringify(itemList) || [],
    },
  }
}