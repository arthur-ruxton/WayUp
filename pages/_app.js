import { useState} from 'react'
import '../styles/globals.css'

import { Provider } from 'next-auth/client'

import Navbar from '../components/Navbar'
import { TreeContext } from './TreeContext'

// pageProps refers to props returned by get serverSideProps for pre-rendering
// this allows us to pass the next-auth session object as props in Provider
// now anything wrapped in the provider has access to the session object
function MyApp({ Component, pageProps }) {
  const [newTreeData, setNewTreeData] = useState({title: '', favourite: false})

  return (
  <Provider session={pageProps.session}>
    <Navbar />
    <TreeContext.Provider value={{ newTreeData, setNewTreeData }}>
      <Component {...pageProps} />
    </TreeContext.Provider>
  </Provider>
  )
}

export default MyApp
