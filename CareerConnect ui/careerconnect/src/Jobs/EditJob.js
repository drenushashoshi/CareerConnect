import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJob, updateJob } from '../Services/JobService';
import CustomNavbar from "../CustomNavbar";
import './PostJob.css';

const EditJob = () => {
    const { id } = useParams();
    const navigator = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        location: '',
        salary: '',
        jobType: '',
        deadline: ''
    });

    useEffect(() => {
        if (id) {
            getJob(id)
                .then(response => {
                    const { title, description, requirements, location, salary, jobType, deadline } = response.data;
                    setFormData({ title, description, requirements, location, salary, jobType, deadline });
                })
                .catch(error => {
                    console.error('Error fetching job details:', error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateJob(id, formData);
            navigator(`/job/${id}`);
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    return (
        <>
            <CustomNavbar />
            <div className="post-job-container">
                <h1 className="post-job-title">Edit Job Posting</h1>
                <form className="post-job-form" onSubmit={handleSubmit}>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title"/>
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows="6"></textarea>
                    <textarea name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Requirements" rows="6"></textarea>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location"/>
                    <input type="text" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary"/>
                    <input type="text" name="jobType" value={formData.jobType} onChange={handleChange} placeholder="Job Type"/>
                    <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} placeholder="Deadline"/>
                    <button type="submit" className="post-job-button">Save Changes</button>
                </form>
            </div>
        </>
    );
}

export default EditJob;
