import { useEffect } from 'react'
import Leaf from './Leaf'

const LeafList = ({ leafList }) => {

  // useEffect(() => {
  //   const collectionRef = collection(db, "Leaves")

  //   const q = query(collectionRef, where("branchId", "==", branchId))

  //   const snap = onSnapshot(q, (querySnapshot) => {
  //     setLeafList(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  //   });
  //   return snap
  // }, [])
  console.log('leaf list', leafList)

  return (
    <div>
      {leafList.map(leaf => (
        <Leaf
          key={leaf.id} 
          thisLeaf={leaf}
          />
      ))}
    </div>
  )
}

export default LeafList