import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CustomNavbar from '../CustomNavbar';
import { getJob, deleteJob, getCompany } from '../Services/JobService';
import Footer from '../Footer';
import Modal from 'react-bootstrap/Modal';
import CompanyService from '../Services/CompanyService';
import EmployeeService from '../Services/EmployeeService';
import { Spinner } from 'react-bootstrap';

const JobDetails = () => {
    const [showModal, setShowModal] = useState(false);
    const [company, setCompany] = useState(null);
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const isCompany = CompanyService.isCompany();
    const isEmployee = EmployeeService.isEmployee();
    const storedCompanyId = sessionStorage.getItem('companyId');

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

                console.log("Të dhënat e punës:", jobData);
                console.log("Të dhënat e kompanisë:", companyData);
            } catch (error) {
                console.error('Gabim gjatë marrjes së të dhënave të punës ose kompanisë:', error);
            }
        };

        fetchJobAndCompanyDetails();
    }, [id]);

    const handleDeleteJob = async () => {
        const token = localStorage.getItem('token');
        setLoading(true);
        try {
            await deleteJob(id, token);
            navigate(`/CompanyPage/${job.companyId}`);
        } catch (error) {
            console.error('Gabim gjatë fshirjes së punës:', error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 4000);
        }
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <CustomNavbar />
            <main>
                {loading && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}>
                        <div style={{ textAlign: 'center', color: '#fff' }}>
                            <Spinner animation="border" variant="light" />
                            <h3 style={{ marginTop: '10px' }}>Duke u postuar</h3>
                        </div>
                    </div>
                )}
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
                                        }}>Përshkrimi i Punës</h3>
                                        <div className="mb-50">
                                            <p style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: job.description }}>
                                            </p>
                                        </div>
                                        <div className="post-details2 mb-50">
                                            <div className="small-section-tittle">
                                                <h3 style={{
                                                    fontFamily: 'Arial, sans-serif',
                                                    fontWeight: 'bold'
                                                }}>Kërkesat</h3>
                                            </div>
                                            <p style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: job.requirements }}></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4">
                                    <div className="mb-4" style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
                                        <div className="justify-content-center">
                                            <h5><strong>Informacione të Përgjithshme</strong></h5>
                                        </div>
                                        <ul style={{ listStyleType: 'none' }}>
                                            <li>Lokacioni: <span>{job.locationName}</span></li>
                                            <li>Industria: <span>{job.industriaName}</span></li>
                                            <li>Afati i Aplikimit: <span>{job.deadline}</span></li>
                                            <li>Paga: <span>{job.salary}</span></li>
                                        </ul>
                                        <div className="apply-btn2 d-flex justify-content-center">
                                            {isEmployee && <Link to={`/JobApplication/${id}`} className="btn btn-primary">Apliko</Link>}
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <Link to={`/CompanyPage/${job.companyId}`} style={{
                                                textDecoration: 'none',
                                                color: '#007bff',
                                                borderColor: '#007bff'
                                            }} className="btn">Shiko Kompaninë</Link>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className='mt-5' style={{ display: 'flex', justifyContent: 'center', gap: '50px' }}>
                    {isCompany && job && job.companyId && job.companyId.toString() === storedCompanyId && (
                        <>
                            <Link to={`/edit-job/${id}`}>
                                <button className='btn btn-primary' style={{
                                    borderRadius: '5px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    border: 'none',
                                    padding: '10px 20px',
                                    transition: 'background-color 0.3s'
                                }}>
                                    Ndrysho Detajet e Punës
                                </button>
                            </Link>
                            <button className='btn btn-primary'
                                    onClick={handleShowModal}
                                    style={{ borderRadius: '5px', color: 'white', cursor: 'pointer', border: 'none', padding: '10px 20px', transition: 'background-color 0.3s' }}>
                                Fshij Punën
                            </button>
                        </>
                    )}
                </div>
                <br /><br />
            </main>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Body className='text-center custom-font'>
                    <h5 className='mt-3'>A jeni të sigurtë që doni të fshini punën?</h5>
                    <div className='mt-4 mb-4'>
                        <Link to='' className='btn' onClick={handleCloseModal} style={{ marginRight: '40px', textDecoration: 'none', color: '#007bff', borderColor: '#007bff' }}>Anulo</Link>
                        <Link to='' onClick={handleDeleteJob} className='btn btn-primary' style={{ marginRight: '40px', textDecoration: 'none', color: '#fff', width: '80px' }}>OK</Link>
                    </div>
                </Modal.Body>
            </Modal>
            <Footer />
        </>
    );
}

export default JobDetails;
