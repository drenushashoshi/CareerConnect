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
import { useNavigate, useParams } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CustomNavbar from "../CustomNavbar";
import EmployeeService from '../Services/EmployeeService';
import backgroundImage from '../Company/background.jpg';
import { ReactComponent as GearIcon } from '../Company/gear.svg';
import Footer from '../Footer';
import CompanyService from '../Services/CompanyService';
import { Button } from 'react-bootstrap';
import EmployeePostSignup from "./EmployeePostSignup";
import EmployeePostList from "./EmployeePostList";
import CvService from '../Services/CvService';


const EmployeePage = () => {
  const {id} = useParams();
  const [setShowModal] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const isEmployee = EmployeeService.isEmployee();
  const isCompany = CompanyService.isCompany();
  const navigator = useNavigate();
  const loggedInEmployee= sessionStorage.getItem('employeeId');
  const [cv,setCv] = useState(null);


  useEffect(() => {
    fetchProfileInfo();
  }, [id]);

  useEffect(()=>
  {
    fetchCV();
  },[id])

  const fetchCV = async()=>
    {
      try{
        const response = await CvService.getCvByEmployeeId(id);
        setCv(response);
      }
      catch(error)
      {
        console.log('Cv not found');
      }
    }

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await EmployeeService.getEmployeeById(id);
      sessionStorage.setItem('name', response.name);
      sessionStorage.setItem('surname', response.surname);
      setProfileInfo(response);
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

 
  const Click = () =>
    {
      navigator(`/Cv/`+id);
    }

  return (
    <>
    {profileInfo && (
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
            {isEmployee && id === loggedInEmployee &&(
              <NavDropdown title={<><GearIcon /> Parametrat</>} id="basic-nav-dropdown" className="nav-item dropdown">
                <NavDropdown.Item onClick={() => updateEmployee(profileInfo.id)} href="#">Ndrysho Profilin</NavDropdown.Item>
                <NavDropdown.Item href={`/Rate/${profileInfo.id}`}>Na vlerësoni</NavDropdown.Item>
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
                      <MDBCardText>Mosha</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{profileInfo.age}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Adresa</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{profileInfo.address}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email-adresa</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{profileInfo.email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Numri kontaktues</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{profileInfo.phone}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Aftësitë</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{profileInfo.skills}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Preferencat pë punë</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{profileInfo.jobPreferences}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
              {isCompany && cv ? (
                <Button className="btn btn-primary" onClick={Click}>Shiko CVn</Button>
              ) : null}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <EmployeePostSignup employeeId={id} loggedInEmployeeId={loggedInEmployee}></EmployeePostSignup>
        <EmployeePostList employeeId={id} loggedInEmployeeId={loggedInEmployee}></EmployeePostList>
      </div>
      <Footer/>
    </>
    )}
  </>
  );
}

export default EmployeePage;
