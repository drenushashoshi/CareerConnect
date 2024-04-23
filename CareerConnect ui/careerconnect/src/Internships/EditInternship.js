import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomNavbar from '../CustomNavbar';
import { getInternship, updateInternship } from '../Services/InternshipService';

const EditInternship = () => {
    const [tittle, setTittle] = useState('');
    const [company_name, setCompany_name] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [requirements, setRequirements] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    const [deadline, setDeadline] = useState('');

    const { id } = useParams();
    const [internship, setInternship] = useState(null);

    useEffect(() => {
        if (id) {
            getInternship(id)
                .then((response) => {
                    setInternship(response.data);
                    setTittle(response.data.tittle);
                    setCompany_name(response.data.company_name);
                    setStart_date(response.data.start_date);
                    setEnd_date(response.data.end_date);
                    setRequirements(response.data.requirements);
                    setDescription(response.data.description);
                    setLocation(response.data.location);
                    setType(response.data.type);
                    setDeadline(response.data.deadline);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [id]);

    const navigator = useNavigate();

    function saveInternship(e) {
        e.preventDefault();
        const updatedInternship = { tittle, company_name, description, start_date, end_date, requirements, location, type, deadline };
        if (id) {
            updateInternship(id, updatedInternship)
                .then((response) => {
                    console.log(response.data);
                    navigator(`/InternshipDetails/${id}`);
                })
                .catch(error => {
                    console.error("Error updating internship:", error);
                });
        }
    }

    return (
        <>
            <CustomNavbar />
            <main>
                <div className="job-post-company pt-120 pb-120">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-xl-7 col-lg-8">
                                <div className="single-job-items mb-50">
                                    <div className="job-items">
                                        <div className="job-tittle">
                                            <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Titulli</h4>
                                            <p style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>
                                                <input type="text" value={tittle} onChange={(e) => setTittle(e.target.value)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px' }} />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="job-post-details">
                                    <div className="post-details1 mb-50">
                                        <div className="small-section-tittle">
                                            <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Pershkrimi</h4>
                                        </div>
                                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px', width: '100%', height: '200px', resize: 'none' }}></textarea>
                                    </div>
                                    <div className="post-details2 mb-50">
                                        <div className="small-section-tittle">
                                            <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Njohurite e nevojshme</h4>
                                        </div>
                                        <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px', width: '100%', height: '200px', resize: 'none' }}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4">
                                <div className="post-details3 mb-4">
                                    <div className="small-section-tittle">
                                        <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Informatat e pergjithshme</h4>
                                    </div>
                                    <ul style={{ listStyle: 'none' }}>
                                        <li>Lokacioni: <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ borderRadius: '5px',  padding: '5px', marginBottom: '10px' }} /></li>
                                        <li>Tipi i punes: <input type="text" value={type} onChange={(e) => setType(e.target.value)} style={{ borderRadius: '5px',  padding: '5px', marginBottom: '10px' }} /></li>
                                        <li>Data e fillimit: <input type="text" value={start_date} onChange={(e) => setStart_date(e.target.value)} style={{ borderRadius: '5px',  padding: '5px', marginBottom: '10px' }} /></li>
                                        <li>Data e pefundimit: <input type="text" value={end_date} onChange={(e) => setEnd_date(e.target.value)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px' }} /></li>
                                        <li>Afati i dorezimit: <input type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)} style={{ borderRadius: '5px',  padding: '5px', marginBottom: '10px' }} /></li>
                                    </ul>
                                </div>
                                <div className="post-details4 mb-4">
                                    <div className="small-section-tittle">
                                        <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Company Information</h4>
                                    </div>
                                    <ul style={{ listStyle: 'none' }}>
                                        <li>Emri i kompanise: <input type="text" value={company_name} onChange={(e) => setCompany_name(e.target.value)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px' }} /></li>
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="apply-btn2" style={{ textAlign: 'center' }}>
                            <button className="btn btn-primary" onClick={saveInternship} style={{ borderRadius: '5px', backgroundColor: '#4e8fff', color: 'white', padding: '10px 20px', cursor: 'pointer', transition: 'background-color 0.3s' }}>Ruaj ndryshimet</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default EditInternship;
