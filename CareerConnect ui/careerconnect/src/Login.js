import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './login-test2.avif'
import './styles.css';

function Login() {
  return (
    <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary text-white'style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', opacity: 0.85 }}>
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
              Forgot <a href="">Password?</a><Link to='/signup' className='ms-2' >Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
