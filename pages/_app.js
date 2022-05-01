import { useState} from 'react'
import '../styles/globals.css'

import { Provider } from 'next-auth/client'

import UserBar from '../components/UserBar'
import { DataContext } from './DataContext'

// pageProps refers to props returned by get serverSideProps for pre-rendering
// this allows us to pass the next-auth session object as props in Provider
// now anything wrapped in the provider has access to the session object
function MyApp({ Component, pageProps }) {
  const [newData, setNewData] = useState({text: '', highlight: false})

  return (

  <Provider session={pageProps.session}>
    <UserBar />
    <DataContext.Provider value={{ newData, setNewData }}>
      <Component {...pageProps} />
    </DataContext.Provider>
  </Provider>
  )
}

export default MyApp
