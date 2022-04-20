import { useState} from 'react'
import '../styles/globals.css'

import { AuthProvider } from '../Auth'
import { TreeContext } from './TreeContext'

function MyApp({ Component, pageProps }) {
  const [newTreeData, setNewTreeData] = useState({title: '', favourite: false})

  return (
  <AuthProvider>
    <TreeContext.Provider value={{ newTreeData, setNewTreeData }}>
    <Component {...pageProps} />
  </TreeContext.Provider>
  </AuthProvider>
  )
}

export default MyApp
