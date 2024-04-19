import React,{useState,useEffect} from 'react';
import{
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';


import { useParams,useNavigate } from 'react-router-dom';
import { getEmployee,updateEmployee } from '../Services/EmployeeService';
import CustomNavbar from "../CustomNavbar";

const EditEmployee=()=>{
    const[name,setName]=useState('');
    const[surname,setSurname]=useState('');
    const[age,setAge]=useState('');
    const[address,setAdress]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[photo,setPhoto]=useState('');
    const[phone,setPhone]=useState('');
    const[jobPreferences,setJobPreferences]=useState('');
    const[skills,setSkills]=useState('');



const {id}=useParams();

const navigator = useNavigate();

function saveEmployee(e){
    e.preventDefault();
    const employee ={name,surname,age,address,email,password,photo,phone,jobPreferences,skills};
    if(id){
        updateEmployee(id,employee).then((response) => {
            console.log(response.data);
            navigator(`/EmployeePage/${id}`);
        })
        .catch(error=>{
            console.error("Error updating employee:",error);
        });

    }
}
useEffect(()=>{
    if(id){
        getEmployee(id).then((response)=>{
            setName(response.data.name);
            setSurname(response.data.surname);
            setAge(response.data.age);
            setAdress(response.data.address);
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

    return(
        <>
        <CustomNavbar/><MDBContainer className="py-5"></MDBContainer>
            <MDBContainer className="py-5">



                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                            <img src='/3177440.png' alt="image"
                                 className="rounded-circle"
                                 style={{width:'100px'}}
                                 fluid/>
                        <br></br>

                        <MDBInput
                                 type="text"
                                 value={name}
                                 onChange={(e)=> setName(e.target.value)}
                            />
                            <br/>
                         <MDBInput
                                 type="text"
                                 value={surname}
                                 onChange={(e)=> setSurname(e.target.value)}
                                 />
                                
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
                        <MDBInput
                            type="text"
                            value={email}
                            onChange={(e)=> setAge(e.target.value)}
                            />
                         </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                            <MDBCol sm="3">
                                <MDBCardText>Adress</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                <MDBInput
                                type="text"
                                value={address}
                                onChange={(e)=> setAdress(e.target.value)}
                                />
                            </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                            <MDBCol sm="3">
                                <MDBCardText>Email</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                <MDBInput
                                type="text"
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                />
                            </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                            <MDBCol sm="3">
                                <MDBCardText>Password</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                <MDBInput
                                type="text"
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                />
                            </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                            <MDBCol sm="3">
                                <MDBCardText>Photo</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                <MDBInput
                                type="text"
                                value={photo}
                                onChange={(e)=> setPhoto(e.target.value)}
                                />
                            </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                            <MDBCol sm="3">
                                <MDBCardText>Phone</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                <MDBInput
                                type="text"
                                value={phone}
                                onChange={(e)=> setPhone(e.target.value)}
                                />
                            </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                            <MDBCol sm="3">
                                <MDBCardText>JobPreferences</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                <MDBInput
                                type="text"
                                value={jobPreferences}
                                onChange={(e)=> setJobPreferences(e.target.value)}
                                />
                            </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                            <MDBCol sm="3">
                                <MDBCardText>Skills</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                <MDBInput
                                type="text"
                                value={skills}
                                onChange={(e)=> setSkills(e.target.value)}
                                />
                            </MDBCol>
                        </MDBRow>
                        <hr/>
                        <br/>
                        <MDBBtn
                            className='w-50 mb-3 justify-content-center'
                            size='md'
                            type="submit"
                            onClick={saveEmployee}
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
export default EditEmployee

