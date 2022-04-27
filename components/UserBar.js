import React from 'react'
import { useSession } from 'next-auth/client'
import { Container, Box, IconButton, Avatar, Typography } from '@mui/material'

import { signOut } from 'next-auth/client'

const UserBar = () => {
  const [session, loading] = useSession()
  
  return (
    <Container maxWidth='xs'>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mt={3}>
        <IconButton onClick={e => {
            e.preventDefault()
            signOut()
          }}>
          <Avatar src={session.user.image} />
        </IconButton>
        <Typography variant='h5'>
          {session.user.name}
        </Typography>
      </Box>
    </Container>
  )
}

export default UserBar