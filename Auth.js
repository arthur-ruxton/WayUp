import { createContext, useContext, useState, useEffect } from 'react'
import 'firebase/auth';
import { getAuth } from 'firebase/auth'

import nookies from 'nookies'

const AuthContext = createContext({})

import Login from './components/Login'
import Loading from './components/Loading'

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    return auth.onIdTokenChanged(async(user) => {
      if(!user){
        console.log('no user')
        setCurrentUser(null)
        setLoading(false)
        nookies.set(null, "token", "", {sameSite: 'lax'})
        return
      } 
      const token = await user.getIdToken();
      setCurrentUser(user)
      setLoading(false)
      nookies.set(null, "token", token, {sameSite: 'lax'})
      // here we have logged the token, establishing that we CAN get it. 
      // this works -> console.log('token:', token, )
      // console.log('user:', user, )
    })
  }, [])

  if(loading) {
    return <Loading type='spinningBubbles' color='yellowgreen'/>
  }
  if(!currentUser) {
    return <Login />
  } else {
    return (
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    )
  }
}

export const useAuth = () => useContext(AuthContext)