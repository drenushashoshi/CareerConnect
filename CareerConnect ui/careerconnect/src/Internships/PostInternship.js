import React, { useState } from 'react';
import CostumNavbar from "../CustomNavbar";
import { Link } from "react-router-dom";
import { createInternship } from '../Services/InternshipService';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            const internship = { tittle, company_name, description, start_date, end_date, requirements, location, type, deadline };
            console.log(internship);
            createInternship(internship)
                .then((response) => {
                    console.log(response.data);
                    setSuccessMessage("Internship posted successfully!");
                })
                .catch((error) => {
                    console.error("Error posting internship: ", error);
                });
        } else {
            setErrors(errors);
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
            <div style={{ backgroundColor: '#d6ebf9', textAlign: 'center', padding: '20px' }}>
            <h2 style={{ color: '#0056b3', margin: 'auto',fontFamily: 'CourierNew'}}><b>POSTO PRAKTIKE</b></h2><br/>

                <form style={{ width: '50%', margin: 'auto' }} onSubmit={handleSubmit}>
                    <input className="form-control" type="text" name="tittle" value={tittle} onChange={handleChange} placeholder="Titulli" style={{ marginBottom: '10px' }} />
                    {errors.tittle && <span style={{ color: 'red' }}>{errors.tittle}</span>}
                    <input className="form-control" type="text" name="company_name" value={company_name} onChange={handleChange} placeholder="Emri i Kompanise" style={{ marginBottom: '10px' }} />
                    {errors.company_name && <span style={{ color: 'red' }}>{errors.company_name}</span>}
                    <textarea className="form-control" name="description" value={description} onChange={handleChange} placeholder="Pershkrimi" rows="6" style={{ marginBottom: '10px' }} />
                    {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
                    <input className="form-control" type="date" name="start_date" value={start_date} onChange={handleChange} placeholder="Data e fillimit te praktikes" style={{ marginBottom: '10px' }} />
                    {errors.start_date && <span style={{ color: 'red' }}>{errors.start_date}</span>}
                    <input className="form-control" type="date" name="end_date" value={end_date} onChange={handleChange} placeholder="Data e perfundimit te praktikes" style={{ marginBottom: '10px' }} />
                    {errors.end_date && <span style={{ color: 'red' }}>{errors.end_date}</span>}
                    <textarea className="form-control" name="requirements" value={requirements} onChange={handleChange} placeholder="Kerkesat" rows="6" style={{ marginBottom: '10px' }} />
                    {errors.requirements && <span style={{ color: 'red' }}>{errors.requirements}</span>}
                    <select className="form-control" name="location" value={location} onChange={handleChange} style={{ marginBottom: '10px' }}>
                        <option value="">Selekto Lokacionin</option>
                        {locationOptions.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                    {errors.location && <span style={{ color: 'red' }}>{errors.location}</span>}
                    <select className="form-control" name="type" value={type} onChange={handleChange} style={{ marginBottom: '10px' }}>
                        <option value="">Select Category</option>
                        {categoryOptions.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                    {errors.type && <span style={{ color: 'red' }}>{errors.type}</span>}
                    <input className="form-control" type="date" name="deadline" value={deadline} onChange={handleChange} placeholder="Deadline" style={{ marginBottom: '10px' }} />
                    {errors.deadline && <span style={{ color: 'red' }}>{errors.deadline}</span>}
                    <button type="submit" className="btn btn-primary" style={{ cursor: 'pointer', width: '30%', marginTop: '10px' }}>Posto</button>
                </form>
                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                        <br />
                        <Link to="/alljobs">Click here to see all your jobs</Link>
                    </div>
                )}
            </div>
        </>
    );
    
}

export default PostInternship;
