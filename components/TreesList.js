import React, { useState, useEffect } from 'react'

import { collection, getDocs, query, orderBy, onSnapshot } from '@firebase/firestore';
import { db } from '../firebase/firebase';

import TreeCard from './TreeCard'

const TreesList = () => {
  // get and set list of trees
  const [treesList, setTreesList] = useState([])

  useEffect(() => {
    const collectionRef = collection(db, "Trees")

    const q = query(collectionRef, orderBy("timestamp", "desc"))

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