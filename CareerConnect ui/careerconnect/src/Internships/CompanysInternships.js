import React, { useState, useEffect } from 'react';
import {Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllCompanyInternships } from '../Services/InternshipService';
import { ReactComponent as GeoIcon } from './geo-alt.svg';
import { ReactComponent as ClockIcon } from './hourglass-split.svg';


const CompanysInternships = ({companyId}) => {

    
    const[internship, setInternship]=useState([])

    useEffect(()=>{
        getAllCompanyInternships(companyId).then((response)=>{
            setInternship(response.data);
        }).catch(error=>{
            console.error(error);
        })

    }, [companyId])

  return (
    <div>
        
            
         <div className="container mt-5">
                    <div className="row">
                        {internship.map(internship => (
                            <div key={internship.id} className="col-md-6 mb-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{internship.tittle}</Card.Title>
                                        <Card.Text className="text-start p-3"> 
                                            Data e fillimit se praktikes: <strong>{internship.start_date}</strong><br/>
                                            Data e perfundimit se praktikes: <strong>{internship.end_date}</strong><br/>
                                            <GeoIcon/><strong>{internship.location}</strong><br />
                                            <ClockIcon/>Afati i aplikimit: <strong>{internship.deadline}</strong>
                                        </Card.Text>
                                        <Link to="/applications" className="btn btn-primary me-2">Apliko</Link>
                                        <Link to={`/InternshipDetails/${internship.id}`} className="btn btn-secondary me-2">Shiko detajet</Link> 
                                        <Link  className="btn btn-secondary">Shiko aplikimet</Link> 
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
