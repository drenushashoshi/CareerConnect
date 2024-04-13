import React, { useState, useEffect } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';

import { useParams, useNavigate } from 'react-router-dom';
import { getCompany, updateCompany } from './Services/CompanyService';
import CostumNavbar from "./CostumNavbar";

const EditCompanyProfile=()=> {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setphone_number] = useState('');
  const [opening_year, setopening_year] = useState('');
  const [description, setDescription] = useState('');

  const {id}=useParams();

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
  

  useEffect(()=>{
    if(id){
      getCompany(id).then((response)=>{
        setName(response.data.name);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setphone_number(response.data.phone_number);
        setopening_year(response.data.opening_year);
        setDescription(response.data.description);
      }).catch(error=>{
        console.error(error);
      })
    }
  },[id])

    return (
        <>
        <CostumNavbar /><MDBContainer className="py-5"></MDBContainer>
        <MDBContainer className="py-5">


        <MDBRow>
            <MDBCol lg="4">
            <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                <img src="/3177440.png" alt="image"
                    className="rounded-circle"
                    style={{ width: '100px' }}
                    fluid />
                <br/><br/>
                
                <MDBInput
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                />
                <br/>
                <MDBInput
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
            <MDBCard className="mb-4">
                <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <MDBInput
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone Number</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <MDBInput
                      type="text"
                      value={phone_number}
                      onChange={(e) => setphone_number(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Opening Year</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="text"
                      value={opening_year}
                      onChange={(e) => setopening_year(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Description</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      type="textarea"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>
                <hr/>
                <br/>
                <MDBBtn
                        className='w-50 mb-3 justify-content-center'
                        size='md'
                        type="submit"
                        onClick={saveCompany}
                    >
                    Save
                    </MDBBtn>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
        </MDBContainer></>
    );
}
export default EditCompanyProfile
