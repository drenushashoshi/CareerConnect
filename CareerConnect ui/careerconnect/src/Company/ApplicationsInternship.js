import React, { useEffect, useState } from 'react';
import ApplicationService from '../Services/ApplicationService';
import { Card } from 'react-bootstrap';
import InterService from '../Services/InterService';

const ApplicationInternship = () => {
    const [internships, setinternships] = useState([]); // State to store internships
    const [loading, setLoading] = useState(true); // Add loading state
    const [applications,setApplications] = useState([]);

    useEffect(() => {
        fetchInternshipsWithApplications();
    }, []);

    const fetchInternshipsWithApplications = async () => {
        try {
            const internshipsResponse = await InterService.getAllInternships();
            const fetchedInternships = internshipsResponse;
            setinternships(fetchedInternships); // Set the Internships state
    
            const applicationPromises = fetchedInternships.map(async (Internship) => {
                const applicationResponse = await ApplicationService.getApplicationByInternshipId(Internship.id);
                return applicationResponse;
            });
    
            const fetchedApplications = await Promise.all(applicationPromises);
            setApplications(fetchedApplications);
        } catch (error) {
            console.error('Error fetching Internships or applications:', error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };
    
    
    

    const handleDelete = async (applicationId) => {
        try {
            await ApplicationService.deleteApplication(applicationId);
            fetchInternshipsWithApplications(); // Refresh the data after deletion
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    };

    const appPerInternship = (Array, id) => {
        console.log("id", id)
        return Array.map((applicationss) => {
            return applicationss.map((application) => {
                console.log(application.internshipid)
                if (application.internshipid === id) {
                    return (
                        <div className="container mt-5">
                            <div className="row">
                                <div key={application.id} className="col-md-4 mb-4">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{application.name} {application.surname}</Card.Title>
                                            <Card.Text>
                                                ✉️{application.email}<br />
                                                📞 {application.phone_nr}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    );
                }
            });
        });
    };

    if (loading) {
        return <p>Loading...</p>; // Render loading message while data is being fetched
    }
    console.log(internships)
    console.log(applications)
    return (
        <div>
            {internships.map((internship) => (
                <div key={internship.id}>
                    <h3 style={{ fontFamily: 'Arial, sans-serif', color: '#0056b3', fontWeight: 'bold' }}>{internship.title}</h3>
                    {internships.length > 0 ? (
                        appPerInternship(applications,internship.id)
                    ) : (
                        <p>No applications for this internship.</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ApplicationInternship;
