import React from 'react'
import { ListItem, ListItemText } from '@mui/material'

import moment from "moment"

const Tree = ({id, favourite, timestamp, title}) => {
  return (
    <ListItem
      sx={{ mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: '#FAFAFA' }}
    >
      <ListItemText
        primary={title}
        secondary={moment(timestamp).format("MMMM do, yyyy")}
      />
    </ListItem>
  )
}

export default Tree