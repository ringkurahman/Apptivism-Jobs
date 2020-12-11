import React, { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { UserContext } from '../App'



const Header = () => {

  const [loggedInUser, setLogInUser] = useContext(UserContext)

    return (
        <header>
          <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Apptivism Jobs</Navbar.Brand>
            </LinkContainer> 
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                {
                  loggedInUser ? <Nav.Link href="/">{ loggedInUser.name }</Nav.Link> :
                    <Nav.Link href="/">Sign In</Nav.Link>
                }
            </Nav>
          </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
    )
}

export default Header