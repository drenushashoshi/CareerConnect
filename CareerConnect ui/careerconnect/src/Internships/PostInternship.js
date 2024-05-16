import React, { useState} from 'react';
import CostumNavbar from "../CustomNavbar";
import { Link} from "react-router-dom";
import InterService from '../Services/InterService';
import backgroundImage from './background.jpg'; 
import Footer from '../Footer';

function PostInternship() {
    const [tittle, setTittle] = useState('');
    const [company_name, setCompany_name] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [requirements, setRequirements] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    const [deadline, setDeadline] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});

    const  companyId =sessionStorage.getItem('companyId');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: '' }); 
        switch (name) {
            case "tittle":
                setTittle(value);
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
            case "location":
                setLocation(value);
                break;
            case "type":
                setType(value);
                break;
            case "deadline":
                setDeadline(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const errors = validateForm();
            if (Object.keys(errors).length === 0) {
                const internship = { tittle, company_name, description, start_date, end_date, requirements, location, type, deadline, companyId };
                const token = localStorage.getItem('token');
                await InterService.createInternship(internship, token);
                setSuccessMessage("Internship posted successfully!");
            } else {
                setErrors(errors);
            }
        } catch (error) {
            console.error("Error posting internship: ", error);
        }
    };
    

    const validateForm = () => {
        const errors = {};
        if (!tittle.trim()) {
            errors.tittle = 'Titulli is required';
        }
        if (!company_name.trim()) {
            errors.company_name = 'Emri i Kompanise is required';
        }
        if (!description.trim()) {
            errors.description = 'Pershkrimi is required';
        }
        if (!start_date) {
            errors.start_date = 'Data e fillimit te praktikes is required';
        } else if (new Date(start_date) < new Date()) {
            errors.start_date = 'Data e fillimit te praktikes nuk mund te jete ne te kaluaren';
        }
        if (!end_date) {
            errors.end_date = 'Data e perfundimit te praktikes is required';
        } else if (new Date(end_date) < new Date()) {
            errors.end_date = 'Data e perfundimit te praktikes nuk mund te jete ne te kaluaren';
        }
        if (!requirements.trim()) {
            errors.requirements = 'Kerkesat is required';
        }
        if (!location) {
            errors.location = 'Lokacioni is required';
        }
        if (!type) {
            errors.type = 'Kategoria is required';
        }
        if (!deadline) {
            errors.deadline = 'Deadline is required';
        } else if (new Date(deadline) < new Date()) {
            errors.deadline = 'Afati i dorezimit nuk mund te jete ne te kaluaren';
        }
        return errors;
    };

    const locationOptions = ['Deçan', 'Dragash', 'Drenas', 'Ferizaj', 'Fushë Kosovë', 'Gjakovë', 'Gjilan', 'Burim',
        'Kaçanik', 'Dardanë', 'Klinë', 'Lipjan', 'Malishevë', 'Mitrovicë', 'Kastriot', 'Pejë',
        'Besianë', 'Prishtinë', 'Prizren', 'Rahovec', 'Skenderaj', 'Suharekë', 'Shtërpcë', 'Shtime',
        'Viti', 'Vushtrri'];

    const categoryOptions = [
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
                            <input className="form-control" type="text" name="tittle" value={tittle} onChange={handleChange} placeholder="Titulli" style={{ width: '100%' }} />
                            {errors.tittle && <span style={{ color: 'red' }}>{errors.tittle}</span>}
                        </div>
                        <div style={{ width: 'calc(50% - 5px)' }}>
                            <input className="form-control" type="text" name="company_name" value={company_name} onChange={handleChange} placeholder="Emri i Kompanise" style={{ width: '100%' }} />
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
                            <select className="form-control" name="location" value={location} onChange={handleChange} style={{ width: '100%' }}>
                                <option value="">Selekto Lokacionin</option>
                                {locationOptions.map((location, index) => (
                                    <option key={index} value={location}>{location}</option>
                                ))}
                            </select>
                            {errors.location && <span style={{ color: 'red' }}>{errors.location}</span>}
                        </div>
                        <div style={{ width: 'calc(50% - 5px)' }}>
                            <select className="form-control" name="type" value={type} onChange={handleChange} style={{ width: '100%' }}>
                                <option value="">Select Category</option>
                                {categoryOptions.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                            {errors.type && <span style={{ color: 'red' }}>{errors.type}</span>}
                        </div>
                    </div>
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: 'calc(50% - 5px)', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                            <label htmlFor="deadline" style={{ color: '#4169E1', marginBottom: '5px'}}>Afati i aplikimit:</label>
                            <input id="deadline" className="form-control" type="date" name="deadline" value={deadline} onChange={handleChange} />
                            {errors.deadline && <span style={{ color: 'red' }}>{errors.deadline}</span>}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ cursor: 'pointer', width: '50%', marginTop: '10px' }}>Posto</button>
                </form><br/><br/>
                    {successMessage && (
                        <div className="success-message">
                            {successMessage}
                            <br />
                            <Link to="/InternshipsList">Click here to see all your jobs</Link>
                        </div>
                    )}
                
            </div>
            <Footer/>
        </>
    );
    
}

export default PostInternship;
