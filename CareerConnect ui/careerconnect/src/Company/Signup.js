import React, { useState } from 'react';
import CompanyService from '../Services/CompanyService';
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
import Footer from '../Footer';


function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setphone_number] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [opening_year, setopening_year] = useState('');
  const [description, setDescription] = useState('');
  const [role, setRole] = useState('');
  

  const navigator=useNavigate();


  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [addressTouched, setAddressTouched] = useState(false);
  const [phone_numberTouched, setphone_numberTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [repeatPasswordTouched, setRepeatPasswordTouched] = useState(false);
  const [opening_yearTouched, setopening_yearTouched] = useState(false);
  const [descriptionTouched, setDescriptionTouched] = useState(false);
 
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
  const isRepeatPasswordValid = repeatPassword === password;
  const isNameValid = name.trim() !== '' && /^[A-Z]/.test(name);
  const isAddressValid = address.trim() !== '' && /^[A-Z]/.test(address);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isphone_numberValid = phone_number.trim() !== '';
  const isopening_yearValid = opening_year.trim() !== '';
  const isDescriptionValid = description.trim() !== '';

  const validateForm = () => {
    setNameTouched(true);
    setEmailTouched(true);
    setAddressTouched(true);
    setphone_numberTouched(true);
    setPasswordTouched(true);
    setRepeatPasswordTouched(true);
    setopening_yearTouched(true);
    setDescriptionTouched(true);
  
    return (
      isNameValid &&
      isEmailValid &&
      isAddressValid &&
      isphone_numberValid &&
      isPasswordValid &&
      isRepeatPasswordValid &&
      isopening_yearValid &&
      isDescriptionValid
    );
  };
  
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const isFormValid = validateForm(); 
    
      if (isFormValid) {
        const companyData = { name, email, address, phone_number, password, opening_year, description, role};
        const token=localStorage.getItem('token');
        
        await CompanyService.register(companyData, token);

        alert('Company registered successfully!');
        navigator('/CompanyPage')
      }
    }catch(error){
      console.error('Error registering company ', error);

    }
  };
  

  return (
    <div>
      <MDBContainer fluid className='p-4'>
        <MDBRow>
          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
            <h1 className="my-5 display-3 fw-bold ls-tight px-3">
              The best offer <br />
              <span className="text-primary">for your business</span>
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
                        invalid={nameTouched && (!name.trim() || !isNameValid)}
                      />
                      {nameTouched && (!name.trim() || !isNameValid) && <div className="text-danger">Name is required and must start with a capital letter</div>}
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass=''
                        placeholder='Email'
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setEmailTouched(true)}
                        invalid={emailTouched && !isEmailValid}
                      />
                      {emailTouched && !isEmailValid && <div className="text-danger">Invalid email</div>}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Address'
                        id='address'
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onBlur={() => setAddressTouched(true)}
                        invalid={addressTouched && (!address.trim() || !isAddressValid)}
                      />
                      {addressTouched && (!address.trim() || !isAddressValid) && <div className="text-danger">Address is required and must start with a capital letter</div>}
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Phone Number'
                        id='phone_number'
                        type='text'
                        value={phone_number}
                        onChange={(e) => setphone_number(e.target.value)}
                        onBlur={() => setphone_numberTouched(true)}
                        invalid={phone_numberTouched && !isphone_numberValid}
                      />
                      {phone_numberTouched && !isphone_numberValid && <div className="text-danger">Phone number is required</div>}
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
                        invalid={passwordTouched && (!password.trim() || !isPasswordValid)}
                      />
                      {passwordTouched && (!password.trim() || !isPasswordValid) && <div className="text-danger">Password is required and must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number</div>}
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Repeat Password'
                        id='repeatPassword'
                        type='password'
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        onBlur={() => setRepeatPasswordTouched(true)}
                        invalid={repeatPasswordTouched && (repeatPassword !== password || !isRepeatPasswordValid)}
                      />
                      {repeatPasswordTouched && (repeatPassword !== password || !isRepeatPasswordValid) && <div className="text-danger">Passwords do not match</div>}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='12'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Opening year'
                        id='opening_year'
                        type='text'
                        value={opening_year}
                        onChange={(e) => setopening_year(e.target.value)}
                        onBlur={() => setopening_yearTouched(true)}
                        invalid={opening_yearTouched && !isopening_yearValid}
                      />
                      {opening_yearTouched && !isopening_yearValid && <div className="text-danger">Opening year is required</div>}
                    </MDBCol>
                  </MDBRow>
                  <div className="mt-4 mb-4">
                    <textarea
                      className="form-control"
                      id="description"
                      style={{
                        height: '150px',
                        paddingTop: '10px',
                        paddingLeft: '10px',
                        resize: 'none', 
                        verticalAlign: 'top',
                        textAlign: 'left'
                      }}
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      onBlur={() => setDescriptionTouched(true)}
                      invalid={descriptionTouched && !isDescriptionValid}
                    />
                    {descriptionTouched && !isDescriptionValid && <div className="text-danger">Description is required</div>}
                  </div>
                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Role'
                        id='role'
                        type='text'
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                      
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
      <Footer/>
    </div>
  )
}

export default Signup;
