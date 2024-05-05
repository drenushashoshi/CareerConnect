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
import { getCompany, updateCompany } from '../Services/CompanyService';
import CustomNavbar from "../CustomNavbar";
import Footer from '../Footer';

const EditCompanyProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setphone_number] = useState('');
  const [opening_year, setopening_year] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [yearError, setYearError] = useState('');

  const { id } = useParams();
  const navigator = useNavigate();

  function saveCompany(e) {
    e.preventDefault();

    
    setNameError('');
    setEmailError('');
    setAddressError('');
    setPhoneError('');
    setYearError('');

   
    let isValid = true;
    if (!name.trim()) {
      setNameError('Emri nuk mund të jetë bosh');
      isValid = false;
    }
    if (!email.trim()) {
      setEmailError('Emaili nuk mund të jetë bosh');
      isValid = false;
    }
    if (!address.trim()) {
      setAddressError('Adresa nuk mund të jetë bosh');
      isValid = false;
    }
    if (!phone_number.trim()) {
      setPhoneError('Numri kontaktues nuk mund të jetë bosh');
      isValid = false;
    }
    const openingYearString = String(opening_year);
    if (!openingYearString.trim()) {
      setYearError('Viti i hapjes nuk mund të jetë bosh');
      isValid = false;
    }

    if (isValid) {
      const company = { name, email, address, phone_number, opening_year, description };
      if (id) {
        updateCompany(id, company)
          .then((response) => {
            console.log(response.data);
            navigator(`/CompanyPage/${id}`);
          })
          .catch(error => {
            console.error("Error updating company:", error);
          });
      }
    }
  }

  useEffect(() => {
    if (id) {
      getCompany(id).then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setphone_number(response.data.phone_number);
        setopening_year(response.data.opening_year);
        setDescription(response.data.description);
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id])

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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
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
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {addressError && <div style={{ color: 'red' }}>{addressError}</div>}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
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
                      value={phone_number}
                      onChange={(e) => setphone_number(e.target.value)}
                    />
                    {phoneError && <div style={{ color: 'red' }}>{phoneError}</div>}
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
                      value={opening_year}
                      onChange={(e) => setopening_year(e.target.value)}
                    />
                    {yearError && <div style={{ color: 'red' }}>{yearError}</div>}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="6">
                    <span>Përshkrimi:</span>
                  </MDBCol>
                  <MDBCol sm="6">
                      <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
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
                </MDBRow><br/>
                <MDBRow className="mb-3 justify-content-center">
                  <MDBCol sm="6">
                    <button
                      className='btn btn-primary w-100'
                      onClick={saveCompany}
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
      <Footer/>
    </>
  );
}

export default EditCompanyProfile;
