import { useEffect, useState } from 'react'

import { collection, where, query, onSnapshot } from '@firebase/firestore';
import { db } from '../../firebase/firebase';

import Leaf from './Leaf'

const LeafList = ({ leafList, branchId, treeId }) => {
  const [oneLeafList, setOneLeafList] = useState(leafList)

  useEffect(() => {
    const collectionRef = collection(db, "Leaves")

    const q = query(collectionRef, where("branchId", "==", branchId))

    const snap = onSnapshot(q, (querySnapshot) => {
      setOneLeafList(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    });
    return snap
  }, [])

  console.log('leaf list', leafList)

  return (
    <div>
      {oneLeafList.map(leaf => (
        <Leaf
          key={leaf.id} 
          thisLeaf={leaf}
          branchId={branchId}
          treeId={treeId}
          />
      ))}
    </div>
  )
}

export default LeafList