import React, { useState, useContext } from 'react'
import { getDocs, getDoc, doc, collection, updateDoc, serverTimestamp } from 'firebase/firestore'
import { IconButton } from '@mui/material'
import moment from 'moment'

// imports from project files including icons
import { db } from '../../firebase/firebase'
import { TreeContext } from '../../pages/TreeContext'
import { CheckIcon, CloseIcon, StarIcon, StarOutlineIcon, HomeIcon } from '../../assets/icons'

const Contents = ({ treeProps }) => {
  const [currentTree, setCurrentTree] = useState(JSON.parse(treeProps))
  const [editing, setEditing] = useState(false)

  // use context because this object used on different pages
  const { newTreeData, setNewTreeData } = useContext(TreeContext)

  // functionality for editing the trees title.
  const onEditButtonClick = () => {
    setEditing(true)
  }
  const onTitleChange = (e) => {
    setNewTreeData({...currentTree, title: e.target.value})
  }
  const onSaveButtonClick = async() => {
    setEditing(false)
    const docRef = doc(db, "Trees", currentTree.id)
    const updatedTree = { ...newTreeData, timestamp: serverTimestamp()}
    setCurrentTree(updatedTree)
    await updateDoc(docRef, updatedTree)
    setNewTreeData({title: '', favourite: false})
  }
  const onCancleEdit = () => {
    setEditing(false)
    setNewTreeData({title: '', favourite: false})
  }

  return (
  <div>
    {!editing ?
    <h2 onClick={onEditButtonClick}>
      {currentTree.title}  
    </h2> :
    (<>
      <input placeholder={currentTree.title} type='text' onChange={onTitleChange}/>
      <IconButton onClick={onSaveButtonClick}>
        <CheckIcon/>
      </IconButton>
      <IconButton onClick={onCancleEdit}>
        <CloseIcon/>
      </IconButton>
      </>)
    }
    {!currentTree.favourite ? 
      <IconButton>
        <StarOutlineIcon/>
      </IconButton>
       : 
      <IconButton>
        <StarIcon/>
      </IconButton>
    }
    <IconButton href="/">
      <HomeIcon/>
    </IconButton>
    <p>
      {moment(currentTree.timestamp).format("DD MMMM, YYYY ")}
    </p>
  </div>
  )
}

export default Contents


// NEXT.js system for statically generating the routes for every item in the dp during build process//
 export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, 'Trees'))
  const paths = snapshot.docs.map(doc => {
    return {
      params: { id: doc.id.toString() }
    }
  })

  return {
    paths,
    fallback: false
  }
}


// NEXT.js system for statically generating the pages for every item in the dp during build process//
export const getStaticProps = async (context) => {
  const id = context.params.id

  const docRef = doc(db, 'Trees', id)
  const docSnap = await getDoc(docRef)

  return {
    props: { treeProps: JSON.stringify({ ...docSnap.data(), id: docSnap.id, timestamp: docSnap.data().timestamp?.toDate().getTime() }) || null}
  }
}

// getServerSideProps allows server side rendering, I'm not super clear on the difference this makes.
    // export const getServerSideProps = async (context) => {
    //   const id = context.params.id
    
    //   const docRef = doc(db, 'Trees', id)
    //   const docSnap = await getDoc(docRef)
    
    //   return {
    //     props: { treeProps: JSON.stringify({ ...docSnap.data(), id: docSnap.id, timestamp: docSnap.data().timestamp?.toDate().getTime() }) || null}
    //   }
    // }