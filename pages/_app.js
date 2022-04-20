import { useState} from 'react'
import '../styles/globals.css'

import { TreeContext } from './TreeContext'

function MyApp({ Component, pageProps }) {
  const [newTreeData, setNewTreeData] = useState({title: '', favourite: false})

  return (
  <TreeContext.Provider value={{ newTreeData, setNewTreeData }}>
    <Component {...pageProps} />
  </TreeContext.Provider>
  )
}

export default MyApp
