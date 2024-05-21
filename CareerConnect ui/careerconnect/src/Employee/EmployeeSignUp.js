import React, { useState } from 'react';
import EmployeeService from '../Services/EmployeeService';
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
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [jobPreferences, setJobPreferences] = useState('');
  const [skills, setSkills] = useState('');
  const role = 'Employee'; 

  const navigator = useNavigate();

  const [nameTouched, setNameTouched] = useState(false);
  const [surnameTouched, setSurnameTouched] = useState(false);
  const [ageTouched, setAgeTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [addressTouched, setAddressTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [jobPreferencesTouched, setJobPreferencesTouched] = useState(false);
  const [skillsTouched, setSkillsTouched] = useState(false);

  const validateForm = () => {
    const isNameValid = name.trim() !== '';
    const isSurnameValid = surname.trim() !== '';
    const isAgeValid = age.trim() !== '';
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isAddressValid = address.trim() !== '';
    const isPasswordValid = password.trim() !== '';
    const isPhoneValid = phone.trim() !== '';
    const isJobPreferencesValid = jobPreferences.trim() !== '';
    const isSkillsValid = skills.trim() !== '';

    setNameTouched(!isNameValid);
    setSurnameTouched(!isSurnameValid);
    setAgeTouched(!isAgeValid);
    setEmailTouched(!isEmailValid);
    setAddressTouched(!isAddressValid);
    setPhoneTouched(!isPhoneValid);
    setPasswordTouched(!isPasswordValid);
    setJobPreferencesTouched(!isJobPreferencesValid);
    setSkillsTouched(!isSkillsValid);

    return (
      isNameValid &&
      isSurnameValid &&
      isAgeValid &&
      isEmailValid &&
      isAddressValid &&
      isPhoneValid &&
      isPasswordValid &&
      isJobPreferencesValid &&
      isSkillsValid
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isFormValid = validateForm();

      if (isFormValid) {
        const employeeData = { name, surname, email, address, age, phone, password,jobPreferences, skills, role };

        const data=await EmployeeService.register(employeeData);

        if(data.token){
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', role);
          sessionStorage.setItem('employeeId', data.id);
          navigator('/EmployeePage');
        } else {
          alert(data.message || 'Registration failed');
        }
       
      }
    } catch (error) {
      console.error('Error registering employee', error);
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
                        invalid={nameTouched && !name.trim()}
                      />
                      {nameTouched && !name.trim() && <div className="text-danger">Name is required</div>}
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
                        invalid={surnameTouched && !surname.trim()}
                      />
                      {surnameTouched && !surname.trim() && <div className="text-danger">Surname is required</div>}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Email'
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setEmailTouched(true)}
                        invalid={emailTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                      />
                      {emailTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && <div className="text-danger">Invalid email</div>}
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
                        invalid={addressTouched && !address.trim()}
                      />
                      {addressTouched && !address.trim() && <div className="text-danger">Address is required</div>}
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
                        invalid={phoneTouched && !phone.trim()}
                      />
                      {phoneTouched && !phone.trim() && <div className="text-danger">Phone number is required</div>}
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Age'
                        id='age'
                        type='text'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        onBlur={() => setAgeTouched(true)}
                        invalid={ageTouched && !age.trim()}
                      />
                      {ageTouched && !age.trim() && <div className="text-danger">Age is required</div>}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Password'
                        id='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setPasswordTouched(true)}
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
                        invalid={jobPreferencesTouched && !jobPreferences.trim()}
                      />
                      {jobPreferencesTouched && !jobPreferences.trim() && <div className="text-danger">Job preferences are required</div>}
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
                        invalid={skillsTouched && !skills.trim()}
                      />
                      {skillsTouched && !skills.trim() && <div className="text-danger">Skills are required</div>}
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
  );
}

export default EmployeeSignUp;
