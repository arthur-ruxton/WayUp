import React, { useState, useEffect } from 'react'
import { Grid, Item } from '@mui/material';

import { collection, where, query, onSnapshot } from '@firebase/firestore';
import { db } from '../../firebase/firebase';

import BranchCard from './BranchCard'

const BranchList = ({branchListProps, leafListProps, treeId}) => {

  // get and set list of trees
  const [branchList, setBranchList] = useState([])
  const [totalLeafList, setTotalLeafList] = useState([])

  useEffect(() => {
    setBranchList(JSON.parse(branchListProps))
    setTotalLeafList(JSON.parse(leafListProps))
  }, [])

  useEffect(() => {
    if(treeId){
      const collectionRef = collection(db, "Branches")

      const q = query(collectionRef, where("treeId", "==", treeId))

      const snap = onSnapshot(q, (querySnapshot) => {
        setBranchList(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      });
      return snap
    }
  }, [treeId])

  return (
    <>
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      {branchList.map(branch => (
       <Grid item key={branch.id}>
          <BranchCard 
          thisBranch={branch} 
          treeId={treeId}
          leafList={totalLeafList.filter(leaf => leaf.branchId === branch.id)}
          />
       </Grid>
      ))}
    </Grid>
  </>
  )
}

export default BranchList