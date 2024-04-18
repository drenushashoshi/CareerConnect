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
    const[Name,setName]=useState('');
    const[Surname,setSurname]=useState('');
    const[Age,setAge]=useState('');
    const[Adress,setAdress]=useState('');
    const[Email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[Photo,setPhoto]=useState('');
    const[Phone,setPhone]=useState('');
    const[JobPreferences,setJobPreferences]=useState('');
    const[Skills,setSkills]=useState('');



const {id}=useParams();

const navigator = useNavigate();

function saveEmployee(e){
    e.preventDefault();
    const employee ={Name,Surname,Age,Adress,Email,password,Photo,Phone,JobPreferences,Skills};
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
                                 value={Name}
                                 onChange={(e)=> setName(e.target.value)}
                            />
                            <br/>
                         <MDBInput
                                 type="text"
                                 value={Surname}
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
                            value={Email}
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
                                value={Adress}
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
                                value={Email}
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
                                value={Photo}
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
                                value={Phone}
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
                                value={JobPreferences}
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
                                value={Skills}
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

