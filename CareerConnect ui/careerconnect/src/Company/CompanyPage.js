import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText
} from 'mdb-react-ui-kit';
import {  useNavigate, useParams } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CompanyStaff from './CompanyStaff';
import { ReactComponent as GearIcon } from './gear.svg';
import Footer from '../Footer';
import ListStaff from './ListStaff';
import CompanysInternships from '../Internships/CompanysInternships';
import CustomNavbar from '../CustomNavbar';
import backgroundImage from './background.jpg';
import CompanyService from '../Services/CompanyService';
import AllJobs from '../Jobs/AllJobs';

const CompanyPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [profileInfo, setProfileInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [fetchError, setFetchError] = useState(false); 

  const isCompany = CompanyService.isCompany();
  const isAuthenticated=CompanyService.isAuthenticated();
  const navigator = useNavigate();
  const { id } = useParams();
  const storedCompanyId = sessionStorage.getItem('companyId');

  useEffect(() => {
    if (!isAuthenticated) {
        navigator('/');
    } 
}, [navigator]);
  useEffect(() => {
    const fetchProfileInfo = async () => {
      setLoading(true); 

      try {
        const response = await CompanyService.getCompany(id);
        setProfileInfo(response);
      } catch (error) {
        console.error('Error fetching profile data', error);
        setFetchError(true); 
      } finally {
        setLoading(false); 
      }
    };

    fetchProfileInfo();
  }, [id]);

  const updateCompany = () => {
    navigator(`/EditCompanyProfile/${profileInfo?.id}`);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSignUpClick = (event) => {
    event.preventDefault();
    handleShowModal();
  };
  const handelLogOut = () => {
    CompanyService.logout();
  };

  useEffect(() => {
    const spinnerTimeout = setTimeout(() => {
      if (loading) setShowSpinner(true);
    }, 6000); 

    return () => clearTimeout(spinnerTimeout);
  }, [loading]);

  if (loading && showSpinner) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        {fetchError && <p>Error loading profile information. Please try again later.</p>}
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
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
            <h4 style={{ fontWeight: 'bold', padding: '10px', marginLeft: '15px' }}>{profileInfo?.name}</h4>
            {isCompany && id === storedCompanyId && (
              <NavDropdown title={<><GearIcon /> Parametrat</>} id="basic-nav-dropdown" className="nav-item dropdown">
                <NavDropdown.Item onClick={updateCompany} href="#">Ndrysho Profilin</NavDropdown.Item>
                <NavDropdown.Item href="/" onClick={handelLogOut}>Shkyçu</NavDropdown.Item>
              </NavDropdown>
            )}
          </div>
        </div>
        <MDBContainer className="py-5">
          <MDBRow className="justify-content-center">
            <MDBCol lg="8">
              <MDBCard className="mb-4 shadow">
                <MDBCardBody>
                  <MDBRow style={{ padding: '20px' }}>
                    <MDBCol>
                      <MDBCardText className="text-muted">{profileInfo?.description}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <div>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Adresa:</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profileInfo?.address}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email Adresa:</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profileInfo?.email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Numri Kontaktues:</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profileInfo?.phone_number}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Viti i hapjes:</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profileInfo?.opening_year}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        {profileInfo && (
          <>
            <ListStaff companyId={profileInfo.id} />
            {isCompany && id === storedCompanyId && <CompanyStaff companyId={profileInfo.id} />}
            
            <><br/>
              <div className="text-center mb-5">
              <h2 style={{ fontFamily: 'Bebas Neue', color: '#0066cc', fontWeight: 'bold', fontSize: '36px' }}>SHPALLJET E POSTUARA</h2>
              </div>
              <CompanysInternships companyId={profileInfo.id} />
              <br />
              <AllJobs companyId={profileInfo.id} />
            </>
            
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default CompanyPage;
