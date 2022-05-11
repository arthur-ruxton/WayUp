import React, { useState, useEffect } from 'react'
import { getDocs, getDoc, doc, collection, query, where } from 'firebase/firestore'
import { Container, IconButton } from '@mui/material'

import { getSession } from 'next-auth/client'

// file system imports 
import { AddIcon } from '../../assets/icons'
import { db } from '../../firebase/firebase'
import BoardHeader from '../../components/Boards/BoardHeader'
import CardList from '../../components/Cards/CardList'
import NewDataForm from '../../components/NewDataForm'

const Contents = ({ boardProps, cardListProps, itemListProps }) => {
  const [currentBoard, setCurrentBoard] = useState({})
  const [showForm, setShowForm] = useState(false)

  const showNewForm = () => {
    setShowForm(true)
  }

  useEffect(() => {
    setCurrentBoard(JSON.parse(boardProps))
  }, [])

  return (
  <Container>
    <BoardHeader currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} />
    <CardList cardListProps={cardListProps} itemListProps={itemListProps} boardId={currentBoard.id}/>
    {
      showForm ? 
      <NewDataForm 
        setShowForm={setShowForm} 
        boardId={currentBoard.id}
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
  </Container>
  )
}

export default Contents

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

    const itemsRef = collection(db, "items")
    //const itemsQ = query(itemsRef, where("treeId", "==", id))
    const itemsQuerySnapshot = await getDocs(itemsRef)
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