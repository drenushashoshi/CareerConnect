import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CustomNavbar from '../CustomNavbar';
import { getJob, deleteJob, getCompany } from '../Services/JobService';
import Footer from '../Footer';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import CompanyService from "../Services/CompanyService";
import EmployeeService from "../Services/EmployeeService";

const JobDetails = () => {
    const [showModal, setShowModal] = useState(false);
    const [ company, setCompany] = useState(null);
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const navigator = useNavigate();
    const isCompany=CompanyService.isCompany();
    const isEmployee=EmployeeService.isEmployee();


    useEffect(() => {
        const fetchJobAndCompanyDetails = async () => {
            try {
                const jobResponse = await getJob(id);
                const jobData = jobResponse.data;
                setJob(jobData);

                const companyId = jobData.companyId;
                const companyResponse = await getCompany(companyId);
                const companyData = companyResponse.data;
                setCompany(companyData);

                console.log("Job Data:", jobData);
                console.log("Company Data:", companyData);
            } catch (error) {
                console.error('Error fetching job or company details:', error);
            }
        };

        fetchJobAndCompanyDetails();
    }, [id]);

    function handleDeleteJob() {
        const token = localStorage.getItem('token');
        deleteJob(id, token)
            .then(() => {
                navigator('/AllJobs');
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSignUpClick = (event) => {
        event.preventDefault();
        handleShowModal();
    };

    return (
        <>
            <CustomNavbar />
            <main>
                {job && (
                    <div className="job-post-company pt-120 pb-120 mt-5">
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-xl-7 col-lg-8">
                                    <div className="single-job-items mb-50">
                                        <div className="job-items">
                                            <div className="job-tittle">
                                                <h2 style={{
                                                    fontFamily: 'Arial, sans-serif',
                                                    fontWeight: 'bold'
                                                }}>{job.title}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="job-post-details">
                                        <h3 style={{
                                            fontFamily: 'Arial, sans-serif',
                                            fontWeight: 'bold'
                                        }}>Job Description</h3>
                                        <div className=" mb-50">
                                            <p dangerouslySetInnerHTML={{__html: job.description}}>
                                            </p>
                                        </div>
                                        <div className="post-details2 mb-50">
                                            <div className="small-section-tittle">
                                                <h3 style={{
                                                    fontFamily: 'Arial, sans-serif',
                                                    fontWeight: 'bold'
                                                }}>Requirements</h3>
                                            </div>
                                            <li dangerouslySetInnerHTML={{__html: job.requirements}}></li>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4">
                                    <div className=" mb-4"
                                         style={{backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px'}}>
                                        <div className=" justify-content-center">
                                            <h5><strong>General Information</strong></h5>
                                        </div>
                                        <ul style={{listStyleType: 'none'}}>
                                            <li>Location: <span>{job.locationName}</span></li>
                                            <li>Industry: <span>{job.industriaName}</span></li>
                                            <li>Deadline: <span>{job.deadline}</span></li>
                                            <li>Company: <span></span></li>
                                        </ul>
                                        <div className="apply-btn2 d-flex justify-content-center">
                                            {isEmployee &&<Link to="/applications" className="btn btn-primary">Apply</Link>}
                                        </div>
                                        <div className="post-details4 mb-4">
                                            <div className="small-section-tittle">
                                                <h4>Company Information</h4>
                                            </div>
                                            {company ? (
                                                <ul>
                                                    <li>Name: {company.name}</li>
                                                    <li>Email: {company.email}</li>
                                                    <li>Phone Number: {company.phone_number}</li>
                                                </ul>
                                            ) : (
                                                <p>Loading company information...</p>
                                            )}
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <Link to={`/CompanyPage/${job.companyId}`} style={{
                                                textDecoration: 'none',
                                                color: '#007bff',
                                                borderColor: '#007bff'
                                            }} className="btn">View Company</Link>
                                        </div>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className='mt-5' style={{display: 'flex', justifyContent: 'center', gap: '50px'}}>
                    {isCompany && (
                        <Link to={`/edit-job/${id}`}>
                            <button className='btn btn-primary' style={{
                                borderRadius: '5px',
                                color: 'white',
                                cursor: 'pointer',
                                border: 'none',
                                padding: '10px 20px',
                                transition: 'background-color 0.3s'
                            }}>
                                Edit Job Details
                            </button>
                        </Link>
                    )}
                    {isCompany && (
                        <button className='btn btn-primary' onClick={handleSignUpClick} style={{
                            borderRadius: '5px',
                            color: 'white',
                            cursor: 'pointer',
                            border: 'none',
                            padding: '10px 20px',
                            transition: 'background-color 0.3s'
                        }}>
                            Delete Job
                        </button>
                    )}
                </div>
                <br/><br/>
            </main>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Body className='text-center custom-font'>
                    <h5 className='mt-3'>Are you sure you want to delete this job?</h5>
                    <div className='mt-4 mb-4'>
                        <Link to='' className='btn ' onClick={handleCloseModal} style={{
                            marginRight: '40px',
                            textDecoration: 'none',
                            color: '#007bff',
                            borderColor: '#007bff'
                        }}>Cancel</Link>
                        <Link to='' onClick={() => handleDeleteJob(id)} className='btn btn-primary' style={{
                            marginRight: '40px',
                            textDecoration: 'none',
                            color: '#fff',
                            width: '80px'
                        }}>OK</Link>
                    </div>
                </Modal.Body>
            </Modal>
            <Footer/>
        </>
    );
}

export default JobDetails;
