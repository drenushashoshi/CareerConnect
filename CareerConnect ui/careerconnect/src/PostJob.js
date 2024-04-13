import React, { useState } from 'react';
import './PostJob.css';
import CostumNavbar from "./CostumNavbar";
import { createJob } from './Services/JobService';

function PostJob() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        location: '',
        salary: '',
        jobType: '',
        deadline: ''
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate inputs
        const errors = {};
        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                errors[key] = 'Please fill out this field';
            }
        });
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await createJob(formData);
                console.log(response);
                if (response.status === 201) {
                    // Job posting successfully created
                    console.log('Job posting created successfully');
                    // Reset form
                    setFormData({
                        title: '',
                        description: '',
                        requirements: '',
                        location: '',
                        salary: '',
                        jobType: '',
                        deadline: ''
                    });
                } else {
                    // Handle error
                    console.error('Failed to create job posting');
                }
            } catch (error) {
                console.log('Error:', error);
            }
        }
    };

    // Array of location options
    const locationOptions = ['Deçan', 'Dragash', 'Drenas', 'Ferizaj', 'Fushë Kosovë', 'Gjakovë', 'Gjilan', 'Burim',
        'Kaçanik', 'Dardanë', 'Klinë', 'Lipjan', 'Malishevë', 'Mitrovicë', 'Kastriot', 'Pejë',
        'Besianë', 'Prishtinë', 'Prizren', 'Rahovec', 'Skenderaj', 'Suharekë', 'Shtërpcë', 'Shtime',
        'Viti', 'Vushtrri'];
    // Array of category options
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
            <div className="post-job-container">
                <h1 className="post-job-title">Posto Pune</h1>
                <form className="post-job-form" onSubmit={handleSubmit}>
                    <input type="text" name="title" value={formData.title} onChange={handleChange}
                           placeholder="Titulli"/>
                    {formErrors.title && <span className="error">{formErrors.title}</span>}
                    <textarea name="description" value={formData.description} onChange={handleChange}
                              placeholder="Pershkrimi"></textarea>
                    {formErrors.description && <span className="error">{formErrors.description}</span>}
                    <input type="text" name="requirements" value={formData.requirements} onChange={handleChange}
                           placeholder="Kerkesat"/>
                    {formErrors.requirements && <span className="error">{formErrors.requirements}</span>}
                    <select name="location" value={formData.location} onChange={handleChange}>
                        <option value="">Select Location</option>
                        {locationOptions.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                    {formErrors.location && <span className="error">{formErrors.location}</span>}
                    <input type="text" name="salary" value={formData.salary} onChange={handleChange}
                           placeholder="Paga"/>
                    {formErrors.salary && <span className="error">{formErrors.salary}</span>}
                    <select name="jobType" value={formData.jobType} onChange={handleChange}>
                        <option value="">Select Category</option>
                        {categoryOptions.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                    {formErrors.jobType && <span className="error">{formErrors.jobType}</span>}
                    <input type="date" name="deadline" value={formData.deadline} onChange={handleChange}
                           placeholder="Deadline"/>
                    {formErrors.deadline && <span className="error">{formErrors.deadline}</span>}
                    <button type="submit" className="post-job-button">Posto</button>
                </form>
            </div>
        </>
    );
}

export default PostJob;
