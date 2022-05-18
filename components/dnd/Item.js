import React, { useContext } from 'react'
import { Draggable } from 'react-beautiful-dnd-next';
import { doc, deleteDoc, updateDoc } from '@firebase/firestore'

import { ListItem, ListItemText, IconButton, Menu, MenuItem } from '@mui/material';

import { EditIcon, DeleteIcon, MoreVertIcon } from '../../assets/icons'
import { db } from '../../firebase/firebase'
import { CardContext } from '../../pages/boards/CardContext'

const Item = ({item, index, currentCard}) => {
  const { setRefreshCard } = useContext(CardContext)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isDragDisabled = item.text === 'disable this item';

  // deletes entire Item (list items / tasks)
  const onDelete = async(e) => {
    e.stopPropagation();
    // delete item from itemIds array on the card 
    const newItemIds = Array.from(currentCard.itemIds)
    const itemIndex = newItemIds.indexOf(item)
    newItemIds.splice(itemIndex, 1)
    const updatedData = {
      ...currentCard,
      itemIds: newItemIds
    }
    const updateCardData = async () => {
      const docRef = doc(db, "Cards", currentCard.id)
      await updateDoc(docRef, updatedData)
    }
    updateCardData()
    // delete the item from the db
    const docRef = doc(db, "Items", item.id)
    await deleteDoc(docRef)
    // may have to then cause card refresh
    setRefreshCard("refresh card")
  }

  return (
    <Draggable 
    draggableId={item.id} 
    index={index}
    isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => {
        return (
          <ListItem 
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          /*-- use is dragging property from snapshot to add class and style during drag --*/
            className={`${snapshot.isDragging?'drag-active':''} ${isDragDisabled?'drag-disabled':'drag-item'}`}
            sx={{
              gap:'1rem',
              width: "full",
              marginBottom: 1,
              color: "GrayText", 
              border: 1, 
              borderColor: "gray", 
              borderRadius: 1, 
              backgroundColor:"white"
            }}
          >
          <ListItemText primary={item.text} />
          <div>
            <IconButton
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon/>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>
                <IconButton>
                  <DeleteIcon onClick={onDelete}/>
                </IconButton>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <IconButton>
                  <EditIcon/>
                </IconButton>
              </MenuItem>
            </Menu>
          </div>
        </ListItem>
        )
      }}
    </Draggable>
  )
}

export default React.memo(Item)