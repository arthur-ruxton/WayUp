import React, { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd-next';
import { Box, Card, CardHeader, IconButton } from '@mui/material';

import { DragHandleIcon } from '../../assets/icons'
import ItemList from './ItemList'

const SingleCard = ({card, itemMap, index}) => {
  
  const items = card.itemIds.map(itemId => itemMap.filter(item => item.id === itemId)[0])

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => {
        return (
          <Card 
            ref={provided.innerRef}
            {...provided.draggableProps}
            type="item-list"
            sx={{margin: 1,
             minWidth: 275, 
             padding: 0, 
             border:1, 
             borderColor: "gray",
             borderRadius: 3, 
             backgroundColor: 'white', 
             boxShadow: 3}}
          >
            <CardHeader
            titleTypographyProps={{variant:'h6' }}
            title={card.text} 
            action={
              <DragHandleIcon 
              {...provided.dragHandleProps}
              sx={{ fontSize: "2rem", color: "#808080"}}
              />
            }
            />
            <Droppable droppableId={card.id}>
              {(provided, snapshot) => {
                return (
                  <Box 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                    className={`drop-item ${snapshot.isDraggingOver?'drop-active':''}`}
                    sx={{flexGrow: 1, marginBottom: 3, margin: 1, padding: 1, borderRadius: 3}}
                  >
                    <ItemList items={items} />
                    {provided.placeholder}
                  </Box>
                )
              }}
            </Droppable>
          </Card>
        )
      }}
    </Draggable>
    )
  }

export default React.memo(SingleCard)