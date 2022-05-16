import React, { useContext } from 'react'
import { useSession } from 'next-auth/client'
import { collection, doc, addDoc, updateDoc, serverTimestamp} from '@firebase/firestore' // firebase methods 
import { TextField, Button } from "@mui/material" // mui components

import { db } from '../firebase/firebase'
import { DataContext } from '../pages/DataContext' // reusable new data object 
import { BoardContext } from '../pages/boards/BoardContext'
import { AddIcon, CloseIcon } from "../assets/icons" // mui icons from my file system

const NewDataForm = ({
  setShowForm,
  dataCollection,
  type,
  maxLength
}) => {

  const { currentBoard, setRefresh } = useContext(BoardContext)

  const [session] = useSession() // next-auth cookies method
  const email = session.user.email 

  const { newData, setNewData } = useContext(DataContext) // reusable object from context

  const onChange = (e) => {
    const textInput = e.target.value
    setNewData({...newData, text: textInput})
  }

  // firebase crud methods -> here we add data (addDoc) to the db
  const onSubmit = async () => {

    setShowForm(false)
    const collectionRef = collection(db, dataCollection)

    let docRef;
    switch (type) {
      case "board":
        docRef = await addDoc(collectionRef, {...newData, cardsOrder: [], email: email, timestamp: serverTimestamp()});
        break;
      case "card":
        // create a unique id
        // const newId = `${currentBoard.cardsOrder.length + 1}`
        // add the new card
        docRef = await addDoc(collectionRef, {...newData, itemIds: [], boardId: currentBoard.id});
        // create new cardsOrder array with newId added
        const newCardsOrder = [...currentBoard.cardsOrder, docRef.id]
        // create new board with updated cardsOrder
        const updatedBoard = {
          ...currentBoard,
          cardsOrder: newCardsOrder,
          timestamp: serverTimestamp()
        }
        // reference current board in db
        const boardRef = doc(db, "Boards", currentBoard.id)
        // update current board in db with new cardsOrder
        await updateDoc(boardRef, updatedBoard)
        // cause board page to refresh
        break;
      case "item":
        docRef = await addDoc(collectionRef, {...newData, boardId: currentBoard.id});
        break;
    }
    setNewData({text: '', highlight: false})
    setRefresh(true)
  }

  // simply abort the crud opx
  const onCancle = () => {
    setShowForm(false)
  }

  return (
    <div>
      <TextField 
        fullWidth
        label="title" 
        margin="normal"
        value={newData.title}
        inputProps={{maxLength: maxLength}}
        onChange={onChange}
      />
      <Button 
        variant="contained" 
        sx={{ mt: 3 }}
        onClick={onSubmit}
      >
      <AddIcon />
      </Button>
      <Button 
        variant="contained" 
        sx={{ mt: 3 }}
        onClick={onCancle}
      >
      <CloseIcon />
      </Button>
    </div>
  )
}

export default NewDataForm