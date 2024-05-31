import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomNavbar from '../CustomNavbar';
import { listJobs, searchJobs } from '../Services/JobService';
import { getIndustries } from '../Services/IndustriaService';
import { getLocations } from '../Services/LocationService';

function JobListing() {
    const [jobs, setJobs] = useState([]);
    const [Industries, setIndustries] = useState([]);
    const [Locations, setLocations] = useState([]);
    const [searchParams, setSearchParams] = useState({
        keyword: '',
        Industria: '',
        location: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchJobs();
        fetchIndustries();
        fetchLocations();
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await listJobs();
            setJobs(response.data);
        } catch (error) {
            setError('Error fetching jobs');
            console.error('Error fetching jobs:', error);
        }
        setLoading(false);
    };

    const fetchIndustries = async () => {
        try {
            const fetchedIndustries = await getIndustries();
            setIndustries(fetchedIndustries);
        } catch (error) {
            console.error('Error fetching industries:', error);
        }
    };

    const fetchLocations = async () => {
        try {
            const response = await getLocations();
            setLocations(response.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await searchJobs(searchParams.keyword, searchParams.Industria, searchParams.location);
            setJobs(response.data);
            console.log(response.data)
        } catch (error) {
            setError('Error searching jobs');
            console.error('Error searching jobs:', error);
        }
        setLoading(false);
    };

    const handleClearSearch = () => {
        setSearchParams({
            keyword: '',
            Industria: '',
            location: ''
        });
        fetchJobs(); // Fetch all jobs
    };

    return (
        <>
            <CustomNavbar />
            {/* Search Start */}
            <div className="container-fluid bg-primary py-5">
                <div className="container">
                    <div className="row g-3 justify-content-center align-items-center">
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Keyword"
                                name="keyword"
                                value={searchParams.keyword}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <select
                                className="form-select"
                                name="Industria"
                                value={searchParams.Industria}
                                onChange={handleSearchChange}
                            >
                                <option value="">Industry</option>
                                {Industries && Industries.map(Industria => (
                                    <option key={Industria.name} value={Industria.name}>{Industria.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <select
                                className="form-select"
                                name="location"
                                value={searchParams.location}
                                onChange={handleSearchChange}
                            >
                                <option value="">Location</option>
                                {Locations && Locations.map(Location => (
                                    <option key={Location.name} value={Location.name}>{Location.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <Button variant="dark" className="w-100" onClick={handleSearch}>Search</Button>
                            <Button variant="secondary" className="w-100 mt-2" onClick={handleClearSearch}>Clear</Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Search End */}

            {/* Job Listing Start */}
            <div className="container mt-5">
                {loading && <p>Loading jobs...</p>}
                {error && <p>{error}</p>}
                <div className="row">
                    {jobs.map(job => (
                        <div key={job.id} className="col-md-4 mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{job.title}</Card.Title>
                                    <Card.Text>
                                        📍 {job.locationName}<br />
                                        🕒 {job.deadline}
                                    </Card.Text>
                                    <Link to={`/applications/${job.id}`} className="btn btn-primary me-2">Apply</Link>
                                    <Link to={`/job/${job.id}`} className="btn btn-secondary">More Info</Link>
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
