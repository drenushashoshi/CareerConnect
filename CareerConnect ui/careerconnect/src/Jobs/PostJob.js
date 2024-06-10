import React, { useState, useEffect } from 'react';
import CustomNavbar from '../CustomNavbar';
import { Link } from 'react-router-dom';
import { createJob } from '../Services/JobService';
import Footer from '../Footer';
import { getLocations } from '../Services/LocationService';
import { getIndustries } from '../Services/IndustriaService';
import backgroundImage from "../Internships/background.jpg";
import { Spinner } from 'react-bootstrap';

function PostJob() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState('');
    const [locationName, setLocationName] = useState('');
    const [industriaName, setIndustriaName] = useState('');
    const [salary, setSalary] = useState('');
    const [deadline, setDeadline] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [locations, setLocations] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [loading, setLoading] = useState(false);
    const companyId = sessionStorage.getItem('companyId');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: '' });
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'requirements':
                setRequirements(value);
                break;
            case 'locationName':
                setLocationName(value);
                break;
            case 'industriaName':
                setIndustriaName(value);
                break;
            case 'salary':
                setSalary(value);
                break;
            case 'deadline':
                setDeadline(value);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const locationsResponse = await getLocations();
                if (locationsResponse && locationsResponse.data) {
                    setLocations(locationsResponse.data);
                }
            } catch (error) {
                console.error('Gabim gjatë marrjes së lokacioneve:', error);
            }

            try {
                const industriesResponse = await getIndustries();
                if (industriesResponse && Array.isArray(industriesResponse)) {
                    setIndustries(industriesResponse);
                } else if (industriesResponse.data && Array.isArray(industriesResponse.data)) {
                    setIndustries(industriesResponse.data);
                } else {
                    console.error('Formati i përgjigjes është i pavlefshëm për industritë');
                }
            } catch (error) {
                console.error('Gabim gjatë marrjes së industritë:', error);
            }
        }

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            setLoading(true);
            try {
                const job = { title, description, requirements, locationName, industriaName, salary, deadline, companyId };
                const token = localStorage.getItem('token');
                await createJob(job, token);
                setSuccessMessage('Puna u postua me sukses!');
                setTitle('');
                setDescription('');
                setRequirements('');
                setLocationName('');
                setIndustriaName('');
                setSalary('');
                setDeadline('');
            } catch (error) {
                console.error('Gabim gjatë postimit të punës:', error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        } else {
            setErrors(errors);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!title.trim()) {
            errors.title = 'Titulli është i detyrueshëm';
        }
        if (!description.trim()) {
            errors.description = 'Përshkrimi është i detyrueshëm';
        }
        if (!requirements.trim()) {
            errors.requirements = 'Kërkesat janë të detyrueshme';
        }
        if (!locationName) {
            errors.locationName = 'Lokacioni është i detyrueshëm';
        }
        if (!industriaName) {
            errors.industriaName = 'Industria është e detyrueshme';
        }
        if (!salary.trim()) {
            errors.salary = 'Paga është e detyrueshme';
        }
        if (!deadline) {
            errors.deadline = 'Afati është i detyrueshëm';
        } else if (new Date(deadline) < new Date()) {
            errors.deadline = 'Afati nuk mund të jetë në të kaluarën';
        }
        return errors;
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
                <br/><h1 style={{ fontFamily: 'Arial, sans-serif', color: '#4169E1' }}><b>Posto një Punë</b></h1><br/>

                <form style={{ width: '50%', margin: 'auto' }} onSubmit={handleSubmit}>
                    <input className="form-control" type="text" name="title" value={title} onChange={handleChange} placeholder="Titulli" style={{ marginBottom: '10px' }} />
                    {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}

                    <textarea className="form-control" name="description" value={description} onChange={handleChange} placeholder="Përshkrimi" rows="6" style={{ marginBottom: '10px', width: '100%', resize: 'none' }} />
                    {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}

                    <textarea className="form-control" name="requirements" value={requirements} onChange={handleChange} placeholder="Kërkesat" rows="6" style={{ marginBottom: '10px', width: '100%', resize: 'none' }} />
                    {errors.requirements && <span style={{ color: 'red' }}>{errors.requirements}</span>}

                    <select className="form-control" name="locationName" value={locationName} onChange={handleChange} style={{ marginBottom: '10px' }}>
                        <option value="">Zgjidh Lokacionin</option>
                        {locations.map(location => (
                            <option key={location.name} value={location.name}>{location.name}</option>
                        ))}
                    </select>
                    {errors.locationName && <span style={{ color: 'red' }}>{errors.locationName}</span>}

                    <select className="form-control" name="industriaName" value={industriaName} onChange={handleChange} style={{ marginBottom: '10px' }}>
                        <option value="">Zgjidh Industrinë</option>
                        {industries.map(industry => (
                            <option key={industry.name} value={industry.name}>{industry.name}</option>
                        ))}
                    </select>
                    {errors.industriaName && <span style={{ color: 'red' }}>{errors.industriaName}</span>}

                    <input className="form-control" type="text" name="salary" value={salary} onChange={handleChange} placeholder="Paga" style={{ marginBottom: '10px' }} />
                    {errors.salary && <span style={{ color: 'red' }}>{errors.salary}</span>}

                    <label htmlFor="deadline" style={{ display: 'block', textAlign: 'left', marginBottom: '5px' }}>Afati i Aplikimit:</label>
                    <input className="form-control" type="date" name="deadline" value={deadline} onChange={handleChange} style={{ marginBottom: '10px' }} />
                    {errors.deadline && <span style={{ color: 'red' }}>{errors.deadline}</span>}

                    <button type="submit" className="btn btn-primary" style={{ cursor: 'pointer', width: '50%', marginTop: '10px' }}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Posto'}
                    </button>
                </form><br/><br/>

                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                        <br />
                        <Link to={`/CompanyPage/${companyId}`}>Kliko këtu për të parë të gjitha punët e postuara</Link>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default PostJob;
