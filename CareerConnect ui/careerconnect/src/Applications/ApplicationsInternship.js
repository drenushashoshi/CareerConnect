import React, { useEffect, useState } from 'react';
import CustomNavbar from '../CustomNavbar';
import { useNavigate, useParams } from 'react-router-dom';
import ApplicationService from '../Services/ApplicationService';
import Footer from '../Footer';
import { Button, Card } from 'react-bootstrap';
import backgroundImage from '../Company/background.jpg';
import CompanyService from '../Services/InterService';

const ApplicationsInternship = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [applications, setApplications] = useState([]);
    const [job, setJob] = useState(null);

    const fetchedApplicationsByJob = async () => {
        try {
            const applicationResponse = await ApplicationService.getApplicationByInternshipId(id);
            setApplications(applicationResponse);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchedApplicationsByJob();
    }, [id]);

    const fetchJob = async () => {
        try {
            const jobResponse = await CompanyService.getInternshipById(id);
            setJob(jobResponse);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchJob();
    }, [id]);

    const Click = ()=>
        {
            navigate(`/EmployeePage/`+applications[0].employeeid);
        }
    return (
        <div 
            className="d-flex flex-column min-vh-100" 
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                textAlign: 'center'
            }}>
            {job &&(
            <>
            <CustomNavbar/>
            <h3>{job.title}</h3>
            <div className="flex-grow-1">
                {applications.map((application) => (
                    <div className="container mt-5" key={application.id}>
                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{application.name} {application.surname}</Card.Title>
                                        <Card.Text>
                                            ✉️{application.email}<br />
                                            📞 {application.phone_nr}
                                        </Card.Text>
                                        <Button className='btn btn-primary' onClick={Click}>See Employee</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer/>
            </>
            )}
        </div>
    );
};

export default ApplicationsInternship;
