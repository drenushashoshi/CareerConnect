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

  const { id } = useParams();
  const navigator = useNavigate();

  function saveCompany(e) {
    e.preventDefault();
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
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-3">
                  <MDBCol sm="6">
                    <span>Përshkrimi:</span>
                  </MDBCol>
                  <MDBCol sm="6">
                    <MDBInput
                      type="textarea"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
