import React, { useEffect, useState } from 'react';
import CustomNavbar from '../CustomNavbar';
import { useNavigate, useParams } from 'react-router-dom';
import ApplicationService from '../Services/ApplicationService';
import { getJob } from '../Services/JobService';
import Footer from '../Footer';
import { Button, Card, Col, Row } from 'react-bootstrap';
import backgroundImage from '../Company/background.jpg';
import EmployeeService from '../Services/EmployeeService';

const ApplicationJob = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [applications, setApplications] = useState([]);
    const [job, setJob] = useState(null);

    const fetchedApplicationsByJob = async () => {
        try {
            const applicationResponse = await ApplicationService.getApplicationByJobId(id);
            setApplications(applicationResponse);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(()=>{

        if (!EmployeeService.isAuthenticated()) {
            navigate('/');
        }
    },[navigate])

    useEffect(() => {
        fetchedApplicationsByJob();
    }, [id]);

    const fetchJob = async () => {
        try {
            const jobResponse = await getJob(id);
            setJob(jobResponse);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchJob();
    }, [id]);

    const [showDetails, setShowDetails] = useState({}); // Use an object to track details for each application

    const toggleDetails = (applicationId) => {
        setShowDetails(prevState => ({
            ...prevState,
            [applicationId]: !prevState[applicationId] // Toggle the state for the clicked application
        }));
    };

    return (
        <div 
            className="d-flex flex-column min-vh-100" 
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}>
            {job && (
            <>
                <CustomNavbar/>
                <br/>
                <h3 className='text-center'>{job.title}</h3>
                <div className="flex-grow-1">
                    <Row xs={1} md={3} className="mx-5 g-4">
                        {applications.map((application) => (
                            <Col key={application.applicationid}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title className='text-center'>{application.name} {application.surname}</Card.Title>
                                        <Card.Text>
                                            ✉️ {application.email}<br />
                                            📞 {application.phone_nr}
                                        </Card.Text>
                                        {showDetails[application.applicationid] && ( // Conditionally render additional details for the specific application
                                            <Card.Text>
                                                Gjinia: {application.gender}<br />
                                                Pershkrim:<br/> {application.description}
                                            </Card.Text>
                                        )}
                                        <Button className='btn btn-primary mx-3' onClick={() => toggleDetails(application.applicationid)}>
                                            {showDetails[application.applicationid] ? 'Shiko me pak' : 'Shiko me shume'}
                                        </Button><br/>


                                        <br/><Button 
                                            className='btn btn-primary mx-3' 
                                            onClick={() => navigate(`/EmployeePage/${application.employeeid}`)}>
                                            Shiko Aplikantin
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
                <Footer/>
            </>
            )}
        </div>
    );
};

export default ApplicationJob;
