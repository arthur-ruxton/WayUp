import React from 'react'

import { List } from '@mui/material';

import Item from './Item'

const ItemList = ({items}) => {

  console.log('item list on item list component', items)
  return (
  <List>
    {items.map((item, index) => <Item key={item.id} item={item} index={index}/>)}
  </List>
  )
}

export default React.memo(ItemList)