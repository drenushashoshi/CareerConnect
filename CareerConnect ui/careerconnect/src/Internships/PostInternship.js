import React, { useState, useEffect} from 'react';
import CostumNavbar from "../CustomNavbar";
import { Link, useNavigate} from "react-router-dom";
import InterService from '../Services/InterService';
import backgroundImage from './background.jpg'; 
import Footer from '../Footer';
import { getLocations } from '../Services/LocationService';
import { getIndustries } from '../Services/IndustriaService';
import CompanyService from '../Services/CompanyService';

function PostInternship() {
    const [title, setTitle] = useState('');
    const [company_name, setCompany_name] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [requirements, setRequirements] = useState('');
    const [locationName, setLocation] = useState('');
    const [industriaName, setIndustria] = useState('');
    const [deadline, setDeadline] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [locations, setLocations] = useState([]);
    const [industries, setIndustries] = useState([]);

    const navigator = useNavigate();

    const  companyId =sessionStorage.getItem('companyId');

    useEffect(() => {
        if (!CompanyService.isCompany()) {
            navigator('/');
        }
    }, [navigator]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: '' }); 
        switch (name) {
            case "title":
                setTitle(value);
                break;
            case "company_name":
                setCompany_name(value);
                break;
            case "description":
                setDescription(value);
                break;
            case "start_date":
                setStart_date(value);
                break;
            case "end_date":
                setEnd_date(value);
                break;
            case "requirements":
                setRequirements(value);
                break;
            case "locationName":
                setLocation(value);
                break;
            case "industriaName":
                setIndustria(value);
                break;
            case "deadline":
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
                console.log("Locations Response:", locationsResponse);
                if (locationsResponse && locationsResponse.data && locationsResponse.data.length > 0) {
                    setLocations(locationsResponse.data);
                } else {
                    console.error('No locations found in the response');
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            }

            try {
                const response = await getIndustries();
                console.log('Response:', response);
                if (Array.isArray(response)) {
                    setIndustries(response);
                } else if (response.data && Array.isArray(response.data)) {
                    setIndustries(response.data);
                } else {
                    console.error('Invalid response format');
                }
            } catch (error) {
                console.error('Error fetching industries:', error);
            }
        }

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const errors = validateForm();
            if (Object.keys(errors).length === 0) {
                const internship = { title, company_name, description, start_date, end_date, requirements, locationName, industriaName, deadline, companyId };
                const token = localStorage.getItem('token');
                await InterService.createInternship(internship, token);
                setSuccessMessage("Praktika u postua me sukses!");
                setTitle('');
                setCompany_name('');
                setDescription('');
                setStart_date('');
                setEnd_date('');
                setRequirements('');
                setLocation('');
                setIndustria('');
                setDeadline('');
            } else {
                setErrors(errors);
            }
        } catch (error) {
            console.error("Error posting internship: ", error);
        }
    };
    
    

    const validateForm = () => {
        const errors = {};
        if (!title.trim()) {
            errors.title = 'Shkruani titullin';
        }
        if (!company_name.trim()) {
            errors.company_name = 'Shkruani emrin e kompanisë';
        }
        if (!description.trim()) {
            errors.description = 'Shkruani përshkrimin e praktikës';
        }
        if (!start_date) {
            errors.start_date = 'Vendosni datën e fillimit të praktikës';
        } else if (new Date(start_date) < new Date()) {
            errors.start_date = 'Data e fillimit te praktikës nuk mund të jetë në të kaluarën';
        }
        if (!end_date) {
            errors.end_date = 'Vendosni datën e përfundimit të praktikës';
        } else if (new Date(end_date) < new Date()) {
            errors.end_date = 'Data e perfundimit të praktikës nuk mund te jetë në të kaluarën';
        }
        if (!requirements.trim()) {
            errors.requirements = 'Shkruani kërkesat';
        }
        if (!locationName) {
            errors.locationName = 'Zgjedhni lokacionin';
        }
        if (!industriaName) {
            errors.industriaName = 'Zgjedhni kategorinë';
        }
        if (!deadline) {
            errors.deadline = 'Vendosni afatin e fundit për aplikim';
        } else if (new Date(deadline) < new Date()) {
            errors.deadline = 'Afati i dorëzimit nuk mund te jetë në të kaluarën';
        }
        return errors;
    };

    return (
        <>
            <CostumNavbar />
            <div style={{ 
            backgroundImage: `url(${backgroundImage})`, 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'center', 
            textAlign: 'center',
            minHeight: '100vh', 
            }}>
                
                <br/><h1 style={{ fontFamily: 'Arial, sans-serif', color: '#4169E1' }}><b>Posto Praktikë</b></h1><br/>

                <form style={{ width: '50%', margin: 'auto' }} onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: 'calc(50% - 5px)' }}>
                            <input className="form-control" industria="text" name="title" value={title} onChange={handleChange} placeholder="Titulli" style={{ width: '100%' }} />
                            {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
                        </div>
                        <div style={{ width: 'calc(50% - 5px)' }}>
                            <input className="form-control" industria="text" name="company_name" value={company_name} onChange={handleChange} placeholder="Emri i Kompanise" style={{ width: '100%' }} />
                            {errors.company_name && <span style={{ color: 'red' }}>{errors.company_name}</span>}
                        </div>
                    </div>
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: 'calc(50% - 5px)', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                            <label htmlFor="start_date" style={{color: '#4169E1', marginBottom: '5px'}}>Data e fillimit te praktikes:</label>
                            <input id="start_date" className="form-control" type="date" name="start_date" value={start_date} onChange={handleChange} />
                            {errors.start_date && <span style={{ color: 'red' }}>{errors.start_date}</span>}
                        </div>
                        <div style={{ width: 'calc(50% - 5px)', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                            <label htmlFor="end_date" style={{color: '#4169E1', marginBottom: '5px'}}>Data e pefundimit te praktikes:</label>
                            <input id="end_date" className="form-control" type="date" name="end_date" value={end_date} onChange={handleChange} />
                            {errors.end_date && <span style={{ color: 'red' }}>{errors.end_date}</span>}
                        </div>
                    </div>

                    <textarea className="form-control" name="description" value={description} onChange={handleChange} placeholder="Pershkrimi" rows="6" style={{ marginBottom: '10px', width: '100%', resize:'none' }} />
                    {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
                    <textarea className="form-control" name="requirements" value={requirements} onChange={handleChange} placeholder="Kerkesat" rows="6" style={{ marginBottom: '10px', width: '100%', resize:'none' }} />
                    {errors.requirements && <span style={{ color: 'red' }}>{errors.requirements}</span>}
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: 'calc(50% - 5px)' }}>
                            <select className="form-control" name="locationName" value={locationName} onChange={handleChange} style={{ width: '100%' }}>
                                <option value="">Selekto Lokacionin</option>
                                {locations.map(location => (
                                    <option key={location.name} value={location.name}>{location.name}</option>
                                ))}
                            </select>
                            {errors.locationName && <span style={{ color: 'red' }}>{errors.locationName}</span>}
                        </div>
                        <div style={{ width: 'calc(50% - 5px)' }}>
                            <select className="form-control" name="industriaName" value={industriaName} onChange={handleChange} style={{ width: '100%' }}>
                                <option value="">Select Category</option>
                                {industries.map(industry => (
                                    <option key={industry.name} value={industry.name}>{industry.name}</option>
                                ))}
                            </select>
                            {errors.industriaName && <span style={{ color: 'red' }}>{errors.industriaName}</span>}
                        </div>
                    </div>
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: 'calc(50% - 5px)', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                            <label htmlFor="deadline" style={{ color: '#4169E1', marginBottom: '5px'}}>Afati i aplikimit:</label>
                            <input id="deadline" className="form-control" type="date" name="deadline" value={deadline} onChange={handleChange} />
                            {errors.deadline && <span style={{ color: 'red' }}>{errors.deadline}</span>}
                        </div>
                    </div>
                    <button industria="submit" className="btn btn-primary" style={{ cursor: 'pointer', width: '50%', marginTop: '10px' }}>Posto</button>
                </form><br/><br/>
                    {successMessage && (
                        <div className="success-message" style={{ fontSize: '18px' }}>
                        {successMessage}
                        <br />
                        <Link to="/CompanyPage" style={{ fontSize: '18px' }}>Klikoni këtu për të parë të gjitha shpalljet e postuara.</Link><br/>
                      </div> 
                      
                    )}
                
            </div>
            <Footer/>
        </>
    );
    
}

export default PostInternship;
