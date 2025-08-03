import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header({ currentUser, onLogout }) {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Link to="/" className="navbar-brand">Summit Sports Club</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/events" className="nav-link">Events</Link>
            <Link to="/posts" className="nav-link">Community</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </Nav>
          <Nav className="ms-auto">
            {currentUser ? (
              <>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <NavDropdown 
                  title={`${currentUser.firstName} ${currentUser.lastName}`} 
                  id="user-dropdown"
                  align="end"
                >
                  <Link to="/dashboard" className="dropdown-item">
                    My Dashboard
                  </Link>
                  <Link to="/posts/create" className="dropdown-item">
                    Create Post
                  </Link>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={onLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register">
                  <Button variant="outline-light" size="sm" className="ms-2">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;