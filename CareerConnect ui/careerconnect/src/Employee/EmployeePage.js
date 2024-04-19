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
import CustomNavbar from "../CustomNavbar";
import { useParams } from 'react-router-dom';
import { getEmployee, deleteEmployee } from '../Services/EmployeeService';
import { useNavigate } from 'react-router-dom';



const EmployeePage=()=>{
    const[name,setName]=useState('');
    const[surname,setSurname]=useState('');
    const[age,setAge]=useState('');
    const[address,setAddress]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[photo,setPhoto]=useState('');
    const[phone,setPhone]=useState('');
    const[jobPreferences,setJobPreferences]=useState('');
    const[skills,setSkills]=useState('');



const {id}=useParams();

useEffect(()=>{
    if(id){
        getEmployee(id).then((response)=>{
            setName(response.data.name);
            setSurname(response.data.surname);
            setAge(response.data.age);
            setAddress(response.data.address);
            setEmail(response.data.email);
            setPassword(response.data.password);
            setPhoto(response.data.photo);
            setPhone(response.data.phone);
            setJobPreferences(response.data.jobPreferences);
            setSkills(response.data.skills);
        }).catch(error=>{
            console.error(error);
        })
    }
}

,[id])

const navigator=useNavigate();

function updateEmployee(id){
    navigator(`/EditEmployee/${id}`);
    console.log(id);
}

function removeEmployee(id){
    console.log(id);

    deleteEmployee(id).then((response)=>{
        console.log(response.data);
        navigator(`/`);
    }).catch(error=>{
        console.error(error);
     })
}



return (
    <>
      <CustomNavbar />
      <MDBContainer className="py-5">


        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <img src="/3177440.png" alt="image"
                     className="rounded-circle"
                     style={{ width: '100px' }}
                     fluid />
                <p className="text-muted mb-1">{name}</p>
                <p className="text-muted mb-4">{surname}</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn onClick={()=>updateEmployee(id)}>Edit Profile</MDBBtn>
                </div>
                <br/>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn  className='btn btn-danger'onClick={()=>removeEmployee(id)}>Delete Profile</MDBBtn>
                </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Age</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{age}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{address}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
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
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{phone}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
      </MDBContainer>
    </>
  );
}

export default EmployeePage