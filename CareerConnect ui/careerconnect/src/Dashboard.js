// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import SideNavBar from './SideNavBar';
// import { useNavigate } from 'react-router-dom';
// import EmployeeService from './Services/EmployeeService';
// import Lottie from 'react-lottie';
// import animationData from './lottie-welcome-animation.json';

// const Dashboard = () => {
//   const navigator = useNavigate();
  

//   useEffect(() => {
//     if (!EmployeeService.isAdmin()) {
//       navigator('/');
//     } else {
      
//     }
//   }, [navigator]);

//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: 'xMidYMid slice'
//     }
//   };

//   return (
//     <div>
      
//       <SideNavBar />
//       <div className="d-flex">
//         <Container fluid className="ml-auto" style={{ marginLeft: '250px', marginTop: '70px' }}>
//           <Row className="justify-content-center mt-5">
//             <Col md={12} className="text-center">
//             <h1 style={{ color: '#007bff', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Welcome back Admin!</h1>
//               <div style={{ width: 300, height: 300, margin: '0 auto' }}>
//                 <Lottie options={defaultOptions} height={300} width={300} />
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
