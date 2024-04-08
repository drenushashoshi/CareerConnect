import React, { useState } from 'react';
import { createCompany } from './Services/CompanyService';
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
import './styles.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [openingYear, setOpeningYear] = useState('');
  const [description, setDescription] = useState('');

  const navigator=useNavigate();


  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [addressTouched, setAddressTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [repeatPasswordTouched, setRepeatPasswordTouched] = useState(false);
  const [openingYearTouched, setOpeningYearTouched] = useState(false);
  const [descriptionTouched, setDescriptionTouched] = useState(false);


  const validateForm = () => {
    const isNameValid = name.trim() !== '';
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isAddressValid = address.trim() !== '';
    const isPhoneValid = phone.trim() !== '';
    const isPasswordValid = password.trim() !== '';
    const isRepeatPasswordValid = repeatPassword === password;
    const isOpeningYearValid = openingYear.trim() !== '';
    const isDescriptionValid = description.trim() !== '';

    setNameTouched(true);
    setEmailTouched(true);
    setAddressTouched(true);
    setPhoneTouched(true);
    setPasswordTouched(true);
    setRepeatPasswordTouched(true);
    setOpeningYearTouched(true);
    setDescriptionTouched(true);

  
    return (
      isNameValid &&
      isEmailValid &&
      isAddressValid &&
      isPhoneValid &&
      isPasswordValid &&
      isRepeatPasswordValid &&
      isOpeningYearValid &&
      isDescriptionValid
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const company={name, email, address, phone, password, openingYear, description}
    console.log(company)
    createCompany(company).then((response)=>{
      console.log(response.data);
      navigator('/CompanyList')
    })
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
                        invalid={nameTouched && !name.trim()}
                      />
                      {nameTouched && !name.trim() && <div className="text-danger">Name is required</div>}
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
                        invalid={emailTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                      />
                      {emailTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && <div className="text-danger">Invalid email</div>}
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
                        invalid={addressTouched && !address.trim()}
                      />
                      {addressTouched && !address.trim() && <div className="text-danger">Address is required</div>}
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Phone'
                        id='phone'
                        type='text'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() => setPhoneTouched(true)}
                        invalid={phoneTouched && !phone.trim()}
                      />
                      {phoneTouched && !phone.trim() && <div className="text-danger">Phone is required</div>}
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
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Repeat Password'
                        id='repeatPassword'
                        type='password'
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        onBlur={() => setRepeatPasswordTouched(true)}
                        invalid={repeatPasswordTouched && repeatPassword !== password}
                      />
                      {repeatPasswordTouched && repeatPassword !== password && <div className="text-danger">Passwords do not match</div>}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='12'>
                      <MDBInput
                        wrapperClass='mt-4'
                        placeholder='Opening year'
                        id='openingYear'
                        type='text'
                        value={openingYear}
                        onChange={(e) => setOpeningYear(e.target.value)}
                        onBlur={() => setOpeningYearTouched(true)}
                        invalid={openingYearTouched && !openingYear.trim()}
                      />
                      {openingYearTouched && !openingYear.trim() && <div className="text-danger">Opening year is required</div>}
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
                      invalid={descriptionTouched && !description.trim()}
                    />
                    {descriptionTouched && !description.trim() && <div className="text-danger">Description is required</div>}
                  </div>
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

export default Signup;
