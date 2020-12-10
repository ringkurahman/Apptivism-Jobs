import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
    return (
        <header>
          <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Apptivism Jobs</Navbar.Brand>
              </LinkContainer>   
            </Container>
          </Navbar>
        </header>
    )
}

export default Header