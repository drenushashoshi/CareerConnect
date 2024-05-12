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

  const [companyData, setCompanyData] = useState({
    name: '',
    email: '',
    address: '',
    phone_number: '',
    opening_year: '',
    description: ''
  });

  useEffect(() => {
    fetchCompanyDataById(id);
  }, [id]);

  const fetchCompanyDataById = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await CompanyService.getCompany(id, token);
      const { name, email, address, phone_number, opening_year, description } = response.company;
      setCompanyData({ name, email, address, phone_number, opening_year, description })

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
    try {
      const token = localStorage.getItem('token');
      await CompanyService.updateCompany(id, companyData, token);
      navigator('/CompanyPage');
    } catch (error) {
      console.error('error updating company profile ', error);
      alert(error)
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
                  <MDBCol sm="6">
                    <span>Emri:</span>
                  </MDBCol>
                  <MDBCol sm="6">
                    <MDBInput
                      type="text"
                      name="name"
                      value={companyData.name}
                      onChange={handelInputChange}
                    />
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
                    />
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
                    />
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
                    />
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
                    />
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
