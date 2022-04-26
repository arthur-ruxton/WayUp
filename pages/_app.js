import { useState} from 'react'
import '../styles/globals.css'

import Navbar from '../components/Navbar'
import { TreeContext } from './TreeContext'

function MyApp({ Component, pageProps }) {
  const [newTreeData, setNewTreeData] = useState({title: '', favourite: false})

  return (
  <>
    <Navbar />
    <TreeContext.Provider value={{ newTreeData, setNewTreeData }}>
      <Component {...pageProps} />
    </TreeContext.Provider>
  </>
  )
}

export default MyApp
