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
    const[Name,setName]=useState('');
    const[Surname,setSurname]=useState('');
    const[Age,setAge]=useState('');
    const[Address,setAddress]=useState('');
    const[Email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[Photo,setPhoto]=useState('');
    const[Phone,setPhone]=useState('');
    const[JobPreferences,setJobPreferences]=useState('');
    const[Skills,setSkills]=useState('');



const {id}=useParams();

useEffect(()=>{
    if(id){
        getEmployee(id).then((response)=>{
            setName(response.data.Name);
            setSurname(response.data.Surname);
            setAge(response.data.Age);
            setAdress(response.data.Adress);
            setEmail(response.data.Email);
            setPassword(response.data.password);
            setPhoto(response.data.Photo);
            setPhone(response.data.Phone);
            setJobPreferences(response.data.JobPreferences);
            setSkills(response.data.Skills);
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
                <p className="text-muted mb-1">{Name}</p>
                <p className="text-muted mb-4">{Surname}</p>
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
                      <MDBCardText className="text-muted">{Age}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{Adress}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{Email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{Phone}</MDBCardText>
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