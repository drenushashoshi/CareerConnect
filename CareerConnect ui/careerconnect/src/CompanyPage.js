import React, { useState, useEffect } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBBtn
} from 'mdb-react-ui-kit';
import CostumNavbar from "./CostumNavbar";
import { useParams } from 'react-router-dom';
import { getCompany } from './Services/CompanyService';

const CompanyPage=()=> {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setphone_number] = useState('');
  const [opening_year, setopening_year] = useState('');
  const [description, setDescription] = useState('');

  const {id}=useParams();

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
      <><CostumNavbar /><MDBContainer className="py-5">


      <MDBRow>
        <MDBCol lg="4">
          <MDBCard className="mb-4">
            <MDBCardBody className="text-center">
              <img src="/3177440.png" alt="image"
                className="rounded-circle"
                style={{ width: '100px' }}
                fluid />
              <p className="text-muted mb-1">{name}</p>
              <p className="text-muted mb-4">{address}</p>
              <div className="d-flex justify-content-center mb-2">
                <MDBBtn>Edit Profile</MDBBtn>
              </div>
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
                  <MDBCardText className="text-muted">{email}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Phone Number</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{phone_number}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Opening Year</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{opening_year}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Description</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{description}</MDBCardText>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer></>
  );
}
export default CompanyPage
