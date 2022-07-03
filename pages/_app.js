import { useState} from 'react'
import '../styles/globals.css'

import { Provider } from 'next-auth/client'

// user bar gets data from session and displays it neatly
import UserBar from '../components/UserBar' 
import { DataContext } from './DataContext'

// pageProps refers to props returned by get serverSideProps for pre-rendering
// this allows us to pass the next-auth session object as props in Provider
// now anything wrapped in the provider has access to the session object
function MyApp({ Component, pageProps }) {
  const [newData, setNewData] = useState({text: '', highlight: false})

  return (
    // provider is a next-auth component. Think of it as providing the 'session' as context. 
    // here I wrap the entire app in this provider. Any component in the app can access the session. 
    // the session is used to determine if a user is logged in, if not they are redirected to login. 
    // in this app I'm trusting google OAuth as my sole security system. Firebase uses rules which
    // are a new and fairly pointless thing to learn and not the point of this project. 
  <Provider session={pageProps.session}>
    <UserBar />
    <DataContext.Provider value={{ newData, setNewData }}>
      <Component {...pageProps} />
    </DataContext.Provider>
  </Provider>
  )
}

export default MyApp
