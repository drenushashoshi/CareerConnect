import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomNavbar from '../CustomNavbar';
import { listJobs } from '../Services/JobService';

function JobListing() {
    const [jobs, setJobs] = useState([]);
    const locations = [
        'Deçan', 'Dragash', 'Drenas', 'Ferizaj', 'Fushë Kosovë', 'Gjakovë', 'Gjilan', 'Burim',
        'Kaçanik', 'Dardanë', 'Klinë', 'Lipjan', 'Malishevë', 'Mitrovicë', 'Kastriot', 'Pejë',
        'Besianë', 'Prishtinë', 'Prizren', 'Rahovec', 'Skenderaj', 'Suharekë', 'Shtërpcë', 'Shtime',
        'Viti', 'Vushtrri'
    ];
    const categories = [
        'Administratë',
        'Arkitekturë',
        'Art dhe Kulturë',
        'Banka',
        'Industria Automobilistike',
        'Retail dhe Distribuim',
        'Ndërtimtari & Patundshmëri',
        'Mbështetje e Konsumatorëve, Call Center',
        'Ekonomi, Financë, Kontabilitet',
        'Edukim, Shkencë & Hulumtim',
        'Punë të Përgjithshme',
        'Burime Njerëzore',
        'Teknologji e Informacionit',
        'Gazetari, Shtyp & Media',
        'Ligj & Legjislacion',
        'Menaxhment',
        'Marketing, Reklamim & PR',
        'Inxhinieri',
        'Shëndetësi, Medicinë',
        'Industri Farmaceutike',
        'Prodhim',
        'Siguri & Mbrojtje',
        'Industri të Shërbimit',
        'Telekomunikim',
        'Tekstil, Lëkurë, Industri Veshëmbathjeje',
        'Menaxhment Ekzekutiv',
        'Gastronomi, Hoteleri, Turizëm',
        'Përkthim, Interpretim',
        'Transport, Logjistikë',
        'Industri e Përpunimit të Drurit'
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
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
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
                            <Button variant="dark" className="w-100">Search</Button>
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
                                    <Card.Text>
                                        📍 {job.location}<br />
                                        🕒 {job.deadline}
                                    </Card.Text>
                                    <Link to="/applications" className="btn btn-primary me-2">Apply</Link>
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
