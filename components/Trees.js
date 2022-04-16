import React, { useState, useEffect } from 'react'

import { collection, query, orderBy, onSnapshot } from '@firebase/firestore';

import { db } from '../firebase/firebase';

const Trees = () => {
  const [trees, setTrees] = useState([])

  useEffect(() => {
    const collectionRef = collection(db, "Trees")

    const q = query(collectionRef, orderBy("timestamp", "desc"))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTrees(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })))
    });
    return unsubscribe
  }, [])

  console.log('trees', trees)

  return (
    <div>
      {trees.map(tree => <div key={tree.id}>{tree.title}</div>)}
    </div>
  )
}

export default Trees