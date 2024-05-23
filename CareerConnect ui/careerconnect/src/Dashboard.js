import React from 'react';
import admin from './admin.jpg'; 
import {Container, Row, Col } from 'react-bootstrap';
import SideNavBar from './SideNavBar';

const Dashboard = () => {
  return (
    <div>
      <SideNavBar/>
      <div className="d-flex">
        <Container fluid className="ml-auto" style={{ marginLeft: '250px' }}>
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
