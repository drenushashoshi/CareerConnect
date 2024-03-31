import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './login-test2.avif';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './styles.css';

function Login() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSignUpClick = (event) => {
    event.preventDefault(); 
    handleShowModal(); 
  };

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
          <form>
            <h3 className='text-center'>Sign In</h3>
            <div className='mb-2'>
              <label htmlFor="email">Email</label>
              <input type="email" placeholder='Enter email' className='form-control'/>
            </div>
            <div className='mb-2'>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder='Enter password' className='form-control'/>
            </div>
            <div className='mb-2'>
              <input type="checkbox" className='custom-control custom-checkbox' id="check" />
              <label htmlFor='check' className='custom-input-label'>
                Remember me 
              </label>
            </div>
            <div className='d-grid'>
              <button className='btn btn-primary'>Sign in</button>
            </div>
            <p className='text-end mt-2'>
              Forgot <a href="">Password?</a>
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
            <Button variant="primary">Worker</Button>
          </div>
        </Modal.Body>
      </Modal>





    </div>
  );
}

export default Login;
