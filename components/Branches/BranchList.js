import React, { useState, useEffect } from 'react'

import { collection, where, query, onSnapshot } from '@firebase/firestore';
import { db } from '../../firebase/firebase';

// import BranchCard from './BranchCard'

const BranchList = ({branchListProps}) => {

  // get and set list of trees
  const [branchList, setBranchList] = useState([])

  useEffect(() => {
    setBranchList(JSON.parse(branchListProps))
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
          <li key={branch.id}>
            <h1>{branch.title} hello world</h1>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BranchList