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
    const isNameValid = name.trim() !== '';
    const isSurnameValid=surname.trim()!=='';
    const isAgeValid=age.trim()!=='';
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isAddressValid = address.trim() !== '';
    const ispasswordValid = password.trim() !== '';
    const isPhoneValid = phone.trim() !== '';
    const isPhotoValid=photo.trim()!=='';
    const isJobPreferencesValid=jobPreferences.trim()!=='';
    const isSkillsValid=skills.trim()!=='';


  
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
      const employee = { name,surname, email, address,age, phone, password,photo, jobPreferences,skills};
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
                        id='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setNameTouched(true)}
                        invalid={NameTouched && !name.trim()}
                      />
                      {NameTouched && !name.trim() && <div className="text-danger">Name is required</div>}
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass=''
                        placeholder='Surname'
                        id='surname'
                        type='text'
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        onBlur={() => setSurnameTouched(true)}
                        invalid={SurnameTouched && !surname.trim()}
                      />
                      {SurnameTouched && !surname.trim() && <div className="text-danger">Surname is required</div>}
                    </MDBCol>
                    
                  </MDBRow>
                  <MDBRow>
                  <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Email'
                        id='email'
                        type='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setEmailTouched(true)}
                        invalid={EmailTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                      />
                      {EmailTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && <div className="text-danger">Invalid email</div>}
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Address'
                        id='address'
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onBlur={() => setAddressTouched(true)}
                        invalid={AddressTouched && !address.trim()}
                      />
                      {AddressTouched && !address.trim() && <div className="text-danger">Address is required</div>}
                    </MDBCol>
    
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Phone Number'
                        id='phone'
                        type='text'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() => setPhoneTouched(true)}
                        invalid={PhoneTouched && !phone.trim()}
                      />
                      {PhoneTouched && !phone.trim() && <div className="text-danger">phone number is required</div>}
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Age'
                        id='Age'
                        type='text'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        onBlur={() => setAgeTouched(true)}
                        invalid={AgeTouched && !age.trim()}
                      />
                      {AgeTouched && !age.trim() && <div className="text-danger">Age is required</div>}
                    </MDBCol>
    
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Photo'
                        id='photo'
                        type='text'
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        onBlur={() => setPhotoTouched(true)}
                        invalid={PhotoTouched && !photo.trim()}
                      />
                      {PhotoTouched && !photo.trim() && <div className="text-danger">photo is required</div>}
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
                        id='jobPreferences'
                        type='text'
                        value={jobPreferences}
                        onChange={(e) => setJobPreferences(e.target.value)}
                        onBlur={() => setJobPreferencesTouched(true)}
                        invalid={JobPreferencesTouched && !jobPreferences.trim()}
                      />
                      {JobPreferencesTouched && !jobPreferences.trim() && <div className="text-danger">Job preferences is required</div>}
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Skills'
                        id='skills'
                        type='text'
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        onBlur={() => setSkillsTouched(true)}
                        invalid={SkillsTouched && !skills.trim()}
                      />
                      {SkillsTouched && !skills.trim() && <div className="text-danger">Skills is required</div>}
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
