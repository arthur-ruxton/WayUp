import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import { Grid } from '@mui/material';

import { collection, where, query, orderBy, onSnapshot } from '@firebase/firestore';
import { db } from '../../firebase/firebase';

import BoardCard from './BoardCard'

const BoardList = ({boardListProps}) => {

  const [session] = useSession()
  const email = session.user.email

  // get and set list of boards
  const [boardList, setBoardList] = useState([])

  useEffect(() => {
    setBoardList(JSON.parse(boardListProps))
  }, [])

  useEffect(() => {
    const collectionRef = collection(db, "Boards")

    const q = query(collectionRef, where("email", "==", email), orderBy("timestamp", "desc"))

    const snap = onSnapshot(q, (querySnapshot) => {
      setBoardList(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })))
    });
    return snap
  }, [])

  return (
    <>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        {boardList.map(board => (
         <Grid item key={board.id}>
            <BoardCard
            id={board.id} 
            favourite={board.favourite} 
            timestamp={board.timestamp} 
            text={board.text}
            />
         </Grid>
        ))}
      </Grid>
    </>
  )
}

export default BoardList