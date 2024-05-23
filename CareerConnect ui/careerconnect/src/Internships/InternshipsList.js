import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomNavbar from '../CustomNavbar';
import InterService from '../Services/InterService';
import backgroundImage from './background.jpg';
import Footer from '../Footer';
import { ReactComponent as GeoIcon } from './geo-alt.svg';
import { ReactComponent as ClockIcon } from './hourglass-split.svg';
import CompanyService from '../Services/CompanyService';
import EmployeeService from '../Services/EmployeeService';
import { getIndustries } from '../Services/IndustriaService';
import { getLocations } from '../Services/LocationService';

function InternshipListing() {
    const isCompany = CompanyService.isCompany();
    const isEmployee = EmployeeService.isEmployee();

    const [internships, setInternships] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [locations, setLocations] = useState([]);
    const [searchParams, setSearchParams] = useState({
        query: '',
        Industry: '',
        location: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInternships();
        fetchIndustries();
        fetchLocations();
    }, []);

    const fetchInternships = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await InterService.getAllInternships();
            setInternships(response);
        } catch (error) {
            setError('Error fetching internships');
            console.error('Error fetching internships:', error);
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
            const response = await InterService.searchInternships(searchParams.query, searchParams.Industry, searchParams.location);
            setInternships(response);
        } catch (error) {
            setError('Error searching internships');
            console.error('Error searching:', error);
        }
        setLoading(false);
    };

    const handleClearSearch = () => {
        setSearchParams({
            query: '',
            Industry: '',
            location: ''
        });
        fetchInternships();
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
                                    placeholder="Search"
                                    name="query"
                                    value={searchParams.query}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <select
                                    className="form-select"
                                    name="Industry"
                                    value={searchParams.Industry}
                                    onChange={handleSearchChange}
                                >
                                    <option value="">Industry</option>
                                    {industries && industries.map(Industria => (
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
                                    {locations && locations.map(Location => (
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
                    {loading && <p>Loading jobs...</p>}
                    {error && <p>{error}</p>}
                    <div className="row">
                        {internships?.map(internship => (
                            <div key={internship.id} className="col-md-6 mb-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{internship.title}</Card.Title>
                                        <Card.Text className="text-start p-3">
                                            Data e fillimit se praktikes: <strong>{internship.start_date}</strong><br />
                                            Data e perfundimit se praktikes: <strong>{internship.end_date}</strong><br />
                                            <GeoIcon /><strong>{internship.locationName}</strong><br />
                                            Industria:<strong>{internship.industriaName}</strong><br />
                                            <ClockIcon />Afati i aplikimit: <strong>{internship.deadline}</strong>
                                        </Card.Text>
                                        {isEmployee && <Link to="/applications" className="btn btn-primary me-2">Apliko</Link>}
                                        <Link to={`/InternshipDetails/${internship.id}`} className="btn btn-secondary me-2">Shiko detajet</Link>
                                        {isCompany && <Link className="btn btn-secondary">Shiko aplikimet</Link>}
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

export default InternshipListing;
