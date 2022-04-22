import React, { useState, useEffect } from 'react'

import { collection, where, query, orderBy, onSnapshot } from '@firebase/firestore';
import { db } from '../firebase/firebase';

import { useAuth } from '../Auth'
import TreeCard from './TreeCard'

const TreesList = (treeListProps) => {
  const { currentUser } = useAuth();

  // get and set list of trees
  const [treesList, setTreesList] = useState([])

  // useEffect(() => {
  //   setTreesList(JSON.parse(treeListProps))
  // }, [])

  useEffect(() => {
    const collectionRef = collection(db, "Trees")

    const q = query(collectionRef, where("email", "==", currentUser?.email), orderBy("timestamp", "desc"))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTreesList(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })))
    });
    return unsubscribe
  }, [])

  return (
    <div>
      {treesList.map(tree => (
        <TreeCard
          key={tree.id} 
          id={tree.id} 
          favourite={tree.favourite} 
          timestamp={tree.timestamp} 
          title={tree.title}
          />
      ))}
    </div>
  )
}

export default TreesList