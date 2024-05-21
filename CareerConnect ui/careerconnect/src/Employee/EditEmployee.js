import React, { useState, useEffect } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeService from '../Services/EmployeeService';
import CustomNavbar from "../CustomNavbar";
import Footer from '../Footer';


const EditEmployee = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    name: '',
    surname: '',
    email: '',
    address: '',
    age: '',
    phone: '',
    jobPreferences: '',
    skills: ''
  });

  useEffect(() => {
    fetchEmployeeDataById(id);
  }, [id]);

  const fetchEmployeeDataById = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await EmployeeService.getEmployeeById(id, token);
      const { name, surname, email, address, age, phone, skills, jobPreferences } = response.employee;
      setEmployeeData({ name, surname, email, address, age, phone, skills, jobPreferences });
    } catch (error) {
      console.error('Error fetching employee data', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevEmployeeData) => ({
      ...prevEmployeeData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await EmployeeService.updateEmployee(id, employeeData, token);
      navigator('/EmployeePage');
    } catch (error) {
      console.error('Error updating employee profile', error);
      alert(error);
    }
  };

  return (
    <>
      <CustomNavbar />
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol lg="8">
            <MDBCard className="mb-4 shadow">
              <MDBCardBody>
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <span>Name:</span>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="name"
                      value={employeeData.name}
                      onChange={handleInputChange}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <span>Surname:</span>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="surname"
                      value={employeeData.surname}
                      onChange={handleInputChange}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <span>Email:</span>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="email"
                      name="email"
                      value={employeeData.email}
                      onChange={handleInputChange}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <span>Address:</span>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="address"
                      value={employeeData.address}
                      onChange={handleInputChange}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <span>Age:</span>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="age"
                      value={employeeData.age}
                      onChange={handleInputChange}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <span>Phone:</span>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="phone"
                      value={employeeData.phone}
                      onChange={handleInputChange}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <span>Job Preferences:</span>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="jobPreferences"
                      value={employeeData.jobPreferences}
                      onChange={handleInputChange}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="3">
                    <span>Skills:</span>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      name="skills"
                      value={employeeData.skills}
                      onChange={handleInputChange}
                    />
                  </MDBCol>
                </MDBRow><br />
                <MDBRow className="mb-3 justify-content-center">
                  <MDBCol sm="6">
                    <button
                      className='btn btn-primary w-100'
                      onClick={handleSubmit}
                    >
                      Ruaj ndryshimet
                    </button>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </>
  );
}

export default EditEmployee;
