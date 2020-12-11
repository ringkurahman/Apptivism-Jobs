import React, { createContext } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import useLocalStorageState from 'use-local-storage-state/dist'
import Footer from './components/Footer'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'


export const UserContext = createContext()

const App = () => {
  
  // Save Login User info to local storage.
  const [loggedInUser, setLogInUser] = useLocalStorageState('info', {})

  return (
    <UserContext.Provider value={[loggedInUser, setLogInUser]}>
      <Router>
        <Header />
        <main className="pb-5">
          <PrivateRoute exact path='/dashboard'>
            <Dashboard />
          </PrivateRoute>
          <Route exact path='/'>
            <Login />
          </Route>
        </main>
        <Footer />
      </Router>
    </UserContext.Provider>
  )
}

export default App
