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
import { NavDropdown } from 'react-bootstrap';
import { ReactComponent as GearIcon } from './gear.svg';
import Footer from '../Footer';
import CompanyStaff from './CompanyStaff';
import ListStaff from './ListStaff';
import CompanysInternships from '../Internships/CompanysInternships';
import CustomNavbar from '../CustomNavbar';
import backgroundImage from './background.jpg';
import Modal from 'react-bootstrap/Modal';
import CompanyService from '../Services/CompanyService';

const CompanyPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const isCompany=CompanyService.isCompany();
  

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
      await CompanyService.deleteCompany(id, token);
      navigator('/');
    } catch (error) {
      console.error('Error deleting company ', error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSignUpClick = (event) => {
    event.preventDefault();
    handleShowModal();
  };
  const handelLogOut=()=>{
    CompanyService.logout();
  }

  

  return (
    <>
      <CustomNavbar />
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
            <NavDropdown title={<><GearIcon /> Settings</>} id="basic-nav-dropdown" className="nav-item dropdown">
              <NavDropdown.Item onClick={() => updateCompany()} href="#">Ndrysho Profilin</NavDropdown.Item>
              <NavDropdown.Item onClick={handleSignUpClick} href="#">Fshij Profilin</NavDropdown.Item>
              <NavDropdown.Item href="/Rate">Rate Us</NavDropdown.Item>
              <NavDropdown.Item href="/" onClick={handelLogOut}>Log Out</NavDropdown.Item>
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
        <Modal.Body className='text-center custom-font'>
          <h5 className='mt-3'>Me fshirjen e profilit, të gjitha të dhënat e juaja do të fshihen. A doni të vazhdoni?</h5>
          <div className='mt-4 mb-4'>
            <Link to='' className='btn ' onClick={handleCloseModal} style={{ marginRight: '40px', textDecoration: 'none', color: '#007bff', borderColor: '#007bff' }}>Cancel</Link>

            <Link to='' onClick={() => removeCompany(profileInfo?.id)} className='btn btn-primary' style={{ marginRight: '40px', textDecoration: 'none', color: '#fff', width: '80px' }}>OK</Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CompanyPage;
