import { createContext, useContext, useState, useEffect } from 'react'

import { getAuth, updateCurrentUser } from 'firebase/auth'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

    const [updateCurrentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    return auth.onIdTokenChanged(async(user) => {
      if(!user){
        console.log('no user')
        setCurrentUser(null)
        setLoading(false)
        return
      } 
      const token = await user.getIdToken();
      setCurrentUser(user)
      setLoading(false)
      console.log('token:', token, )
      console.log('user:', user, )
    })
  }, [])

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)