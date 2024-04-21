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
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { ReactComponent as GearIcon } from './gear.svg';
import Footer from '../Footer'
import CompanyStaff from './CompanyStaff';

const CompanyPage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setphone_number] = useState('');
  const [opening_year, setopening_year] = useState('');
  const [description, setDescription] = useState('');


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

  return (
    <>
      <Navbar expand="lg" bg="white" variant="light" className="shadow sticky-top p-0" style={{ marginBottom: '20px' }}>
        <Navbar.Brand href="#" className="d-flex align-items-center text-center py-0 px-4 px-lg-5">
          <h1 className="m-0 text-primary">CareerConnect</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarCollapse" className="me-4" />
        <Navbar.Collapse id="navbarCollapse">
          <Nav className="ms-auto p-4 p-lg-0">
            <NavDropdown title="Posto Shpallje" id="basic-nav-dropdown" className="nav-item dropdown">
              <NavDropdown.Item href="../PostJob">Posto Pune</NavDropdown.Item>
              <NavDropdown.Item href="#">Posto Praktike</NavDropdown.Item>
              <NavDropdown.Item href="#">Posto Kurse</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<><GearIcon /> Settings</>} id="basic-nav-dropdown" className="nav-item dropdown">
              <NavDropdown.Item onClick={() => updateCompany(id)} href="#">Ndrysho Profilin</NavDropdown.Item>
              <NavDropdown.Item onClick={() => removeCompany(id)} href="#">Fshij Profilin</NavDropdown.Item>
              <NavDropdown.Item href="#">Rate Us</NavDropdown.Item>
              <NavDropdown.Item href="/">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button variant="primary" className="rounded-0 py-4 px-lg-5 d-none d-lg-block" onClick={handleProfileButtonClick}>Your Profile<i className="fa fa-arrow-right ms-3"></i></Button>
        </Navbar.Collapse>
      </Navbar>
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol lg="8">
            <MDBCard className="mb-4 shadow">
              <MDBCardBody>
                <div className="text-center">
                  
                  <h4 className="mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>{name}</h4>
                  <p className="text-muted mb-4">{address}</p>
                </div>
                <hr />
                <div>
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
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Përshkrimi i Kompanisë:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{description}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="text-center mt-5">
        <h2>Stafi i Kompanisë</h2><br/>
      </div>
      <CompanyStaff companyId={id}/>
      <div className="text-center mb-5">
        <h2>Shpalljet E Postuara</h2><br/><br/><br/><br/>
      </div>
      <Footer/>
    </>
  );
}

export default CompanyPage;
