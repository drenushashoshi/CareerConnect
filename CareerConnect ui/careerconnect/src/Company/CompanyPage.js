import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText
} from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import { getCompany, deleteCompany } from '../Services/CompanyService';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { ReactComponent as GearIcon } from './gear.svg';
import Footer from '../Footer';
import CompanyStaff from './CompanyStaff';
import ListStaff from './ListStaff';
import CompanysInternships from '../Internships/CompanysInternships';
import CustomNavbar from '../CustomNavbar';
import backgroundImage from './background.jpg';
import Modal from 'react-bootstrap/Modal';

const CompanyPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setphone_number] = useState('');
  const [opening_year, setopening_year] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getCompany(id)
        .then((response) => {
          setName(response.data.name);
          setEmail(response.data.email);
          setAddress(response.data.address);
          setphone_number(response.data.phone_number);
          setopening_year(response.data.opening_year);
          setDescription(response.data.description);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [id]);

  function updateCompany(id) {
    navigator(`/EditCompanyProfile/${id}`);
  }

  function removeCompany(id) {
    deleteCompany(id)
      .then((response) => {
        navigator('/');
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleProfileButtonClick = () => {
    const isLoggedIn = false;
    if (isLoggedIn) {
      navigator('/CompanyPage');
    } else {
      navigator('/');
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSignUpClick = (event) => {
    event.preventDefault();
    handleShowModal();
  };

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
        <div style={{ backgroundColor:'#3b5998', color: '#fff', fontFamily: 'Arial, sans-serif', padding: '10px', height: '70px', margin: '0 -15px' }}>
          <div className="container d-flex justify-content-between align-items-center">
            <h4 style={{ fontWeight: 'bold', padding: '10px', marginLeft: '15px' }}>{name}</h4>
            <NavDropdown title={<><GearIcon /> Settings</>} id="basic-nav-dropdown" className="nav-item dropdown">
              <NavDropdown.Item onClick={() => updateCompany(id)} href="#">Ndrysho Profilin</NavDropdown.Item>
              <NavDropdown.Item onClick={handleSignUpClick} href="#">Fshij Profilin</NavDropdown.Item>
              <NavDropdown.Item href="/Rate">Rate Us</NavDropdown.Item>
              <NavDropdown.Item href="/">Log Out</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <MDBContainer className="py-5" >
          <MDBRow className="justify-content-center">
            <MDBCol lg="8">
              <MDBCard className="mb-4 shadow">
                <MDBCardBody>
                    <MDBRow style={{ padding:'20px' }}>
                      <MDBCol >
                        <MDBCardText className="text-muted">{description}</MDBCardText>
                      </MDBCol>
                    </MDBRow><br/><hr/>
                  <div>
                  <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Adresa:</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{address}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                  <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email Adresa:</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Numri Kontaktues:</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{phone_number}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Viti i hapjes:</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{opening_year}</MDBCardText>
                      </MDBCol>
                    </MDBRow><br/>
                    
                    
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="text-center mt-5">
          <h2 style={{ fontFamily: 'Arial, sans-serif', color:'#0056b3', fontWeight: 'bold' }}>Stafi i Kompanisë</h2><br /><br /><br />
        </div>
        <ListStaff companyId={id} />
        <CompanyStaff companyId={id} /><br /><br />
        <div className="text-center mb-5">
          <h2 style={{ fontFamily: 'Arial, sans-serif', color:'#0056b3', fontWeight: 'bold' }}>Shpalljet e Postuara</h2><br />
        </div>
        <CompanysInternships companyId={id} /><br/>
        <Footer />
        </div>
        <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className='text-center custom-font'>
          <h5 className='mt-3'>Me fshirjen e profilit, të gjitha të dhënat e juaja do të fshihen. A doni të vazhdoni?</h5>
          <div className='mt-4 mb-4'>
            <Link to='' className='btn ' onClick={handleCloseModal} style={{ marginRight: '40px', textDecoration: 'none', color: '#007bff', borderColor:'#007bff' }}>Cancel</Link>

            <Link to='' onClick={() => removeCompany(id)} className='btn btn-primary' style={{ marginRight: '40px', textDecoration: 'none', color: '#fff', width:'80px' }}>OK</Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CompanyPage;
