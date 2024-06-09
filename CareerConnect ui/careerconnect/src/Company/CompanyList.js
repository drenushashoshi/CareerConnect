import React, { useEffect, useState } from 'react';
import CompanyService from '../Services/CompanyService';
import SideNavBar from '../SideNavBar';
import { useNavigate } from 'react-router-dom';

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

    const removeCompany = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await CompanyService.deleteCompany(id, token);
            setShowModal(false);
            fetchCompanies();
        } catch (error) {
            console.error('Error deleting company', error);
        }
    };

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
    };

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

                
                {showModal && (
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">A jeni të sigurtë që dëshironi të fshini këtë kompani?</h5>
                                </div>
                                
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Anulo</button>
                                    <button type="button" className="btn btn-danger" onClick={() => removeCompany(selectedCompanyId)}>Fshij</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default CompanyList;
