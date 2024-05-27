import React, { useEffect, useState } from 'react';
import CompanyService from '../Services/CompanyService';
import SideNavBar from '../SideNavBar';
import { useNavigate } from 'react-router-dom';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false); 
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
            const response = await CompanyService.getAllCompanies();
            setCompanies(response.companyList);
        } catch (error) {
            console.log('Error fetching companies ', error);
        }
        
        setTimeout(() => {
            setLoading(false); 
        }, 3000);
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyList;
