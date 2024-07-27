import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from "js-cookie";

export default function Menu() {
  const logout = (e) => {
    Cookies.remove('token');
    Cookies.remove('user');
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>MINI MARKETPLACE</Navbar.Brand>
          <Nav className="me-auto">
            <NavDropdown title="PRODUCTOS" id="basic-nav-dropdown">
              <NavDropdown.Item href="/product">Ver Productos</NavDropdown.Item>
              <NavDropdown.Item href="/product/stock">Stock Disponible</NavDropdown.Item>
              <NavDropdown.Item href="/product/new">Cargar Productos</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="USUARIOS" id="basic-nav-dropdown">
              <NavDropdown.Item href="/account">Ver Usuarios</NavDropdown.Item>
              <NavDropdown.Item href="/account/gallery">Galería de Imágenes</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="LOTES" id="basic-nav-dropdown">
              <NavDropdown.Item href="/batch">Ver Lotes</NavDropdown.Item>
              <NavDropdown.Item href="/batch/new">Agregar Lotes</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/dashboard" onClick={logout}>Cerrar Sesión</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
