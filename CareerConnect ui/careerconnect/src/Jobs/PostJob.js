import React, { useState, useEffect } from 'react';
import './PostJob.css';
import CustomNavbar from "../CustomNavbar";
import { createJob } from '../Services/JobService';
import { getLocations } from '../Services/LocationService';
import { getIndustries } from '../Services/IndustriaService';
import { Link } from "react-router-dom";

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
    const [locations, setLocations] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

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
                    // Display success message
                    setSuccessMessage('Job posting created successfully!');
                } else {
                    // Handle error
                    console.error('Failed to create job posting');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <>
            <CustomNavbar />
            <div className="post-job-container">
                <h1 className="post-job-title">Post a Job</h1>
                <form className="post-job-form" onSubmit={handleSubmit}>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
                    {formErrors.title && <span className="error">{formErrors.title}</span>}
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows="6" />
                    {formErrors.description && <span className="error">{formErrors.description}</span>}
                    <textarea name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Requirements" rows="6" />
                    {formErrors.requirements && <span className="error">{formErrors.requirements}</span>}
                    <select name="location" value={formData.location} onChange={handleChange}>
                        <option value="">Select Location</option>
                        {locations.map(location => (
                            <option key={location.name} value={location.name}>{location.name}</option>
                        ))}
                    </select>
                    {formErrors.location && <span className="error">{formErrors.location}</span>}
                    <input type="text" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" />
                    {formErrors.salary && <span className="error">{formErrors.salary}</span>}
                    <select name="jobType" value={formData.jobType} onChange={handleChange}>
                        <option value="">Select Category</option>
                        {industries.map(industry => (
                            <option key={industry.name} value={industry.name}>{industry.name}</option>
                        ))}
                    </select>
                    {formErrors.jobType && <span className="error">{formErrors.jobType}</span>}
                    <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} placeholder="Deadline" />
                    {formErrors.deadline && <span className="error">{formErrors.deadline}</span>}
                    <button type="submit" className="post-job-button">Post Job</button>
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

export default PostJob;

