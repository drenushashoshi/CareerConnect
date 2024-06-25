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
    const [companyId, setCompanyId] = useState('');

    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [requirementsError, setRequirementsError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [salaryError, setSalaryError] = useState('');
    const [industryError, setIndustryError] = useState('');
    const [deadlineError, setDeadlineError] = useState('');

    const [locationOptions, setLocationOptions] = useState([]);
    const [industryOptions, setIndustryOptions] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const jobResponse = await getJob(id);
                const { title, description, requirements, locationName, salary, industriaName, deadline, companyId } = jobResponse.data;
                setTitle(title);
                setDescription(description);
                setRequirements(requirements);
                setLocationName(locationName);
                setSalary(salary);
                setIndustriaName(industriaName);
                setDeadline(deadline);
                setCompanyId(companyId);
                console.log('Fetched companyId:', companyId);

                const locationResponse = await getLocations();
                if (Array.isArray(locationResponse.data)) {
                    setLocationOptions(locationResponse.data);
                } else {
                    console.error('Error: getLocations did not return an array');
                }

                const industryResponse = await getIndustries();
                if (Array.isArray(industryResponse)) {
                    setIndustryOptions(industryResponse);
                } else {
                    console.error('Error: getIndustries did not return an array');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    useEffect(() => {
        if (companyId) {
            const storedCompanyId = sessionStorage.getItem('companyId');
            console.log('Company ID from job:', companyId); // Debugging line
            console.log('Company ID from session:', storedCompanyId); // Debugging line

            if (!CompanyService.isCompany() || companyId.toString() !== storedCompanyId) {
                navigate('/');
            }
        }
    }, [companyId, navigate]);

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;

        if (!title.trim()) {
            setTitleError('Titulli nuk mund të jetë bosh');
            isValid = false;
        } else {
            setTitleError('');
        }

        if (!description.trim()) {
            setDescriptionError('Përshkrimi nuk mund të jetë bosh');
            isValid = false;
        } else {
            setDescriptionError('');
        }

        if (!requirements.trim()) {
            setRequirementsError('Kërkesat nuk mund të jenë bosh');
            isValid = false;
        } else {
            setRequirementsError('');
        }

        if (!locationName.trim()) {
            setLocationError('Vendndodhja nuk mund të jetë bosh');
            isValid = false;
        } else {
            setLocationError('');
        }

        if (!salary.trim()) {
            setSalaryError('Paga nuk mund të jetë bosh');
            isValid = false;
        } else {
            setSalaryError('');
        }

        if (!industriaName.trim()) {
            setIndustryError('Lloji i punës nuk mund të jetë bosh');
            isValid = false;
        } else {
            setIndustryError('');
        }

        if (!deadline.trim()) {
            setDeadlineError('Afati nuk mund të jetë bosh');
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

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{
                    border: '4px solid rgba(0, 0, 0, 0.1)',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    borderLeftColor: '#09f',
                    animation: 'spin 1s ease infinite',
                }} />
                <style>
                    {`
                        @keyframes spin {
                            0% {
                                transform: rotate(0deg);
                            }
                            100% {
                                transform: rotate(360deg);
                            }
                        }
                    `}
                </style>
            </div>
        );
    }
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
                                            <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Titulli</h4>
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
                                            <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Përshkrimi</h4>
                                        </div>
                                        <textarea value={description} onChange={handleChange(setDescription)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px', width: '100%', height: '200px', resize: 'none' }}></textarea>
                                        {descriptionError && <div style={{ color: 'red' }}>{descriptionError}</div>}
                                    </div>
                                    <div className="post-details2 mb-50">
                                        <div className="small-section-tittle">
                                            <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Kërkesat</h4>
                                        </div>
                                        <textarea value={requirements} onChange={handleChange(setRequirements)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px', width: '100%', height: '200px', resize: 'none' }}></textarea>
                                        {requirementsError && <div style={{ color: 'red' }}>{requirementsError}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4">
                                <div className="post-details3 mb-4">
                                    <div className="small-section-tittle">
                                        <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Informacion i Përgjithshëm</h4>
                                    </div>
                                    <ul style={{ listStyle: 'none' }}>
                                        <li>
                                            Vendndodhja:
                                            <select
                                                value={locationName}
                                                onChange={handleChange(setLocationName)}
                                                className="form-control"
                                                style={{ width: '100%' }}
                                            >
                                                <option value="">Zgjidh Vendndodhjen</option>
                                                {locationOptions.map((location) => (
                                                    <option key={location.name} value={location.name}>{location.name}</option>
                                                ))}
                                            </select><br />
                                            {locationError && <div style={{ color: 'red' }}>{locationError}</div>}
                                        </li>
                                        <li>
                                            Lloji i Punës:
                                            <select
                                                value={industriaName}
                                                onChange={handleChange(setIndustriaName)}
                                                className="form-control"
                                                style={{ width: '100%' }}
                                            >
                                                <option value="">Zgjidh Llojin e Punës</option>
                                                {industryOptions.map((industria) => (
                                                    <option key={industria.name} value={industria.name}>{industria.name}</option>
                                                ))}
                                            </select>
                                            <br />
                                            {industryError && <div style={{ color: 'red' }}>{industryError}</div>}
                                        </li>
                                        <li>
                                            Paga: <input type="text" value={salary} onChange={handleChange(setSalary)}
                                                         style={{
                                                             borderRadius: '5px',
                                                             padding: '5px',
                                                             marginBottom: '10px',
                                                             width: '100%'
                                                         }}/>
                                            {salaryError && <div style={{ color: 'red' }}>{salaryError}</div>}
                                        </li>
                                        <li>
                                            Afati: <input type="date" value={deadline} onChange={handleChange(setDeadline)}
                                                          style={{
                                                              borderRadius: '5px',
                                                              padding: '5px',
                                                              marginBottom: '10px',
                                                              width: '100%'
                                                          }}/>
                                            {deadlineError && <div style={{ color: 'red' }}>{deadlineError}</div>}
                                        </li>
                                    </ul>
                                    <button onClick={handleSubmit}
                                            className="btn btn-primary"
                                            style={{ backgroundColor: '#4e8fff', borderColor: '#4e8fff' }}>
                                        Përditëso Punën
                                    </button>
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
