import React, { useState} from 'react'
import { Draggable } from 'react-beautiful-dnd-next';

import { ListItem, ListItemText } from '@mui/material';

const Item = ({item, index}) => {

  const isDragDisabled = item.text === 'disable this item';

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
        </ListItem>
        )
      }}
    </Draggable>
  )
}

export default React.memo(Item)