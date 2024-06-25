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
import ClipLoader from 'react-spinners/ClipLoader';

function EmployeeSignUp() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
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
  const [repeatPasswordTouched, setRepeatPasswordTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [jobPreferencesTouched, setJobPreferencesTouched] = useState(false);
  const [skillsTouched, setSkillsTouched] = useState(false);

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const isNameValid = /^[A-Z][a-z]*$/.test(name.trim());
    const isSurnameValid = /^[A-Z][a-z]*$/.test(surname.trim());
    const isAgeValid = age.trim() !== '';
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isAddressValid = /^[A-Z][a-zA-Z0-9\s]*$/.test(address.trim());
    const isPasswordValid = /^(?=.*\d).{8,}$/.test(password);
    const isRepeatPasswordValid = repeatPassword === password;
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
    setRepeatPasswordTouched(!isRepeatPasswordValid);
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
      isRepeatPasswordValid &&
      isJobPreferencesValid &&
      isSkillsValid
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isFormValid = validateForm();

      if (isFormValid) {
        setLoading(true);
        const employeeData = { name, surname, email, address, age, phone, password, jobPreferences, skills, role };
        
        const data = await EmployeeService.register(employeeData);

        if (data.token) {
          setTimeout(() => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', role);
            sessionStorage.setItem('employeeId', data.id);
            localStorage.setItem('refreshToken', data.refreshToken);
            const expirationTime = EmployeeService.parseExpirationTime(data.expirationTime);
            localStorage.setItem('tokenExpiry', expirationTime);
            setLoading(false);
            navigator('/EmployeePage/'+data.id);
          }, 2000);
        } else {
          setLoading(false);
          alert(data.message || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Error registering employee', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <MDBContainer fluid className='p-4'>
        <MDBRow>
          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
            <h1 className="my-5 display-3 fw-bold ls-tight px-3">
              Mundësia më e mirë <br />
              <span className="text-primary">për karierën tuaj!</span>
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
                          invalid={nameTouched && !/^[A-Z][a-z]*$/.test(name.trim())}
                        />
                        {nameTouched && !/^[A-Z][a-z]*$/.test(name.trim()) && <div className="text-danger">Name must start with a capital letter and contain only letters</div>}
                      </MDBCol>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass=''
                          placeholder='Mbiemri'
                          id='surname'
                          type='text'
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                          onBlur={() => setSurnameTouched(true)}
                          invalid={surnameTouched && !/^[A-Z][a-z]*$/.test(surname.trim())}
                        />
                        {surnameTouched && !/^[A-Z][a-z]*$/.test(surname.trim()) && <div className="text-danger">Surname must start with a capital letter and contain only letters</div>}
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mt-4'
                          placeholder='Email-adresa'
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
                          placeholder='Adresa'
                          id='address'
                          type='text'
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          onBlur={() => setAddressTouched(true)}
                          invalid={addressTouched && !/^[A-Z][a-zA-Z0-9\s]*$/.test(address.trim())}
                        />
                        {addressTouched && !/^[A-Z][a-zA-Z0-9\s]*$/.test(address.trim()) && <div className="text-danger">Address must start with a capital letter</div>}
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mt-4'
                          placeholder='Numri kontaktues'
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
                          placeholder='Mosha'
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
                          placeholder='Fjalëkalimi'
                          id='password'
                          type='password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onBlur={() => setPasswordTouched(true)}
                          invalid={passwordTouched && !/^(?=.*\d).{8,}$/.test(password)}
                        />
                        {passwordTouched && !/^(?=.*\d).{8,}$/.test(password) && <div className="text-danger">Password must be at least 8 characters long and contain at least one number</div>}
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
                          invalid={repeatPasswordTouched && (repeatPassword !== password || !repeatPassword.trim())}
                        />
                        {repeatPasswordTouched && repeatPassword !== password && <div className="text-danger">Passwords do not match</div>}
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mt-4'
                          placeholder='Preferencat për punë'
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
                          placeholder='Aftësitë e juaja'
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
                        Regjistrohu
                      </MDBBtn>
                    </div>
                  </form>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default EmployeeSignUp;
