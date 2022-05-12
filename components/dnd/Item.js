import React, { useState} from 'react'
import { Draggable } from 'react-beautiful-dnd-next';

import DragHandleIcon from '@mui/icons-material/DragHandle';
import { ListItem, ListItemText } from '@mui/material';

const Item = ({item, index}) => {

  const isDragDisabled = item.id === 'item-1';

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
      /*-- use is dragging property from snapshot to add class and style during drag --*/
        className={`drag-item ${snapshot.isDragging?'drag-active':''} ${isDragDisabled?'drag-disabled':''}`}
        sx={{marginBottom: 1, color: 'GrayText', borderRadius: 1, backgroundColor:"white", boxShadow: 3}}
        >
          <ListItemText primary={item.content} />
          {/* - disabled items have no drag handle icon - */}
          { !isDragDisabled ? 
            <div {...provided.dragHandleProps}>
              <DragHandleIcon />
            </div>:
            <></>
          }
        </ListItem>
        )
      }}
    </Draggable>
  )
}

export default React.memo(Item)