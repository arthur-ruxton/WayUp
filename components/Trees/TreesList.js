import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import { Grid } from '@mui/material';

import { collection, where, query, orderBy, onSnapshot } from '@firebase/firestore';
import { db } from '../../firebase/firebase';

import TreeCard from './TreeCard'

const TreesList = ({treeListProps}) => {

  const [session] = useSession()
  const email = session.user.email

  // get and set list of trees
  const [treesList, setTreesList] = useState([])

  useEffect(() => {
    setTreesList(JSON.parse(treeListProps))
  }, [])

  useEffect(() => {
    const collectionRef = collection(db, "Trees")

    const q = query(collectionRef, where("email", "==", email), orderBy("timestamp", "desc"))

    const snap = onSnapshot(q, (querySnapshot) => {
      setTreesList(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })))
    });
    return snap
  }, [])

  return (
    <>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        {treesList.map(tree => (
         <Grid item key={tree.id}>
            <TreeCard
            id={tree.id} 
            favourite={tree.favourite} 
            timestamp={tree.timestamp} 
            text={tree.text}
            />
         </Grid>
        ))}
      </Grid>
    </>
  )
}

export default TreesList