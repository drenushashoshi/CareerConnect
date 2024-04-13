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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
    };

    return (
        <>
            <CostumNavbar />
            <div className="post-job-container">
                <h1 className="post-job-title">Posto Pune</h1>
                <form className="post-job-form" onSubmit={handleSubmit}>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Titulli" />
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Pershkrimi"></textarea>
                    <input type="text" name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Kerkesat" />
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Lokacioni" />
                    <input type="text" name="salary" value={formData.salary} onChange={handleChange} placeholder="Paga" />
                    <input type="text" name="jobType" value={formData.jobType} onChange={handleChange} placeholder="Kategoria" />
                    <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} placeholder="Deadline" />
                    <button type="submit" className="post-job-button">Posto</button>
                </form>
            </div>
        </>
    );
}

export default PostJob;
