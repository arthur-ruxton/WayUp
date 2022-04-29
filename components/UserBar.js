import React, { useEffect } from 'react'
import { useSession } from 'next-auth/client'
import { Container, Box, IconButton, Avatar, Typography } from '@mui/material'

import { signOut } from 'next-auth/client'

const UserBar = () => {
  let [session] = useSession()
  
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '1rem' }} mt={3}>
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