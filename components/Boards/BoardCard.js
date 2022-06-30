import React from 'react'
import { useRouter } from 'next/router' // React hook for routing
import moment from "moment" // this is a firebase package for working with timestamps
import { doc, deleteDoc, collection, query, where, getDocs } from '@firebase/firestore' // fb methods
//import { ListItem, IconButton, ListItemText } from '@mui/material'
import { Card, CardContent, Typography, CardActions, IconButton } from '@mui/material' // MUI comps

import { DeleteIcon } from '../../assets/icons'
import { db } from '../../firebase/firebase'

const BoardCard = ({id, favourite, timestamp, text}) => {

  // deletes entire Board (Projects)
  const onDelete = async(e) => {
    e.stopPropagation();
    const boardRef = doc(db, "Boards", id)
    await deleteDoc(boardRef)

    // create lists of cards and leaves (items) related to this tree using id from props
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

    // from other collections, delete data related to this tree
    // this function takes and item to be deleted and a collection from which it will be deleted
    const deleteChild = async(item, collection) => {
      const docRef = doc(db, collection, item.id)
      await deleteDoc(docRef)
    }
    // cardList and itemList contain data related to this tree
    // forEach we call the deleteChild function (nifty trick)
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

  // MUI provides us with a card component, useful when in a rush
  // here I simply populate this component with data from my fb database, standard stuff really
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