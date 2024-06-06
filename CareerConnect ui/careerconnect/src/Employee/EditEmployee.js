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
  const navigate = useNavigate();
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchEmployeeDataById(id);
  }, [id]);

  const fetchEmployeeDataById = async (id) => {
    try {
      const response = await EmployeeService.getEmployeeById(id);
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

  const validateForm = () => {
    const newErrors = {};
    Object.keys(employeeData).forEach((key) => {
      if (!employeeData[key]) {
        newErrors[key] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await EmployeeService.updateEmployee(id, employeeData, token);
      navigate(`/EmployeePage/${id}`);
    } catch (error) {
      console.error('Error updating employee profile', error);
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
                <form onSubmit={handleSubmit}>
                  <MDBRow className="mb-3">
                    <MDBCol sm="3">
                      <span>Emri:</span>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput
                        type="text"
                        name="name"
                        value={employeeData.name}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.name && <div className="text-danger">{errors.name}</div>}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow className="mb-3">
                    <MDBCol sm="3">
                      <span>Mbiemri:</span>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput
                        type="text"
                        name="surname"
                        value={employeeData.surname}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.surname && <div className="text-danger">{errors.surname}</div>}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow className="mb-3">
                    <MDBCol sm="3">
                      <span>Email-adresa:</span>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput
                        type="email"
                        name="email"
                        value={employeeData.email}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.email && <div className="text-danger">{errors.email}</div>}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow className="mb-3">
                    <MDBCol sm="3">
                      <span>Adresa:</span>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput
                        type="text"
                        name="address"
                        value={employeeData.address}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.address && <div className="text-danger">{errors.address}</div>}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow className="mb-3">
                    <MDBCol sm="3">
                      <span>Mosha:</span>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput
                        type="text"
                        name="age"
                        value={employeeData.age}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.age && <div className="text-danger">{errors.age}</div>}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow className="mb-3">
                    <MDBCol sm="3">
                      <span>Numri kontaktues:</span>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput
                        type="text"
                        name="phone"
                        value={employeeData.phone}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.phone && <div className="text-danger">{errors.phone}</div>}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow className="mb-3">
                    <MDBCol sm="3">
                      <span>Preferencat për punë:</span>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput
                        type="text"
                        name="jobPreferences"
                        value={employeeData.jobPreferences}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.jobPreferences && <div className="text-danger">{errors.jobPreferences}</div>}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow className="mb-3">
                    <MDBCol sm="3">
                      <span>Aftësitë:</span>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput
                        type="text"
                        name="skills"
                        value={employeeData.skills}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.skills && <div className="text-danger">{errors.skills}</div>}
                    </MDBCol>
                  </MDBRow>
                  <br />
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
                </form>
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
