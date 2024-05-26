import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideNavBar from './SideNavBar';
import admin from './admin.jpg';
import { useNavigate } from 'react-router-dom';
import EmployeeService from './Services/EmployeeService';

const Dashboard = () => {
  const navigator = useNavigate();

  useEffect(() => {
    if (!EmployeeService.isAdmin()) {
        navigator('/');
    }
}, [navigator]);

  return (
    <div>
      <SideNavBar />
      <div className="d-flex">
        <Container fluid className="ml-auto" style={{ marginLeft: '250px', marginTop: '70px' }}>
          <Row className="justify-content-center mt-5">
            <Col md={12} className="text-center">
              <img src={admin} alt="Admin" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
