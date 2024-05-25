import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import CompanyStaff from './CompanyStaff';
import { ReactComponent as GearIcon } from './gear.svg';
import Footer from '../Footer';
import ListStaff from './ListStaff';
import CompanysInternships from '../Internships/CompanysInternships';
import CustomNavbar from '../CustomNavbar';
import backgroundImage from './background.jpg';
import CompanyService from '../Services/CompanyService';

const CompanyPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [showSpinner, setShowSpinner] = useState(false); 
  const isCompany = CompanyService.isCompany();
  const navigator = useNavigate();

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

  function updateCompany() {
    navigator(`/EditCompanyProfile/${profileInfo.id}`);
  }

  const removeCompany = async (id) => {
    try {
      const token = localStorage.getItem('token');
      setShowSpinner(true); 
      await CompanyService.deleteCompany(id, token);
      setTimeout(() => {
        setShowSpinner(false); 
        navigator('/');
      }, 4000);
    } catch (error) {
      setShowSpinner(false); 
      console.error('Error deleting company ', error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSignUpClick = (event) => {
    event.preventDefault();
    handleShowModal();
  };

  const handelLogOut = () => {
    CompanyService.logout();
  }

  return (
    <>
      <CustomNavbar />
      {showSpinner && ( 
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1060 
        }}>
          <div className="text-center text-white">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="mt-3">Te dhenat e juaja po fshihen...</div>
          </div>
        </div>
      )}
      <div style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        textAlign: 'center',
        minHeight: '100vh',
      }}>
        <div style={{ backgroundColor: '#3b5998', color: '#fff', fontFamily: 'Arial, sans-serif', padding: '10px', height: '70px', margin: '0 -15px' }}>
          <div className="container d-flex justify-content-between align-items-center">
            <h4 style={{ fontWeight: 'bold', padding: '10px', marginLeft: '15px' }}>{profileInfo.name}</h4>
            {isCompany && (
            <NavDropdown title={<><GearIcon /> Parametrat</>} id="basic-nav-dropdown" className="nav-item dropdown">
              <NavDropdown.Item onClick={() => updateCompany()} href="#">Ndrysho Profilin</NavDropdown.Item>
              <NavDropdown.Item onClick={handleSignUpClick} href="#">Fshij Profilin</NavDropdown.Item>
              <NavDropdown.Item href="/Rate">Na Vlerësoni</NavDropdown.Item>
              <NavDropdown.Item href="/" onClick={handelLogOut}>Shkyçu</NavDropdown.Item>
            </NavDropdown>
            )}
          </div>
        </div>
        <MDBContainer className="py-5" >
          <MDBRow className="justify-content-center">
            <MDBCol lg="8">
              <MDBCard className="mb-4 shadow">
                <MDBCardBody>
                  <MDBRow style={{ padding: '20px' }}>
                    <MDBCol >
                      <MDBCardText className="text-muted">{profileInfo.description}</MDBCardText>
                    </MDBCol>
                  </MDBRow><br /><hr />
                  <div>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Adresa:</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profileInfo.address}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email Adresa:</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profileInfo.email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Numri Kontaktues:</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profileInfo.phone_number}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Viti i hapjes:</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profileInfo.opening_year}</MDBCardText>
                      </MDBCol>
                    </MDBRow><br />
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="text-center mt-5">
          <h2 style={{ fontFamily: 'Arial, sans-serif', color: '#0056b3', fontWeight: 'bold' }}>Stafi i Kompanisë</h2><br /><br /><br />
        </div>
        {profileInfo && (
          <>
            <ListStaff companyId={profileInfo.id} />
            {isCompany && (
              <CompanyStaff companyId={profileInfo.id} />
            )}<br/>
            <div className="text-center mb-5">
              <h2 style={{ fontFamily: 'Arial, sans-serif', color: '#0056b3', fontWeight: 'bold' }}>Shpalljet e Postuara</h2><br />
            </div>
            <CompanysInternships companyId={profileInfo.id} /><br />
          </>
        )}
        <Footer />
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className='text-center custom-font' style={{ zIndex: 1050 }}>
          <h5 className='mt-3'>Me fshirjen e profilit, të gjitha të dhënat e juaja do të fshihen. A doni të vazhdoni?</h5>
          <div className='mt-4 mb-4'>
            <Link to='' className='btn ' onClick={handleCloseModal} style={{ marginRight: '40px', textDecoration: 'none', color: '#007bff', borderColor: '#007bff' }}>Cancel</Link>
            <Link to='' onClick={() => removeCompany(profileInfo.id)} className='btn btn-primary' style={{ marginRight: '40px', textDecoration: 'none', color: '#fff', width: '80px' }}>OK</Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CompanyPage;
