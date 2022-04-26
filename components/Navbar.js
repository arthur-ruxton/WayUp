import React, { useState } from 'react'
import Link from '@mui/material/Link';

import { signOut } from 'next-auth/client'

const Navbar = () => {
  
  return (
    <nav>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link 
          href='/api/auth/signout' 
          onClick={e => {
            e.preventDefault()
            signOut()
          }}
          >Sign Out</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar