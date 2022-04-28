import React, { useState, useEffect } from 'react'

import { collection, where, query, onSnapshot } from '@firebase/firestore';
import { db } from '../../firebase/firebase';

// import BranchCard from './BranchCard'

const BranchList = ({treeId}) => {

  // get and set list of trees
  const [branchList, setBranchList] = useState([])

  useEffect(() => {
    const collectionRef = collection(db, "Branches")

    const q = query(collectionRef, where("treeId", "==", treeId))

    const snap = onSnapshot(q, (querySnapshot) => {
      setBranchList(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    });
    return snap
  }, [])

  return (
    <div>
      <ul>
        {branchList.map(branch => (
          // <BranchCard
          //   key={branch.id} 
          //   id={branch.id} 
          //   favourite={branch.favourite} 
          //   timestamp={branch.timestamp} 
          //   title={branch.title}
          //   />
          <li key={branch.id}>{branch.title} hello world</li>
        ))}
      </ul>
    </div>
  )
}

export default BranchList