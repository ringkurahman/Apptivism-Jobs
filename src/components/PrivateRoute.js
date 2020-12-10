import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from '../App'



const PrivateRoute = ({ children, ...rest }) => {

    // Use context API
    const [loggedInUser, setLogInUser] = useContext(UserContext)

    return (
      <Route
        {...rest}
        render={({ location }) =>
           loggedInUser.email
           ? children
           : <Redirect to={{pathname: '/', state: { from: location },}}
            />
        }
      />
    )
}

export default PrivateRoute