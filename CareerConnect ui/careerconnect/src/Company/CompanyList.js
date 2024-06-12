import React, { useEffect, useState } from 'react';
import CompanyService from '../Services/CompanyService';
import SideNavBar from '../SideNavBar';
import { Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigator = useNavigate();

    useEffect(() => {
        if (!CompanyService.isAdmin()) {
            navigator('/');
        }
    }, [navigator]);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await CompanyService.getAllCompanies(token);
            setCompanies(response.companyList);
        } catch (error) {
            console.log('Error fetching companies ', error);
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const openModal = (companyId) => {
        setSelectedCompanyId(companyId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCompanyId(null);
    };

    const removeCompany = async () => {
        try {
            const token = localStorage.getItem('token');
            await CompanyService.deleteCompany(selectedCompanyId, token);
            closeModal();
            fetchCompanies();
        } catch (error) {
            console.error('Error deleting company', error);
        }
    };

    const DeleteConfirmationModal = ({ show, handleClose, handleDelete }) => (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body className='text-center custom-font'>
                <h5 className='mt-3'>A jeni të sigurtë që dëshironi të fshini këtë kompani?</h5>
                <div className='mt-4 mb-4'>
                    <Link to='' className='btn' onClick={handleClose} style={{ marginRight: '40px', textDecoration: 'none', color: '#007bff', borderColor: '#007bff' }}>Anulo</Link>
                    <Button onClick={handleDelete} className='btn btn-primary' style={{ marginRight: '40px', textDecoration: 'none', color: '#fff', width: '80px' }}>OK</Button>
                </div>
            </Modal.Body>
        </Modal>
    );

    return (
        <div className="d-flex">
            <SideNavBar />
            <div className='container-fluid' style={{ marginLeft: '250px', marginTop: '100px', paddingTop: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h2>LISTA E KOMPANIVE TË REGJISTRUARA:</h2><br />
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="table-responsive">
                        <table className='table table-striped table-bordered'>
                            <thead className="thead-dark">
                                <tr>
                                    <th>Emri</th>
                                    <th>Email</th>
                                    <th>Adresa</th>
                                    <th>Numri kontaktues</th>
                                    <th>Viti i hapjes</th>
                                    <th style={{ minWidth: '250px' }}>Përshkrimi</th>
                                    <th>Shiko:</th>
                                    <th>Kontrollo:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies?.map(company => (
                                    <tr key={company.id}>
                                        <td>{company.name}</td>
                                        <td>{company.email}</td>
                                        <td>{company.address}</td>
                                        <td>{company.phone_number}</td>
                                        <td>{company.opening_year}</td>
                                        <td>{company.description}</td>
                                        <td>
                                            <a href={`/CompanyPage/${company.id}`}
                                                className="btn btn-link"
                                                style={{ padding: 0, textDecoration: 'none', color: '#007bff' }}
                                            >
                                                Profili i kompanisë
                                            </a>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => openModal(company.id)}>
                                                Fshij profilin
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
                <DeleteConfirmationModal 
                    show={showModal} 
                    handleClose={closeModal} 
                    handleDelete={removeCompany} 
                />
            </div>
        </div>
    );
};

export default CompanyList;
