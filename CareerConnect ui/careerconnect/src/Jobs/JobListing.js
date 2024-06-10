import React, { useState, useEffect } from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomNavbar from '../CustomNavbar';
import { listJobs, searchJobs } from '../Services/JobService';
import { getIndustries } from '../Services/IndustriaService';
import { getLocations } from '../Services/LocationService';
import backgroundImage from '../Internships/background.jpg';
import { ReactComponent as GeoIcon } from '../Internships/geo-alt.svg';
import { ReactComponent as ClockIcon } from '../Internships/hourglass-split.svg';
import Footer from '../Footer';
import CompanyService from '../Services/CompanyService';
import EmployeeService from '../Services/EmployeeService';

function JobListing() {
    const isCompany = CompanyService.isCompany();
    const isEmployee = EmployeeService.isEmployee();

    const [jobs, setJobs] = useState([]);
    const [Industries, setIndustries] = useState([]);
    const [Locations, setLocations] = useState([]);
    const [searchParams, setSearchParams] = useState({
        keyword: '',
        industry: '',
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
        setTimeout(async () => {
            try {
                const response = await searchJobs(searchParams.keyword, searchParams.Industria, searchParams.location);
                setJobs(response.data);
            } catch (error) {
                setError('Error searching jobs');
                console.error('Error searching jobs:', error);
            }
            setLoading(false);
        }, 1000);
    };

    const handleClearSearch = () => {
        setSearchParams({
            keyword: '',
            Industria: '',
            location: ''
        });
        fetchJobs();
    };

    return (
        <>
            <CustomNavbar />
            <div style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                textAlign: 'center',
                minHeight: '100vh',
            }}>
                <div className="container-fluid py-5" style={{ width: '80%', marginTop: '20px', backgroundColor: '#6078a9', borderRadius: '25px' }}>
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
                <div className="container mt-5">
                    {loading && <div className="d-flex justify-content-center"><Spinner animation="border" /></div>}
                    {error && <p>{error}</p>}
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
                                        {isEmployee && <Link to={`/applications/${job.id}`} className="btn btn-primary me-2">Apliko</Link>}
                                        <Link to={`/job/${job.id}`} className="btn btn-secondary me-2">Shiko detajet</Link>
                                        {isCompany && <Link to={`/jobApplications/${job.id}`} className="btn btn-secondary">Shiko aplikimet</Link>}
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default JobListing;
