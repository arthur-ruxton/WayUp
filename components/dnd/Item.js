import React from 'react'
import { Draggable } from 'react-beautiful-dnd-next';


import { ListItem, ListItemText, IconButton, Menu, MenuItem } from '@mui/material';

import { EditIcon, DeleteIcon, MoreVertIcon } from '../../assets/icons'
// import { db } from '../../firebase/firebase'

const Item = ({item, index}) => {
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
  // const onDelete = async(e) => {
  //   e.stopPropagation();
  //   const docRef = doc(db, "Items", thisItem.id)
  //   await deleteDoc(docRef)
  // }

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
                  <DeleteIcon/>
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