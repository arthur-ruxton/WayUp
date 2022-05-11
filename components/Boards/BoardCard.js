import React from 'react'
import { useRouter } from 'next/router'
import moment from "moment"
import { doc, deleteDoc, collection, query, where, getDocs } from '@firebase/firestore'
//import { ListItem, IconButton, ListItemText } from '@mui/material'
import { Card, CardContent, Typography, CardActions, IconButton } from '@mui/material'

import { DeleteIcon } from '../../assets/icons'
import { db } from '../../firebase/firebase'

const BoardCard = ({id, favourite, timestamp, text}) => {

  // deletes entire Board (Projects)
  const onDelete = async(e) => {
    e.stopPropagation();
    const boardRef = doc(db, "Boards", id)
    await deleteDoc(boardRef)

    // create lists of cards and leaves related to this tree 
    const cardsRef = collection(db, "Cards")
    const cardsQ = query(cardsRef, where("boardId", "==", id))
    const cardsQuerySnapshot = await getDocs(cardsQ)
    let cardList = []
    cardsQuerySnapshot.forEach((doc) => {
      cardList.push({ ...doc.data(), id: doc.id })
    })

    const itemsRef = collection(db, "Items")
    const itemsQ = query(itemsRef, where("boardId", "==", id))
    const itemsQuerySnapshot = await getDocs(itemsQ)
    let itemList = []
    itemsQuerySnapshot.forEach((doc) => {
      itemList.push({ ...doc.data(), id: doc.id })
    })

    // from other collections, delete branches related to this tree
    const deleteChild = async(item, collection) => {
      const docRef = doc(db, collection, item.id)
      await deleteDoc(docRef)
    }
    cardList.forEach(card => deleteChild(card, "Cards"))
    itemList.forEach(item => deleteChild(item, "Items"))
  }

  // route to individual Tree page
  const router = useRouter()
  // follows route to Tree page using id
  const onExpand = (e) => {
    e.stopPropagation();
    router.push(`/boards/${id}`)
  }

  return (
    <>
      <Card 
        sx={{ minWidth: 275, mt: 3, boxShadow: 3 }}
        onClick={onExpand}
        style={{ backgroundColor: '#FAFAFA' }}
      >
        <CardContent>
        <Typography variant='h5'>
          {text}
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

export default BoardCard