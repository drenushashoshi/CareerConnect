import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Button, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import CompanyService from './Services/CompanyService';
import EmployeeService from './Services/EmployeeService';
import CvService from './Services/CvService';

function CustomNavbar() {
    const [profileInfo, setProfileInfo] = useState({});
    const [showNavbar, setShowNavbar] = useState(false);
    const [Cv, setCv] = useState();
    const isAuthenticated = CompanyService.isAuthenticated();
    const isCompany = CompanyService.isCompany();
    const isEmployee = EmployeeService.isEmployee();
    const companyId = sessionStorage.getItem('companyId');
    const employeeId = sessionStorage.getItem('employeeId');
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const handleProfileButtonClick = () => {
        if (isAuthenticated && isCompany) {
            navigate(`/CompanyPage/${companyId}`);
        } else if (isAuthenticated && isEmployee) {
            navigate(`/EmployeePage/${employeeId}`);
        } else {
            navigate('/');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    

    useEffect(() => {
        if (isCompany || isEmployee) {
            setShowNavbar(true);
            fetchProfileInfo();
        }
    }, [isCompany, isEmployee]);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await CompanyService.getProfile(token);
            setProfileInfo(response.company);
        } catch (error) {
            console.log('Error fetching profile data ', error);
        }
    };

    const fetchCV = async () => {
        try {
            const response = await CvService.getCvByEmployeeId(employeeId);
            console.log('Fetched Cv:', response);
            setCv(response);
        } catch (error) {
            console.error('Error fetching Cv:', error);
        }
    };

    useEffect(() => {
        fetchCV();
    }, [employeeId]);

    const handleCvClick = async () => {
        navigate(`/CvCreate`);
    };

    const isCvCreateOrEdit = location.pathname.includes('/CvCreate') || location.pathname.includes('/CvEdit');

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleConfirmDelete = async (e) => {
        e.preventDefault();
        try {
            await CvService.deleteCv(Cv.cvid);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting reference:', error);
        }
    };

    return showNavbar && (
        <>
            <Navbar expand="lg" bg="white" variant="light" className="shadow sticky-top p-0">
                <Navbar.Brand href="#" className="d-flex align-items-center text-center py-0 px-4 px-lg-5">
                    <h1 className="m-0 text-primary">CareerConnect</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarCollapse" className="me-4" />
                <Navbar.Collapse id="navbarCollapse">
                    <Nav className="ms-auto p-4 p-lg-0">
                        {isEmployee && !isCvCreateOrEdit && (
                            <>
                                {Cv ? (
                                    <NavDropdown title="CV" id="cv-nav-dropdown" className="nav-item dropdown mt-3">
                                        <NavDropdown.Item onClick={() => navigate(`/CvEdit`)}>Edito CVn</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate(`/Cv`)}>Shiko CVn</NavDropdown.Item>
                                        <NavDropdown.Item onClick={handleModalOpen}>Fshij CVn</NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <Button variant='light' className='bg-white border-0' onClick={handleCvClick}>
                                        Krijo CV
                                    </Button>
                                )}
                                <NavDropdown title="Apliko" id="basic-nav-dropdown" className="nav-item dropdown mt-3">
                                    <NavDropdown.Item href="../JobListing">Pune</NavDropdown.Item>
                                    <NavDropdown.Item href="../InternshipsList">Praktike</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                        {isCvCreateOrEdit && (
                            <NavDropdown title="Apliko" id="basic-nav-dropdown" className="nav-item dropdown">
                                <NavDropdown.Item href="../JobListing">Pune</NavDropdown.Item>
                                <NavDropdown.Item href="../InternshipsList">Praktike</NavDropdown.Item>
                            </NavDropdown>
                        )}
                        {isCompany && (
                            <>
                                <NavDropdown title="Posto Shpallje" id="basic-nav-dropdown" className="nav-item dropdown mt-3">
                                    <NavDropdown.Item href="../PostJob">Posto Pune</NavDropdown.Item>
                                    <NavDropdown.Item href={`../PostInternship`}>Posto Praktike</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                        <Button variant="primary" className="rounded-0 py-4 px-lg-5 mt-3 mt-lg-0" onClick={handleProfileButtonClick}>
                            Profili juaj <i className="fa fa-arrow-right ms-3"></i>
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Konfirmo Fshirjen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     A jeni te sigurt qe doni ta fshini CVn?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Anulo
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CustomNavbar;
