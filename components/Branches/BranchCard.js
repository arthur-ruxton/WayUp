import React, { useState, useContext } from 'react'
import { doc, deleteDoc, updateDoc } from '@firebase/firestore'
import { Card, CardContent, Typography, CardActions, IconButton, TextField } from '@mui/material'

import { CheckIcon, CloseIcon, DeleteIcon, AddIcon } from '../../assets/icons'
import { db } from '../../firebase/firebase'
import { DataContext } from '../../pages/DataContext'
import LeafList from '../Leaves/LeafList'
// import LeafForm from '../Leaves/LeafForm'
import NewDataForm from '../../components/NewDataForm'

const BranchCard = ({thisBranch, leafList}) => {
  const [editing, setEditing] = useState()
  const [currentBranch, setCurrentBranch] = useState(thisBranch)
  const [showForm, setShowForm] = useState(false)

  const { newData, setNewData } = useContext(DataContext)

  const showNewForm = () => {
    setShowForm(true)
  }

   // functionality for editing the trees title.
   const onEditButtonClick = () => {
    setEditing(true)
  }
  const onTitleChange = (e) => {
    setNewData({...currentBranch, text: e.target.value})
  }
  const onSaveButtonClick = async() => {
    setEditing(false)
    const docRef = doc(db, "Branches", currentBranch.id)
    const updatedBranch = {...newData}
    setCurrentBranch(updatedBranch)
    await updateDoc(docRef, updatedBranch)
    setNewData({text: '', highlight: false})
  }
  const onCancleEdit = () => {
    setEditing(false)
    setNewData({text: '', highlight: false})
  }

   // deletes entire Trees (Projects)
   const onDelete = async(e) => {
    e.stopPropagation();
    const docRef = doc(db, "Branches", thisBranch.id)
    await deleteDoc(docRef)

    const deleteLeaf = async(leaf) => {
      const docRef = doc(db, "Leaves", leaf.id)
      await deleteDoc(docRef)
    }
    await leafList.forEach(leaf => deleteLeaf(leaf)) 
  }

  return (
    <>
    <Card 
      sx={{ minWidth: 275, mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: '#FAFAFA' }}
    >
      <CardContent>
        {
          !editing ?
          <Typography onClick={onEditButtonClick}>
            {currentBranch.text}
          </Typography> :
          (<>
            <TextField 
              id="outlined-basic" 
              label={currentBranch.text} 
              variant="outlined" 
              type='text' 
              onChange={onTitleChange}
            />
            <IconButton onClick={onSaveButtonClick}>
              <CheckIcon/>
            </IconButton>
            <IconButton onClick={onCancleEdit}>
              <CloseIcon/>
            </IconButton>
            </>)
        }
        <LeafList leafList={leafList} branchId={currentBranch.id} treeId={currentBranch.treeId}/>
        {
          showForm ? 
          <NewDataForm 
            setShowForm={setShowForm} 
            branchId={currentBranch.id}
            treeId={currentBranch.treeId}
            dataCollection="Leaves" 
            type="leaf" 
            maxLength={250}
          />
          :
          <IconButton 
            size="large"
            variant="outlined" 
            sx={{ mt: 3, alignItems: "center"}}
            onClick={showNewForm}
          >
            <AddIcon />
          </IconButton>
        }
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

export default BranchCard