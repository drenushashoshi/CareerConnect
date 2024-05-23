import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CompanyService from './Services/CompanyService';
import EmployeeService from './Services/EmployeeService'; 
import backgroundImage from './login-test2.avif';
import Modal from 'react-bootstrap/Modal';
import './styles.css';

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
          navigator('/CompanyPage');
        } else {
          setError(data.message);
        }
      } else {
        data = await EmployeeService.login(email, password);
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          sessionStorage.setItem('employeeId', data.id);
          
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
    <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary text-white' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', opacity: 0.85 }}>
      <div className='d-flex flex-column align-items-center'>
        <h1 className="custom-margin"><b>CareerConnect</b></h1>
        <p className='w-50 mt-3'>
          Discover, apply, and excel with our all-in-one web app designed for job seekers and recruiters alike.
          Easily browse and apply for available jobs, courses, and internships tailored to your needs.
          Streamline your hiring process as a company by posting job openings, managing applications, and scheduling
          interviews effortlessly. Our intuitive platform ensures seamless connectivity between talented individuals and
          rewarding opportunities. From job search to onboarding, we've got you covered every step of the way.
          Join our community today and take the next leap in your career journey!
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
              <a href="" className='ms-2' onClick={handleSignUpClick}>Sign up</a>
            </p>
          </form>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className='text-center custom-font'>
          <h5 className='mt-3'>What do you want to signup as?</h5>
          <div className='mt-4 mb-4'>
            <Link to='/signup' className='btn btn-primary' style={{ marginRight: '40px', textDecoration: 'none', color: '#fff' }}>Company</Link>
            <Link to='/EmployeeSignUp' className='btn btn-primary' style={{ marginRight: '40px', textDecoration: 'none', color: '#fff' }}>Worker</Link>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Login;
