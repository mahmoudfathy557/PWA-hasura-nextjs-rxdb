import React from 'react'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import LogoutBtn from './LogoutBtn'

const Header = () => (
  <Navbar fluid className='m-bottom-0'>
    <Navbar.Header className='navHeader'>
      <Navbar.Brand className='navBrand'>RxDB - Hasura Demo App</Navbar.Brand>

      <Nav pullRight>
        <NavItem>
          <LogoutBtn />
        </NavItem>
      </Nav>
    </Navbar.Header>
  </Navbar>
)

export default Header
