import React, { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd-next';
import { Container, Box } from '@mui/material';

import ItemList from './ItemList'

const Card = ({card, itemMap, index}) => {
  
  const items = card.itemIds.map(itemId => itemMap.filter(item => item.id === itemId)[0])

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => {
        return (
          <Container 
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
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
            <h3>{card.text}</h3>
            
            <Droppable droppableId={card.id}>
              {(provided, snapshot) => {
                return (
                  <Box 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                    className={`drop-item ${snapshot.isDraggingOver?'drop-active':''}`}
                    sx={{flexGrow: 1, marginBottom: 3, padding: 3, borderRadius: 3}}
                  >
                    <ItemList items={items} />
                    {provided.placeholder}
                  </Box>
                )
              }}
            </Droppable>
          </Container>
        )
      }}
    </Draggable>
    )
  }

export default React.memo(Card)