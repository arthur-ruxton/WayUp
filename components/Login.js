import React from 'react'
import { Button, Grid } from '@mui/material'
//import { signInWithPopup } from 'firebase/auth'
import { signInWithRedirect } from 'firebase/auth'

import { auth, provider } from '../firebase/firebase'
import { GoogleIcon } from '../assets/icons'

const Login = () => {

  const LoginWithGoogle = () => {
    signInWithRedirect(auth, provider)
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems='centre'
      justifyContent="center"
      style={{minHeight: '100vh', maxWidth: '120px', margin: 'auto'}}
    >
      <Button 
      variant="contained" 
      startIcon={<GoogleIcon/>}
      onClick={LoginWithGoogle}
      >Sign In</Button>
    </Grid>
  )
}

export default Login