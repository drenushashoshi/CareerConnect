import React, { useEffect, useState } from 'react';
import ApplicationService from '../Services/ApplicationService';
import { listJobs } from '../Services/JobService';
import { Card } from 'react-bootstrap';

const ApplicationsJob = () => {
    const [jobs, setJobs] = useState([]); // State to store jobs
    const [loading, setLoading] = useState(true); // Add loading state
    const [applications,setApplications] = useState([]);

    useEffect(() => {
        fetchJobsWithApplications();
    }, []);

    const fetchJobsWithApplications = async () => {
        try {
            const jobsResponse = await listJobs();
            const fetchedJobs = jobsResponse.data;
            setJobs(fetchedJobs); // Set the jobs state
    
            const applicationPromises = fetchedJobs.map(async (job) => {
                const applicationResponse = await ApplicationService.getApplicationByJobId(job.id);
                return applicationResponse;
            });
    
            const fetchedApplications = await Promise.all(applicationPromises);
            setApplications(fetchedApplications);
        } catch (error) {
            console.error('Error fetching jobs or applications:', error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };
    
    
    

    const handleDelete = async (applicationId) => {
        try {
            await ApplicationService.deleteApplication(applicationId);
            fetchJobsWithApplications(); // Refresh the data after deletion
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    };

    const appPerJob = (Array, id) => {
        console.log("id", id)
        return Array.map((applicationss) => {
            return applicationss.map((application) => {
                console.log(application.jobid)
                if (application.jobid === id) {
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
    console.log(jobs)
    console.log(applications)
    return (
        <div>
            {jobs.map((job) => (
                <div key={job.id}>
                    <h3 style={{ fontFamily: 'Arial, sans-serif', color: '#0056b3', fontWeight: 'bold' }}>{job.title}</h3>
                    {jobs.length > 0 ? (
                        appPerJob(applications,job.id)
                    ) : (
                        <p>No applications for this job.</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ApplicationsJob;
