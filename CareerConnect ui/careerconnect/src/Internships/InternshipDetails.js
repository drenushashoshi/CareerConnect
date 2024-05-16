import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CustomNavbar from '../CustomNavbar';
import InterService from '../Services/InterService';
import Footer from '../Footer';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';



const InternshipDetails = () => {

    const [tittle, setTittle] = useState('');
    const [company_name, setCompany_name] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [requirements, setRequirements] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    const [deadline, setDeadline] = useState('');
    const [showModal, setShowModal] = useState(false);

    const {id}= useParams();
    const navigator = useNavigate();
    

    useEffect(() => {
        if (id) {
          InterService.getInternshipById(id)
            .then((response) => {
              setTittle(response.tittle);
              setCompany_name(response.company_name);
              setStart_date(response.start_date);
              setEnd_date(response.end_date);
              setRequirements(response.requirements);
              setDescription(response.description);
              setLocation(response.location);
              setType(response.type);
              setDeadline(response.deadline);
            
            })
            .catch(error => {
              console.error(error);
            });
        }
    }, [id]);

    function handleDeleteInternship() {
        const token =localStorage.getItem('token');
        InterService.deleteInternship(id,token) 
            .then(() => {
                navigator('/InternshipsList'); 
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
                <div className="job-post-company pt-120 pb-120 mt-5">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-xl-7 col-lg-8">
                                <div className="single-job-items mb-50">
                                    <div className="job-items">
                                        <div className="job-tittle">
                                            <h2 style={{ fontFamily: 'Arial, sans-serif',  fontWeight: 'bold' }}>{tittle}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="job-post-details">
                                    <div className=" mb-50">
                                        <p >{description}</p>
                                    </div>
                                    <div className="post-details2 mb-50">
                                        <div className="small-section-tittle">
                                            <h3 style={{ fontFamily: 'Arial, sans-serif',  fontWeight: 'bold' }}>Njohurite e nevojshme</h3>
                                        </div>
                                        <p>{requirements}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4">
                                <div className=" mb-4" style={{backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px'}}>
                                    <div className=" justify-content-center">
                                        <h5><strong>Informatat e pergjithshme</strong></h5>
                                    </div>
                                    <ul style={{listStyleType: 'none'}}> 
                                        <li>Lokacioni: <span>{location}</span></li>
                                        <li>Tipi i punes: <span>{type}</span></li>
                                        <li>Data e fillimit: <span>{start_date}</span></li>
                                        <li>Data e perfundimit: <span>{end_date}</span></li>
                                        <li>Afati i aplikimit: <span>{deadline}</span></li>
                                        <li>Kompania: <span>{company_name}</span></li>
                                    </ul>
                                    <div className="d-flex justify-content-center"> 
                                        <Link to="/CompanyPage"  style={{  textDecoration: 'none', color: '#007bff', borderColor:'#007bff' }}className="btn">Shiko Kompaninë</Link>
                                    </div><br/>
                                    <div className="apply-btn2 d-flex justify-content-center"> 
                                        <Link to="/applications" className="btn btn-primary">Apliko</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-5' style={{ display: 'flex', justifyContent: 'center', gap: '50px' }}>
                <Link to={`/EditInternship/${id}`}>
                    <button className='btn btn-primary' style={{ borderRadius: '5px', color: 'white', cursor: 'pointer', border: 'none', padding: '10px 20px', transition: 'background-color 0.3s' }}>
                        Ndrysho Detajet e Praktikes
                    </button>
                </Link>
                    <button className='btn btn-primary'
                    onClick={handleSignUpClick}
                    style={{  borderRadius: '5px', color: 'white', cursor: 'pointer', border: 'none', padding: '10px 20px', transition: 'background-color 0.3s' }}>
                        Fshij Praktiken
                    </button>
                </div><br/><br/>

            
            </main>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Body className='text-center custom-font'>
                <h5 className='mt-3'>A jeni të sigurtë që doni të fshini praktikën?</h5>
                <div className='mt-4 mb-4'>
                    <Link to='' className='btn ' onClick={handleCloseModal} style={{ marginRight: '40px', textDecoration: 'none', color: '#007bff', borderColor:'#007bff' }}>Cancel</Link>

                    <Link to='' onClick={() =>handleDeleteInternship(id)} className='btn btn-primary' style={{ marginRight: '40px', textDecoration: 'none', color: '#fff', width:'80px' }}>OK</Link>
                </div>
                </Modal.Body>
            </Modal>
            <Footer/>
        </>
    );
}

export default InternshipDetails;