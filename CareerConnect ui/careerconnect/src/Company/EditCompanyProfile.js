import React, { useState, useEffect } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';

import { useParams, useNavigate } from 'react-router-dom';
import CustomNavbar from "../CustomNavbar";
import Footer from '../Footer';
import CompanyService from '../Services/CompanyService';

const EditCompanyProfile = () => {
  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!CompanyService.isCompany()) {
      navigator('/');
    } else {
      const storedCompanyId = sessionStorage.getItem('companyId');
      if (id !== storedCompanyId) {
        CompanyService.logout();
        navigator('/');
      }
    }
  }, [navigator, id]);

  const [companyData, setCompanyData] = useState({
    name: '',
    email: '',
    address: '',
    phone_number: '',
    opening_year: '',
    description: ''
  });

  const [validations, setValidations] = useState({
    name: true,
    email: true,
    address: true,
    phone_number: true,
    opening_year: true,
    description: true
  });

  useEffect(() => {
    fetchCompanyDataById(id);
  }, [id]);

  const fetchCompanyDataById = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await CompanyService.getCompany(id, token);
      const { name, email, address, phone_number, opening_year, description } = response;
      setCompanyData({ name, email, address, phone_number, opening_year, description });
    } catch (error) {
      console.error('Error fetching company data ', error);
    }
  };

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevCompanyData) => ({
      ...prevCompanyData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const areValid = validateForm();
    if (!areValid) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await CompanyService.updateCompany(id, companyData, token);
      navigator(`/CompanyPage/${id}`);
    } catch (error) {
      console.error('error updating company profile ', error);
      alert(error);
    }
  };

  const validateForm = () => {
    const validationsCopy = { ...validations };
    let isValid = true;

    if (!companyData.name.trim()) {
      validationsCopy.name = false;
      isValid = false;
    } else {
      validationsCopy.name = true;
    }

    if (!companyData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyData.email)) {
      validationsCopy.email = false;
      isValid = false;
    } else {
      validationsCopy.email = true;
    }

    if (!companyData.address.trim()) {
      validationsCopy.address = false;
      isValid = false;
    } else {
      validationsCopy.address = true;
    }

    if (!companyData.phone_number.trim()) {
      validationsCopy.phone_number = false;
      isValid = false;
    } else {
      validationsCopy.phone_number = true;
    }

    if (!companyData.opening_year.toString().trim()) { 
      validationsCopy.opening_year = false;
      isValid = false;
    } else {
      validationsCopy.opening_year = true;
    }

    if (!companyData.description.trim()) {
      validationsCopy.description = false;
      isValid = false;
    } else {
      validationsCopy.description = true;
    }

    setValidations(validationsCopy);
    return isValid;
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
                  <MDBCol sm="6">
                    <span>Emri:</span>
                  </MDBCol>
                  <MDBCol sm="6">
                    <MDBInput
                      type="text"
                      name="name"
                      value={companyData.name}
                      onChange={handelInputChange}
                      invalid={!validations.name}
                    />
                    {!validations.name && <div className="text-danger">Shkruani emrin</div>}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="6">
                    <span>Adresa:</span>
                  </MDBCol>
                  <MDBCol sm="6">
                    <MDBInput
                      type="text"
                      name="address"
                      value={companyData.address}
                      onChange={handelInputChange}
                      invalid={!validations.address}
                    />
                    {!validations.address && <div className="text-danger">Shkruani adresën</div>}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="6">
                    <span>Email Adresa:</span>
                  </MDBCol>
                  <MDBCol sm="6">
                    <MDBInput
                      type="text"
                      name="email"
                      value={companyData.email}
                      onChange={handelInputChange}
                      invalid={!validations.email}
                    />
                    {!validations.email && <div className="text-danger">Email adresë jo-valide</div>}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="6">
                    <span>Numri kontaktues:</span>
                  </MDBCol>
                  <MDBCol sm="6">
                    <MDBInput
                      type="text"
                      name="phone_number"
                      value={companyData.phone_number}
                      onChange={handelInputChange}
                      invalid={!validations.phone_number}
                    />
                    {!validations.phone_number && <div className="text-danger">Shkruani numrin kontaktues</div>}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="6">
                    <span>Viti i hapjes:</span>
                  </MDBCol>
                  <MDBCol sm="6">
                    <MDBInput
                      type="text"
                      name="opening_year"
                      value={companyData.opening_year}
                      onChange={handelInputChange}
                      invalid={!validations.opening_year}
                    />
                    {!validations.opening_year && <div className="text-danger">Shkruani vitin e hapjes</div>}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="6">
                    <span>Përshkrimi:</span>
                  </MDBCol>
                  <MDBCol sm="6">
                    <textarea
                      name="description"
                      value={companyData.description}
                      onChange={handelInputChange}
                      style={{
                        height: '200px',
                        width: '100%',
                        resize: 'none',
                        padding: '10px',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        border: '1px solid #ced4da',
                        borderRadius: '0.25rem',
                        boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
                        transition: 'box-shadow 0.15s ease-in-out',
                      }}
                    />
                    {!validations.description && <div className="text-danger">Përshkrimi është i nevojshëm</div>}
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

export default EditCompanyProfile;
