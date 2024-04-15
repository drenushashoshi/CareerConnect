import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomNavbar from '../CustomNavbar';
import { deleteJob, listJobs } from '../Services/JobService';

function AllJobs() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await listJobs();
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const handleDelete = async (jobId) => {
        try {
            await deleteJob(jobId);
            setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    return (
        <>
            <CustomNavbar />

            {/* Job Listing Start */}
            <div className="container mt-5">
                <div className="row">
                    {jobs.map(job => (
                        <div key={job.id} className="col-md-4 mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{job.title}</Card.Title>
                                    <Card.Text>
                                        📍 {job.location}<br />
                                        🕒 {job.deadline}
                                    </Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/job/${job.id}`} className="btn btn-primary">Si e shohin te tjeret</Link>
                                        <Button variant="danger" onClick={() => handleDelete(job.id)}>Delete</Button>
                                        <Link to={`/edit-job/${job.id}`} className="btn btn-secondary">Edit</Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            {/* Job Listing End */}
        </>
    );
}

export default AllJobs;
