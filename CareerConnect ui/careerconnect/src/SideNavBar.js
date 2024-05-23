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
          <NavDropdown title="Registered Users" id="basic-nav-dropdown" className="list-group">
            <NavDropdown.Item as={Link} to="/EmployeeList" className="list-group-item">Employees</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/CompanyList" className="list-group-item">Companies</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/RatesList" className="list-group">Rates</Nav.Link>
          <NavDropdown title="Control" id="control-nav-dropdown" className="list-group">
            <NavDropdown.Item as={Link} to="/Cities" className="list-group-item">Cities</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/Industries" className="list-group-item">Industries</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/" onClick={handleLogOut} className="list-group">Logout</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default SideNavBar;
