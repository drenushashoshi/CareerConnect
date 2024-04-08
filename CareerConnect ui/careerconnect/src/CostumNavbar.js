import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CostumNavbar() {
    const navigate = useNavigate();

    const handleProfileButtonClick = () => {
        // Logic to check if user is logged in
        // For now imma let it false till so it goes to log in
        const isLoggedIn = false;

        // Redirect to appropriate page based on login status
        if (isLoggedIn) {
            navigate('/profile'); // Redirect to profile page
        } else {
            navigate('/'); // Redirect to login page
        }
    };

    return (
        <Navbar expand="lg" bg="white" variant="light" className="shadow sticky-top p-0">
            <Navbar.Brand href="#" className="d-flex align-items-center text-center py-0 px-4 px-lg-5">
                <h1 className="m-0 text-primary">CareerConnect</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarCollapse" className="me-4" />
            <Navbar.Collapse id="navbarCollapse">
                <Nav className="ms-auto p-4 p-lg-0">
                    <Nav.Link href="#" className="nav-item nav-link active">Home</Nav.Link>
                    <Nav.Link href="#" className="nav-item nav-link">About</Nav.Link>
                    <NavDropdown title="Apliko" id="basic-nav-dropdown" className="nav-item dropdown">
                        <NavDropdown.Item href="./JobListing">Pune</NavDropdown.Item>
                        <NavDropdown.Item href="#">Praktike</NavDropdown.Item>
                        <NavDropdown.Item href="#">Kurse</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Posto Shpallje" id="basic-nav-dropdown" className="nav-item dropdown">
                        <NavDropdown.Item href="./PostJob">Posto Pune</NavDropdown.Item>
                        <NavDropdown.Item href="#">Posto Praktike</NavDropdown.Item>
                        <NavDropdown.Item href="#">Posto Kurse</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Button variant="primary" className="rounded-0 py-4 px-lg-5 d-none d-lg-block" onClick={handleProfileButtonClick}>Your Profile<i className="fa fa-arrow-right ms-3"></i></Button>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CostumNavbar;
