
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import CompanyService from './Services/CompanyService';

function CustomNavbar() {
    const [profileInfo, setProfileInfo] = useState({});
    const isAuthenticated=CompanyService.isAuthenticated();
    const isCompany=CompanyService.isCompany();

    const navigate = useNavigate();
    

    const handleProfileButtonClick = () => {
        if (isAuthenticated) {
            navigate('/CompanyPage'); 
        } else {
            navigate('/'); 
        }
    };

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
        const token = localStorage.getItem('token');
        const response = await CompanyService.getProfile(token);
        setProfileInfo(response.company);
        } catch (error) {
        console.log('Error fetching profile data ', error);
        }
    }

    return (
        <Navbar expand="lg" bg="white" variant="light" className="shadow sticky-top p-0" >
            <Navbar.Brand href="#" className="d-flex align-items-center text-center py-0 px-4 px-lg-5">
                <h1 className="m-0 text-primary">CareerConnect</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarCollapse" className="me-4" />
            <Navbar.Collapse id="navbarCollapse">
                <Nav className="ms-auto p-4 p-lg-0">
                    <NavDropdown title="Apliko" id="basic-nav-dropdown" className="nav-item dropdown">
                        <NavDropdown.Item href="../JobListing">Pune</NavDropdown.Item>
                        <NavDropdown.Item href="../InternshipsList">Praktike</NavDropdown.Item>

                    </NavDropdown>
                    {isCompany && (
                        <NavDropdown title="Posto Shpallje" id="basic-nav-dropdown" className="nav-item dropdown">
                            <NavDropdown.Item href="../PostJob">Posto Pune</NavDropdown.Item>
                            <NavDropdown.Item href={`../PostInternship`}>Posto Praktike</NavDropdown.Item>
                        </NavDropdown>
                    )}
                </Nav>
                <Button variant="primary" className="rounded-0 py-4 px-lg-5 d-none d-lg-block" onClick={handleProfileButtonClick}>Your Profile<i className="fa fa-arrow-right ms-3"></i></Button>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustomNavbar;
