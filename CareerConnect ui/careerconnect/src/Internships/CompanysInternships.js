 import React, { useState, useEffect } from 'react';
 import {Card } from 'react-bootstrap';
 import { Link } from 'react-router-dom';
import InterService from '../Services/InterService';
 import { ReactComponent as GeoIcon } from './geo-alt.svg';
 import { ReactComponent as ClockIcon } from './hourglass-split.svg';
 import CompanyService from '../Services/CompanyService';
 import EmployeeService from '../Services/EmployeeService';


 const CompanysInternships = ({companyId}) => {

    
     const[internship, setInternship]=useState([]);
     const isCompany=CompanyService.isCompany();
      const isEmployee=EmployeeService.isEmployee();

     useEffect(() => {
        fetchInternships(companyId);
      }, [companyId]); 
    
      const fetchInternships = async (companyId) => {
        try {
          const response = await InterService.getAllCompanyInternships (companyId);
          setInternship(response);
        } catch (error) {
          console.log('Error fetching internships', error);
        }
      };

   return (
     <div>
          <div className="container mt-5">
                     <div className="row">
                         {internship.map(internship => (
                             <div key={internship.id} className="col-md-6 mb-4">
                                 <Card>
                                     <Card.Body>
                                         <Card.Title>{internship.title}</Card.Title>
                                         <Card.Text className="text-start p-3"> 
                                             Data e fillimit se praktikes: <strong>{internship.start_date}</strong><br/>
                                             Data e perfundimit se praktikes: <strong>{internship.end_date}</strong><br/>
                                             <GeoIcon/><strong>{internship.locationName}</strong><br />
                                             <ClockIcon/>Afati i aplikimit: <strong>{internship.deadline}</strong>
                                         </Card.Text>
                                         {isEmployee &&(<Link to={`/InternshipApplication/${internship.id}`} className="btn btn-primary me-2">Apliko</Link>)}
                                         <Link to={`/InternshipDetails/${internship.id}`} className="btn btn-secondary me-2">Shiko detajet</Link> 
                                         {isCompany &&(<Link to={`/ApplicationsInternship/${internship.id}`}  className="btn btn-secondary">Shiko aplikimet</Link> )}
                                     </Card.Body>
                                 </Card>
                             </div>
                         ))}
                     </div>
                 </div>
        
     </div>
   )
 }

 export default CompanysInternships
