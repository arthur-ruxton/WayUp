import React, { useState } from 'react'

import { TextField, Button } from "@mui/material"

const TreeForm = () => {
  const [tree, setTree] = useState({title: '', favourite: false})

  const onChange = (e) => {
    const titleInput = e.target.value
    setTree({...tree, title: titleInput})
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(tree)}</pre> this saves us from using console.log super cool*/}
      <TextField 
      fullWidth
      label="title" 
      margin="normal"
      value={tree.title}
      onChange={onChange}
      />
      <Button variant="contained" sx={{ mt: 3 }}>
        New Tree
      </Button>
    </div>
  )
}

export default TreeForm