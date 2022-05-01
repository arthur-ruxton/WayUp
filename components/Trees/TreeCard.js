import React from 'react'
import { useRouter } from 'next/router'
import moment from "moment"
import { doc, deleteDoc, collection, query, where, getDocs } from '@firebase/firestore'
//import { ListItem, IconButton, ListItemText } from '@mui/material'
import { Card, CardContent, Typography, CardActions, IconButton } from '@mui/material'

import { DeleteIcon } from '../../assets/icons'
import { db } from '../../firebase/firebase'

const TreeCard = ({id, favourite, timestamp, title}) => {

  // deletes entire Trees (Projects)
  const onDelete = async(e) => {
    e.stopPropagation();
    const treeRef = doc(db, "Trees", id)
    await deleteDoc(treeRef)

    // create lists of branches and leaves related to this tree 
    const branchesRef = collection(db, "Branches")
    const branchesQ = query(branchesRef, where("treeId", "==", id))
    const branchesQuerySnapshot = await getDocs(branchesQ)
    let branchList = []
    branchesQuerySnapshot.forEach((doc) => {
      branchList.push({ ...doc.data(), id: doc.id })
    })

    const leavesRef = collection(db, "Leaves")
    const leavesQ = query(leavesRef, where("treeId", "==", id))
    const leavesQuerySnapshot = await getDocs(leavesQ)
    let leafList = []
    leavesQuerySnapshot.forEach((doc) => {
      leafList.push({ ...doc.data(), id: doc.id })
    })

    // from other collections, delete branches related to this tree
    const deleteChild = async(item, collection) => {
      const docRef = doc(db, collection, item.id)
      await deleteDoc(docRef)
    }
    branchList.forEach(branch => deleteChild(branch, "Branches"))
    leafList.forEach(leaf => deleteChild(leaf, "Leaves"))
  }

  // route to individual Tree page
  const router = useRouter()
  // follows route to Tree page using id
  const onExpand = (e) => {
    e.stopPropagation();
    router.push(`/trees/${id}`)
  }

  return (
    <>
      <Card 
        sx={{ minWidth: 275, mt: 3, boxShadow: 3 }}
        onClick={onExpand}
        style={{ backgroundColor: '#FAFAFA' }}
      >
        <CardContent>
        <Typography>
          {title}
        </Typography>
        <Typography>
          {moment(timestamp).format("DD MMMM, YYYY ")}
        </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton  onClick={e => onDelete(e)}>
            <DeleteIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </>
  )
}

export default TreeCard