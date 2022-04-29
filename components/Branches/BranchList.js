import React, { useState, useEffect } from 'react'
import { Grid, Item } from '@mui/material';

// import { collection, where, query, onSnapshot } from '@firebase/firestore';
// import { db } from '../../firebase/firebase';

import BranchCard from './BranchCard'

const BranchList = ({branchListProps}) => {

  // get and set list of trees
  const [branchList, setBranchList] = useState([])

  useEffect(() => {
    setBranchList(JSON.parse(branchListProps))
  }, [])
 

  return (
    <>
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      {branchList.map(branch => (
       <Grid item key={branch.id}>
          <BranchCard
          key={branch.id} 
          id={branch.id} 
          favourite={branch.favourite} 
          timestamp={branch.timestamp} 
          title={branch.title}
          />
       </Grid>
      ))}
    </Grid>
  </>
  )
}

export default BranchList