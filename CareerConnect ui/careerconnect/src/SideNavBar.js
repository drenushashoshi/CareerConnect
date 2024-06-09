import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EmployeeService from './Services/EmployeeService';

const handleLogOut = () => {
  EmployeeService.logout();
}

const SideNavBar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="flex-column p-3" style={{ width: '250px', height: '100vh', position: 'fixed' }}>
        <br />
        <Navbar.Brand href="/Dashboard"><b>CareerConnect</b></Navbar.Brand>
        <Nav className="flex-column">
          <NavDropdown title="Përdoruesit e regjistruar" id="basic-nav-dropdown" className="list-group">
            <NavDropdown.Item as={Link} to="/EmployeeList" className="list-group-item">Punonjësit</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/CompanyList" className="list-group-item">Kompanitë</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/RatesList" className="list-group">Vlerësimet</Nav.Link>
          <NavDropdown title="Kontrollo" id="control-nav-dropdown" className="list-group">
            <NavDropdown.Item as={Link} to="/LocationDashboard" className="list-group-item">Qytetet</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/IndustriaDashboard" className="list-group-item">Industritë</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/" onClick={handleLogOut} className="list-group">Shkyçu</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default SideNavBar;
