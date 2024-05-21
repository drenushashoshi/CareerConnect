import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import CustomNavbar from "../CustomNavbar";
import EmployeeService from '../Services/EmployeeService';
import backgroundImage from '../Company/background.jpg'; 
import { ReactComponent as GearIcon } from '../Company/gear.svg';
import Footer from '../Footer';

const EmployeePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const isEmployee = EmployeeService.isEmployee();
  const navigator = useNavigate();

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await EmployeeService.getProfile(token);
      setProfileInfo(response.employee);
    } catch (error) {
      console.log('Error fetching profile data ', error);
    }
  }

  const updateEmployee = (id) => {
    navigator(`/EditEmployee/${id}`);
    console.log(id);
  }

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handelLogOut = () => {
    EmployeeService.logout();
  }

  const removeEmployee = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await EmployeeService.deleteEmployee(id, token);
      navigator('/');
    } catch (error) {
      console.error('Error deleting employee ', error);
    }
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
        <div style={{
          backgroundColor: '#3b5998',
          color: '#fff',
          fontFamily: 'Arial, sans-serif',
          padding: '10px',
          height: '70px',
          margin: '0 -15px'
        }}>
          <div className="container d-flex justify-content-between align-items-center">
            <h4 style={{ fontWeight: 'bold', padding: '10px', marginLeft: '15px' }}>
              {profileInfo.name} {profileInfo.surname}
            </h4>
            {isEmployee && (
              <NavDropdown title={<><GearIcon /> Settings</>} id="basic-nav-dropdown" className="nav-item dropdown">
                <NavDropdown.Item onClick={() => updateEmployee(profileInfo.id)} href="#">Ndrysho Profilin</NavDropdown.Item>
                <NavDropdown.Item onClick={handleShowModal} href="#">Fshij Profilin</NavDropdown.Item>
                <NavDropdown.Item href="/Rate">Na vlerësoni</NavDropdown.Item>
                <NavDropdown.Item href="/" onClick={handelLogOut}>Shkyçu</NavDropdown.Item>
              </NavDropdown>
            )}
          </div>
        </div>
        <MDBContainer className="py-5 d-flex justify-content-center">
          <MDBRow className="w-100" style={{ maxWidth: '800px' }}>
            <MDBCol lg="12">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Age</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{profileInfo.age}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{profileInfo.address}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{profileInfo.email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{profileInfo.phone}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Skills</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{profileInfo.skills}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Job Preferences</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{profileInfo.jobPreferences}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className='text-center custom-font'>
          <h5 className='mt-3'>By deleting your profile, all your data will be removed. Do you want to continue?</h5>
          <div className='mt-4 mb-4'>
            <Link to='' className='btn' onClick={handleCloseModal} style={{ marginRight: '40px', textDecoration: 'none', color: '#007bff', borderColor: '#007bff' }}>Cancel</Link>
            <Link to='' onClick={() => removeEmployee(profileInfo.id)} className='btn btn-primary' style={{ marginRight: '40px', textDecoration: 'none', color: '#fff', width: '80px' }}>OK</Link> 
          </div>
        </Modal.Body>
      </Modal>
      <Footer/>
    </>
  );
}

export default EmployeePage;
