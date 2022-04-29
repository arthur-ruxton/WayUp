import React, { useState, useEffect } from 'react'
import { getDocs, getDoc, doc, collection, query, where } from 'firebase/firestore'
import { Container, Button } from '@mui/material'

import { getSession } from 'next-auth/client'

// file system imports 
import { db } from '../../firebase/firebase'
import TreeHeader from '../../components/Trees/TreeHeader'
import BranchList from '../../components/Branches/BranchList'
import BranchForm from '../../components/Branches/BranchForm'

const Contents = ({ treeProps, branchListProps, leafListProps }) => {
  const [currentTree, setCurrentTree] = useState({})
  const [showBranchForm, setShowBranchForm] = useState(false)

  const showNewBranchForm = () => {
    setShowBranchForm(true)
  }

  useEffect(() => {
    setCurrentTree(JSON.parse(treeProps))
  }, [])

  return (
  <Container>
    <TreeHeader currentTree={currentTree} setCurrentTree={setCurrentTree} />
    <BranchList branchListProps={branchListProps} leafListProps={leafListProps} treeId={currentTree.id}/>
    {
      showBranchForm ? <BranchForm setShowBranchForm={setShowBranchForm} treeId={currentTree.id}/> :
      <Button 
        variant="contained" 
        sx={{ mt: 3 }}
        onClick={showNewBranchForm}
      >
        New Branch
      </Button>
    }
  </Container>
  )
}

export default Contents

// getServerSideProps allows server side rendering, I'm not super clear on the difference this makes.
  export const getServerSideProps = async (context) => {

    const session = await getSession(context)

    if(!session){
      return {
        redirect: {
          destination: '/api/auth/signin',
          permanent: false,
        }
      }
    }

    const id = context.params.id
  
    const docRef = doc(db, 'Trees', id)
    const docSnap = await getDoc(docRef)

    const branchesRef = collection(db, "Branches")
    const branchesQ = query(branchesRef, where("treeId", "==", id))
    const branchesQuerySnapshot = await getDocs(branchesQ)
    let branchList = []
    branchesQuerySnapshot.forEach((doc) => {
      branchList.push({ ...doc.data(), id: doc.id })
    })
    //console.log('branch list', branchList)

    const leavesRef = collection(db, "Leaves")
    //const leavesQ = query(leavesRef, where("treeId", "==", id))
    const leavesQuerySnapshot = await getDocs(leavesRef)
    let leafList = []
    leavesQuerySnapshot.forEach((doc) => {
      leafList.push({ ...doc.data(), id: doc.id })
    })
    // console.log('leaf list server side', leafList)
  
    return {
      props: { 
        session,
        treeProps: JSON.stringify({ ...docSnap.data(), id: docSnap.id, timestamp: docSnap.data().timestamp?.toDate().getTime() }) || null,
        branchListProps: JSON.stringify(branchList) || [],
        leafListProps: JSON.stringify(leafList) || [],
      },
    }
  }