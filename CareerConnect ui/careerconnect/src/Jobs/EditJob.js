import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJob, updateJob } from '../Services/JobService';
import { getIndustries } from '../Services/IndustriaService';
import { getLocations } from '../Services/LocationService';
import CustomNavbar from '../CustomNavbar';
import Footer from '../Footer';
import CompanyService from '../Services/CompanyService';

const EditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState('');
    const [locationName, setLocationName] = useState('');
    const [salary, setSalary] = useState('');
    const [industriaName, setIndustriaName] = useState('');
    const [deadline, setDeadline] = useState('');

    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [requirementsError, setRequirementsError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [salaryError, setSalaryError] = useState('');
    const [industryError, setIndustryError] = useState('');
    const [deadlineError, setDeadlineError] = useState('');

    const [locationOptions, setLocationOptions] = useState([]);
    const [industryOptions, setIndustryOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jobResponse = await getJob(id);
                const { title, description, requirements, locationName, salary, industriaName, deadline } = jobResponse.data;
                setTitle(title);
                setDescription(description);
                setRequirements(requirements);
                setLocationName(locationName);
                setSalary(salary);
                setIndustriaName(industriaName);
                setDeadline(deadline);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }

            try {
                const locationResponse = await getLocations();
                if (Array.isArray(locationResponse.data)) {
                    setLocationOptions(locationResponse.data);
                } else {
                    console.error('Error: getLocations did not return an array');
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            }

            try {
                const industryResponse = await getIndustries();
                if (Array.isArray(industryResponse)) {
                    setIndustryOptions(industryResponse);
                } else {
                    console.error('Error: getIndustries did not return an array');
                }
            } catch (error) {
                console.error('Error fetching industries:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    useEffect(() => {
        if (!CompanyService.isCompany()) {
            navigate('/');
        } else {
            const storedCompanyId = sessionStorage.getItem('companyId');
            const jobCompanyId = localStorage.getItem('jobCompanyId');
            if (storedCompanyId !== jobCompanyId) {
                CompanyService.logout();
                navigate('/');
            }
        }
    }, [navigate]);

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;

        if (!title.trim()) {
            setTitleError('Title cannot be empty');
            isValid = false;
        } else {
            setTitleError('');
        }

        if (!description.trim()) {
            setDescriptionError('Description cannot be empty');
            isValid = false;
        } else {
            setDescriptionError('');
        }

        if (!requirements.trim()) {
            setRequirementsError('Requirements cannot be empty');
            isValid = false;
        } else {
            setRequirementsError('');
        }

        if (!locationName.trim()) {
            setLocationError('Location cannot be empty');
            isValid = false;
        } else {
            setLocationError('');
        }

        if (!salary.trim()) {
            setSalaryError('Salary cannot be empty');
            isValid = false;
        } else {
            setSalaryError('');
        }

        if (!industriaName.trim()) {
            setIndustryError('Job type cannot be empty');
            isValid = false;
        } else {
            setIndustryError('');
        }

        if (!deadline.trim()) {
            setDeadlineError('Deadline cannot be empty');
            isValid = false;
        } else {
            setDeadlineError('');
        }

        if (isValid) {
            const updatedJob = { title, description, requirements, locationName, salary, industriaName, deadline };
            if (id) {
                const token = localStorage.getItem('token');
                updateJob(id, updatedJob, token)
                    .then(() => {
                        navigate(`/Job/${id}`);
                    })
                    .catch(error => {
                        console.error('Error updating job:', error);
                    });
            }
        }
    };

    return (
        <>
            <CustomNavbar />
            <main>
                <br />
                <div className="job-post-company pt-120 pb-120">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-xl-7 col-lg-8">
                                <div className="single-job-items mb-50">
                                    <div className="job-items">
                                        <div className="job-tittle">
                                            <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Title</h4>
                                            <p style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>
                                                <input type="text" value={title} onChange={handleChange(setTitle)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px', width: '400px' }} />
                                                {titleError && <div style={{ color: 'red' }}>{titleError}</div>}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="job-post-details">
                                    <div className="post-details1 mb-50">
                                        <div className="small-section-tittle">
                                            <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Description</h4>
                                        </div>
                                        <textarea value={description} onChange={handleChange(setDescription)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px', width: '100%', height: '200px', resize: 'none' }}></textarea>
                                        {descriptionError && <div style={{ color: 'red' }}>{descriptionError}</div>}
                                    </div>
                                    <div className="post-details2 mb-50">
                                        <div className="small-section-tittle">
                                            <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Requirements</h4>
                                        </div>
                                        <textarea value={requirements} onChange={handleChange(setRequirements)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px', width: '100%', height: '200px', resize: 'none' }}></textarea>
                                        {requirementsError && <div style={{ color: 'red' }}>{requirementsError}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4">
                                <div className="post-details3 mb-4">
                                    <div className="small-section-tittle">
                                        <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>General Information</h4>
                                    </div>
                                    <ul style={{ listStyle: 'none' }}>
                                        <li>
                                            Location:
                                            <select
                                                value={locationName}
                                                onChange={handleChange(setLocationName)}
                                                className="form-control"
                                                style={{ width: '100%' }}
                                            >
                                                <option value="">Select Location</option>
                                                {locationOptions.map((location) => (
                                                    <option key={location.name} value={location.name}>{location.name}</option>
                                                ))}
                                            </select><br />
                                            {locationError && <div style={{ color: 'red' }}>{locationError}</div>}
                                        </li>
                                        <li>
                                            Job Type:
                                            <select
                                                value={industriaName}
                                                onChange={handleChange(setIndustriaName)}
                                                className="form-control"
                                                style={{ width: '100%' }}
                                            >
                                                <option value="">Select Job Type</option>
                                                {industryOptions.map((industria) => (
                                                    <option key={industria.name} value={industria.name}>{industria.name}</option>
                                                ))}
                                            </select>
                                            <br />
                                            {industryError && <div style={{ color: 'red' }}>{industryError}</div>}
                                        </li>
                                        <li>
                                            Salary: <input type="text" value={salary} onChange={handleChange(setSalary)}
                                                           style={{
                                                               borderRadius: '5px',
                                                               padding: '5px',
                                                               marginBottom: '10px',
                                                               width: '100%'
                                                           }}/>
                                            {salaryError && <div style={{ color: 'red' }}>{salaryError}</div>}
                                        </li>
                                        <li>
                                            Application Deadline:
                                            <input
                                                type="date"
                                                value={deadline}
                                                onChange={handleChange(setDeadline)}
                                                className="form-control"
                                                style={{ width: '100%' }}
                                            />
                                            <br />
                                            {deadlineError && <div style={{ color: 'red' }}>{deadlineError}</div>}
                                        </li>
                                    </ul>
                                    <button onClick={handleSubmit} className="btn btn-primary">Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default EditJob;
