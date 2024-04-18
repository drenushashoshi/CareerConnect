import React, { useState } from 'react';
import { createEmployee } from '../Services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';


function EmployeeSignUp() {
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
  

  const navigator=useNavigate();


  const [NameTouched, setNameTouched] = useState(false);
  const [SurnameTouched, setSurnameTouched] = useState(false);
  const [AgeTouched, setAgeTouched] = useState(false);
  const [EmailTouched, setEmailTouched] = useState(false);
  const [AddressTouched, setAddressTouched] = useState(false);
  const [passwordTouched, setpasswordTouched] = useState(false);
  const [PhoneTouched, setPhoneTouched] = useState(false);
  const [PhotoTouched, setPhotoTouched] = useState(false);
  const [JobPreferencesTouched, setJobPreferencesTouched] = useState(false);
  const [SkillsTouched, setSkillsTouched] = useState(false);
 


  const validateForm = () => {
    const isNameValid = Name.trim() !== '';
    const isSurnameValid=Surname.trim()!=='';
    const isAgeValid=Age.trim()!=='';
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email);
    const isAddressValid = Address.trim() !== '';
    const ispasswordValid = password.trim() !== '';
    const isPhoneValid = Phone.trim() !== '';
    const isPhotoValid=Photo.trim()!=='';
    const isJobPreferencesValid=JobPreferences.trim()!=='';
    const isSkillsValid=Skills.trim()!=='';


  
    setNameTouched(!isNameValid);
    setSurnameTouched(!isSurnameValid);
    setAgeTouched(!isAgeValid);
    setEmailTouched(!isEmailValid);
    setAddressTouched(!isAddressValid);
    setPhoneTouched(!isPhoneValid);
    setpasswordTouched(!ispasswordValid);
    setPhotoTouched(!isPhotoValid);
    setNameTouched(!isJobPreferencesValid);
    setSkillsTouched(!isSkillsValid);
 
  
    return (
      isNameValid &&
      isSurnameValid&&
      isAgeValid&&
      isEmailValid &&
      isAddressValid &&
      isPhoneValid &&
      ispasswordValid &&
      isPhotoValid&&
      isJobPreferencesValid&&
      isSkillsValid
    );
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isFormValid = validateForm(); 
  
    if (isFormValid) {
      const employee = { Name,Surname, Email, Address,Age, Phone, password,Photo, JobPreferences,Skills};
      console.log(employee);
      createEmployee(employee).then((response) => {
        console.log(response.data);
        navigator('/EmployeeList');
      });
    }
    
  };
  

  return (
    <div>
      <MDBContainer fluid className='p-4'>
        <MDBRow>
          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
            <h1 className="my-5 display-3 fw-bold ls-tight px-3">
              The best offer <br />
              <span className="text-primary">for your career</span>
            </h1>
          </MDBCol>
          <MDBCol md='6'>
            <MDBCard className='my-5'>
              <MDBCardBody className='p-5'>
                <form onSubmit={handleSubmit}>
                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass=''
                        placeholder='Name'
                        id='Name'
                        type='text'
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setNameTouched(true)}
                        invalid={NameTouched && !Name.trim()}
                      />
                      {NameTouched && !Name.trim() && <div className="text-danger">Name is required</div>}
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass=''
                        placeholder='Surname'
                        id='Surname'
                        type='text'
                        value={Surname}
                        onChange={(e) => setSurname(e.target.value)}
                        onBlur={() => setSurnameTouched(true)}
                        invalid={SurnameTouched && !Surname.trim()}
                      />
                      {SurnameTouched && !Surname.trim() && <div className="text-danger">Surname is required</div>}
                    </MDBCol>
                    
                  </MDBRow>
                  <MDBRow>
                  <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Email'
                        id='Email'
                        type='Email'
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setEmailTouched(true)}
                        invalid={EmailTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)}
                      />
                      {EmailTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email) && <div className="text-danger">Invalid email</div>}
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Address'
                        id='Address'
                        type='text'
                        value={Address}
                        onChange={(e) => setAddress(e.target.value)}
                        onBlur={() => setAddressTouched(true)}
                        invalid={AddressTouched && !Address.trim()}
                      />
                      {AddressTouched && !Address.trim() && <div className="text-danger">Address is required</div>}
                    </MDBCol>
    
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Phone Number'
                        id='Phone'
                        type='text'
                        value={Phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() => setPhoneTouched(true)}
                        invalid={PhoneTouched && !Phone.trim()}
                      />
                      {PhoneTouched && !Phone.trim() && <div className="text-danger">phone number is required</div>}
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Age'
                        id='Age'
                        type='text'
                        value={Age}
                        onChange={(e) => setAge(e.target.value)}
                        onBlur={() => setAgeTouched(true)}
                        invalid={AgeTouched && !Age.trim()}
                      />
                      {AgeTouched && !Age.trim() && <div className="text-danger">Age is required</div>}
                    </MDBCol>
    
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Photo'
                        id='Photo'
                        type='text'
                        value={Photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        onBlur={() => setPhotoTouched(true)}
                        invalid={PhotoTouched && !Photo.trim()}
                      />
                      {PhotoTouched && !Photo.trim() && <div className="text-danger">photo is required</div>}
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Password'
                        id='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setpasswordTouched(true)}
                        invalid={passwordTouched && !password.trim()}
                      />
                      {passwordTouched && !password.trim() && <div className="text-danger">Password is required</div>}
                    </MDBCol>
    
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Job Preferences'
                        id='JobPreferences'
                        type='text'
                        value={JobPreferences}
                        onChange={(e) => setJobPreferences(e.target.value)}
                        onBlur={() => setJobPreferencesTouched(true)}
                        invalid={JobPreferencesTouched && !JobPreferences.trim()}
                      />
                      {JobPreferencesTouched && !JobPreferences.trim() && <div className="text-danger">Job preferences is required</div>}
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Skills'
                        id='Skills'
                        type='text'
                        value={Skills}
                        onChange={(e) => setSkills(e.target.value)}
                        onBlur={() => setSkillsTouched(true)}
                        invalid={SkillsTouched && !Skills.trim()}
                      />
                      {SkillsTouched && !Skills.trim() && <div className="text-danger">Skills is required</div>}
                    </MDBCol>
    
                  </MDBRow>
                  
                
                  
                  <br/>
                  <div className="d-flex justify-content-center">
                        <MDBBtn
                            className='w-50 mb-3'
                            size='md'
                            type="submit"
                            style={{
                                width: '50%', 
                                height: '40px', 
                                lineHeight: '40px', 
                                fontSize: '16px', 
                                padding: '0', 
                            }}
                            >
                            Sign up 
                        </MDBBtn>

                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}

export default EmployeeSignUp;
