import React, { useState, useEffect } from 'react'
import { Grid, Item } from '@mui/material';

import { collection, where, query, onSnapshot } from '@firebase/firestore';
import { db } from '../../firebase/firebase';

import SingleCard from './SingleCard'

const CardList = ({cardListProps, itemListProps, boardId}) => {

  // get and set list of cards
  const [cardList, setCardList] = useState([])
  const [totalItemList, setTotalItemList] = useState([])

  useEffect(() => {
    setCardList(JSON.parse(cardListProps))
    setTotalItemList(JSON.parse(itemListProps))
  }, [])

  useEffect(() => {
    if(boardId){
      const collectionRef = collection(db, "Cards")

      const q = query(collectionRef, where("boardId", "==", boardId))

      const snap = onSnapshot(q, (querySnapshot) => {
        setCardList(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      });
      return snap
    }
  }, [boardId])

  return (
    <>
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      {cardList.map(card => (
       <Grid item key={card.id}>
          <SingleCard 
          thisCard={card} 
          boardId={boardId}
          itemList={totalItemList.filter(item => item.cardId === card.id)}
          />
       </Grid>
      ))}
    </Grid>
  </>
  )
}

export default CardList