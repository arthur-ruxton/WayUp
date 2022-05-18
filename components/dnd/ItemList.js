import React from 'react'

import { List } from '@mui/material';

import Item from './Item'

const ItemList = ({items, currentCard}) => {

  return (
  <List>
    {items.map((item, index) => <Item key={item.id} item={item} index={index} currentCard={currentCard}/>)}
  </List>
  )
}

export default React.memo(ItemList)