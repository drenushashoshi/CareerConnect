import React, { useEffect, useState } from 'react';
import CompanyService from '../Services/CompanyService';
import SideNavBar from '../SideNavBar';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await CompanyService.getAllCompanies();
            setCompanies(response.companyList);
        } catch (error) {
            console.log('Error fetching companies ', error);
        }
    };

    return (
        <div className="d-flex">
            <SideNavBar />
            <div className='container-fluid' style={{ marginLeft: '250px', marginTop: '100px', paddingTop: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h2>LIST OF COMPANIES REGISTERED:</h2><br/>
                <div className="table-responsive">
                    <table className='table table-striped table-bordered'>
                        <thead className="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Opening Year</th>
                                <th style={{ minWidth: '250px' }}>Description</th>
                                <th>Check:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map(company => (
                                <tr key={company.id}>
                                    <td>{company.name}</td>
                                    <td>{company.email}</td>
                                    <td>{company.address}</td>
                                    <td>{company.phone_number}</td>
                                    <td>{company.opening_year}</td>
                                    <td>{company.description}</td>
                                    <td>
                                        <a href={`./CompanyPage/${company.id}`} className="btn-link mr-2">Company's Page</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompanyList;
