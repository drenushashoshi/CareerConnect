import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import CustomNavbar from './CostumNavbar';
import { listJobs } from './Services/JobService';

function JobListing() {
    const [jobs, setJobs] = useState([]);
    const locations = [
        'Deçan', 'Dragash', 'Drenas', 'Ferizaj', 'Fushë Kosovë', 'Gjakovë', 'Gjilan', 'Burim',
        'Kaçanik', 'Dardanë', 'Klinë', 'Lipjan', 'Malishevë', 'Mitrovicë', 'Kastriot', 'Pejë',
        'Besianë', 'Prishtinë', 'Prizren', 'Rahovec', 'Skenderaj', 'Suharekë', 'Shtërpcë', 'Shtime',
        'Viti', 'Vushtrri'
    ];

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

    const handleApplyClick = () => {
        // Logic for applying to the job
        console.log('Job page');
    };

    const handleWebpageLink = (url) => {
        window.open(url, '_blank');
    };

    return (
        <>
            <CustomNavbar />
            {/* Search Start */}
            <div className="container-fluid bg-primary py-5">
                <div className="container">
                    <div className="row g-3 justify-content-center align-items-center">
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="Keyword" />
                        </div>
                        <div className="col-md-3">
                            <select className="form-select">
                                <option value="">Industria</option>
                                {/* Options for industries */}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select">
                                <option selected>Location</option>
                                {locations.map((location, index) => (
                                    <option key={index} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <Button variant="dark" className="w-100" onClick={() => handleApplyClick()}>Search</Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Search End */}

            {/* Job Listing Start */}
            <div className="container mt-5">
                <div className="row">
                    {jobs.map(job => (
                        <div key={job.id} className="col-md-4 mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{job.title}</Card.Title>
                                    <Card.Text>{job.description}</Card.Text>
                                    <Button variant="primary" onClick={handleApplyClick}>Apply</Button>
                                    <Button variant="link" onClick={() => handleWebpageLink(job.url)}>More Info</Button>
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

export default JobListing;
