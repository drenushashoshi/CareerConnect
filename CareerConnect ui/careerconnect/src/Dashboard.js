import React from 'react';
import CustomNavbar from './CustomNavbar';
import Footer from './Footer';
import admin from './admin.jpg'; 
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <CustomNavbar />
      <div className="d-flex justify-content-center">
        <img src={admin} alt="Admin" />
      </div>
      <div className="container-fluid py-5" style={{ width: '80%', height: '30px', marginTop: '20px', backgroundColor: '#6078a9', borderRadius: '25px', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4">
            <Link to="/CompanyList">
                <Button variant="dark" className="w-100">Companies Registered</Button>
            </Link>
            </div>
            <div className="col-md-4">
            <Link to="/EmployeeList">
                <Button variant="dark" className="w-100">Employees Registered</Button>
            </Link>
            </div>
          </div>
        </div>
      </div><br/>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
