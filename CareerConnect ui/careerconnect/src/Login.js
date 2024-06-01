import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CompanyService from './Services/CompanyService';
import EmployeeService from './Services/EmployeeService';
import backgroundImage from './login-test2.avif';
import Modal from 'react-bootstrap/Modal';
import './styles.css';
import RatesForVisitors from './Rate/RatesForVisitors';

function Login() {
  const navigator = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('company'); 
  const [error, setError] = useState('');

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSignUpClick = (event) => {
    event.preventDefault();
    handleShowModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (userType === 'company') {
        data = await CompanyService.login(email, password);
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          sessionStorage.setItem('companyId', data.id);
          const id = (data.id);
          navigator(`/CompanyPage/${id}`);
        } else {
          setError(data.message);
        }
      } else {
        data = await EmployeeService.login(email, password);
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          sessionStorage.setItem('employeeId', data.id);
          console.log(data.role)
          
          if (data.role === 'Employee') {
            navigator('/EmployeePage');
          } else if (data.role === 'ADMIN') {
            navigator('/Dashboard');
          } else {
            setError('Unknown role');
          }
        } else {
          setError(data.message);
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message);
      setEmail('');
      setPassword('');
    }
  }

  return (
    <div className='login template d-flex flex-column align-items-center bg-primary text-white' style={{ 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      opacity: 0.85,
      width: '100%',
      minHeight: '100vh', 
    }}>
      <div className='d-flex flex-column align-items-center'>
        <h1 className="custom-margin"><b>CareerConnect</b></h1>
        <p className='w-50 mt-3'>
          Zbuloni, aplikoni dhe shkëlqeni me aplikacionin tonë të gjithanshëm në internet të krijuar për kërkuesit e punës dhe rekrutuesit.
          Shfletoni dhe aplikoni lehtësisht për vendet e punës, kurset dhe praktikat në dispozicion të përshtatura për nevojat tuaja.
          Thjeshtoni procesin tuaj të punësimit si kompani duke postuar vende të lira pune, duke menaxhuar aplikimet dhe duke planifikuar
          intervistat pa mundim. Platforma jonë intuitive siguron lidhje të përsosur midis individëve të talentuar dhe
          mundësive të shpërblyese. Nga kërkimi i punës deri te integrimi, ne ju mbështesim në çdo hap të rrugës.
          Bashkohuni me komunitetin tonë sot dhe bëni hapin e ardhshëm në karrierën tuaj!
        </p>
        <div className='w-40 p-3 bg-transparent'>
          <form onSubmit={handleSubmit}>
            <h3 className='text-center'>Sign In</h3>
            {error && <div className="text-danger font-weight-bold">{error}</div>}
            <div className='mb-2'>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' className='form-control'/>
            </div>
            <div className='mb-2'>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' className='form-control'/>
            </div>
            <div className='mb-2'>
              <label htmlFor="userType">Login as</label>
              <select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)} className='form-control'>
                <option value="company">Company</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            
            <div className='d-grid'>
              <button type="submit" className='btn btn-primary'>Sign in</button>
            </div>
            <p className='text-start mt-2'>
              <a href="" className='ms-2' onClick={handleSignUpClick}>Regjistrohu</a>
            </p>
          </form>
        </div>
      </div><br/><br/><br/>
      
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className='text-center custom-font'>
          <h5 className='mt-3'>Regjistrohu si?</h5>
          <div className='mt-4 mb-4'>
            <Link to='/signup' className='btn btn-primary' style={{ marginRight: '40px', textDecoration: 'none', color: '#fff' }}>Kompani</Link>
            <Link to='/EmployeeSignUp' className='btn btn-primary' style={{ marginRight: '40px', textDecoration: 'none', color: '#fff' }}>Punëtor</Link>
          </div>
        </Modal.Body>
      </Modal>
      
      <div className='w-100 mt-3'>
        <RatesForVisitors />
      </div><br/><br/>
    </div>
  );
}

export default Login;
