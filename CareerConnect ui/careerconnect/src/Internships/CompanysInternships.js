import React, { useState, useEffect } from 'react';
import {Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllCompanyInternships } from '../Services/InternshipService';


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
                        <div key={internship.id} className="col-md-4 mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{internship.tittle}</Card.Title>
                                    <Card.Text>
                                        📍 {internship.location}<br />
                                        🕒 {internship.deadline}
                                    </Card.Text>
                                    <Link to="/applications" className="btn btn-primary me-2">Apliko</Link>
                                    <Link to={`/InternshipDetails/${internship.id}`} className="btn btn-secondary">Shiko detajet</Link> 
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
