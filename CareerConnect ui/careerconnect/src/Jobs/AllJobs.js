import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReactComponent as GeoIcon } from '../Internships/geo-alt.svg';
import { ReactComponent as ClockIcon } from '../Internships/hourglass-split.svg';
import { getAllCompanyJobs } from '../Services/JobService';
import CompanyService from '../Services/CompanyService';
import EmployeeService from '../Services/EmployeeService';

function AllJobs({ companyId }) {
    const [jobs, setJobs] = useState([]);
    const isCompany = CompanyService.isCompany();
    const isEmployee = EmployeeService.isEmployee();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await getAllCompanyJobs(companyId);
            setJobs(response);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {jobs.map(job => (
                    <div key={job.id} className="col-md-6 mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{job.title}</Card.Title>
                                <Card.Text className="text-start p-3">
                                    <GeoIcon /><strong>{job.locationName}</strong><br />
                                    Industria: <strong>{job.industriaName}</strong><br />
                                    <ClockIcon /> Afati i aplikimit: <strong>{job.deadline}</strong>
                                </Card.Text>
                                <div>
                                    {isEmployee && (
                                        <Link to={`/JobApplication/${job.id}`} className="btn btn-primary me-2">Apliko</Link>
                                    )}
                                    <Link to={`/Job/${job.id}`} className="btn btn-secondary me-2">Shiko detajet</Link>
                                    {isCompany && (
                                        <Link to={`/ApplicationsJob/${job.id}`} className="btn btn-secondary">Shiko aplikimet</Link>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllJobs;
