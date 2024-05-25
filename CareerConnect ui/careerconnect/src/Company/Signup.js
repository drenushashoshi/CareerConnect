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
import ClipLoader from 'react-spinners/ClipLoader';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [opening_year, setOpeningYear] = useState('');
  const [description, setDescription] = useState('');
  const role = 'Company';
  const navigator = useNavigate();

  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [addressTouched, setAddressTouched] = useState(false);
  const [phone_numberTouched, setPhoneNumberTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [repeatPasswordTouched, setRepeatPasswordTouched] = useState(false);
  const [opening_yearTouched, setOpeningYearTouched] = useState(false);
  const [descriptionTouched, setDescriptionTouched] = useState(false);

  const [loading, setLoading] = useState(false);

  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
  const isRepeatPasswordValid = repeatPassword === password;
  const isNameValid = name.trim() !== '' && /^[A-Z]/.test(name);
  const isAddressValid = address.trim() !== '' && /^[A-Z]/.test(address);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneNumberValid = phone_number.trim() !== '';
  const isOpeningYearValid = opening_year.trim() !== '';
  const isDescriptionValid = description.trim() !== '';

  const validateForm = () => {
    setNameTouched(true);
    setEmailTouched(true);
    setAddressTouched(true);
    setPhoneNumberTouched(true);
    setPasswordTouched(true);
    setRepeatPasswordTouched(true);
    setOpeningYearTouched(true);
    setDescriptionTouched(true);

    return (
      isNameValid &&
      isEmailValid &&
      isAddressValid &&
      isPhoneNumberValid &&
      isPasswordValid &&
      isRepeatPasswordValid &&
      isOpeningYearValid &&
      isDescriptionValid
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }
    setLoading(true);
    try {
      const companyData = { name, email, address, phone_number, password, opening_year, description, role };
      const data = await CompanyService.register(companyData);
      if (data.token) {
        setTimeout(() => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', role);
          sessionStorage.setItem('companyId', data.id);
          setLoading(false);
          navigator('/CompanyPage');
        }, 4000);
      } else {
        setLoading(false);
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering company', error);
      setLoading(false);
      alert('Error registering company');
    }
  };
  return (
    <div>
      <MDBContainer fluid className='p-4'>
        <MDBRow>
          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
            <h1 className="my-5 display-3 fw-bold ls-tight px-3">
              Oferta më e mirë <br />
              <span className="text-primary">për biznesin tuaj</span>
            </h1>
          </MDBCol>
          <MDBCol md='6'>
            <MDBCard className='my-5'>
              <MDBCardBody className='p-5'>
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: '400px' }}>
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                    <p className="mt-3">Setting up your data</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <MDBRow>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass=''
                          placeholder='Emri'
                          id='name'
                          type='text'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onBlur={() => setNameTouched(true)}
                          invalid={nameTouched && (!name.trim() || !isNameValid)}
                        />
                        {nameTouched && (!name.trim() || !isNameValid) && <div className="text-danger">Shkruani emrin</div>}
                      </MDBCol>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass=''
                          placeholder='Email Adresa'
                          id='email'
                          type='email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={() => setEmailTouched(true)}
                          invalid={emailTouched && !isEmailValid}
                        />
                        {emailTouched && !isEmailValid && <div className="text-danger">Email adresë jo-valide</div>}
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mt-4'
                          placeholder='Adresa'
                          id='address'
                          type='text'
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          onBlur={() => setAddressTouched(true)}
                          invalid={addressTouched && (!address.trim() || !isAddressValid)}
                        />
                        {addressTouched && (!address.trim() || !isAddressValid) && <div className="text-danger">Shkruani adresën</div>}
                      </MDBCol>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mt-4'
                          placeholder='Numri kontaktues'
                          id='phone_number'
                          type='text'
                          value={phone_number}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          onBlur={() => setPhoneNumberTouched(true)}
                          invalid={phone_numberTouched && !isPhoneNumberValid}
                        />
                        {phone_numberTouched && !isPhoneNumberValid && <div className="text-danger">Shkruani numrin kontaktues</div>}
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mt-4'
                          placeholder='Fjalëkalimi'
                          id='password'
                          type='password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onBlur={() => setPasswordTouched(true)}
                          invalid={passwordTouched && (!password.trim() || !isPasswordValid)}
                        />
                        {passwordTouched && (!password.trim() || !isPasswordValid) && <div className="text-danger">Fjalëkalimi duhet të përfshijë shkronjë të madhe dhe numër</div>}
                      </MDBCol>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mt-4'
                          placeholder='Përsërit fjalëkalimin'
                          id='repeatPassword'
                          type='password'
                          value={repeatPassword}
                          onChange={(e) => setRepeatPassword(e.target.value)}
                          onBlur={() => setRepeatPasswordTouched(true)}
                          invalid={repeatPasswordTouched && (repeatPassword !== password || !isRepeatPasswordValid)}
                        />
                        {repeatPasswordTouched && (repeatPassword !== password || !isRepeatPasswordValid) && <div className="text-danger">Fjalëkalimet nuk janë të njëjta</div>}
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md='12'>
                        <MDBInput
                          wrapperClass='mt-4'
                          placeholder='Viti i hapjes'
                          id='opening_year'
                          type='text'
                          value={opening_year}
                          onChange={(e) => setOpeningYear(e.target.value)}
                          onBlur={() => setOpeningYearTouched(true)}
                          invalid={opening_yearTouched && !isOpeningYearValid}
                        />
                        {opening_yearTouched && !isOpeningYearValid && <div className="text-danger">Shkruani vitin e hapjes</div>}
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
                          verticalAlign: 'top'
                        }}
                        placeholder="Përshkruani kompaninë tuaj..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={() => setDescriptionTouched(true)}
                      ></textarea>
                      {descriptionTouched && !isDescriptionValid && <div className="text-danger">Përshkrimi është i nevojshëm</div>}
                    </div>
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
                      Regjistrohu 
                    </MDBBtn>
                  </form>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </div>
  );
}

export default Signup;
