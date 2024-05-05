import React, { useEffect, useState } from 'react';
import { listCompanies } from '../Services/CompanyService';
import CustomNavbar from '../CustomNavbar';
import Footer from '../Footer';


const CompanyList = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        listCompanies()
            .then((response) => {
                setCompanies(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    

    return (
        <div>
            <CustomNavbar />
            <br/><div className='container-fluid'> 
                <h2 style={{ fontFamily: 'Arial, sans-serif', color:'#0056b3', fontWeight: 'bold', textAlign: 'center'  }}>List of Companies Registered:</h2>
                <div className="table-responsive">
                    <table className='table table-striped table-bordered' style={{ width: '100%' }}>
                        <thead className="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Password</th>
                                <th>Opening Year</th>
                                <th style={{ minWidth: '250px' }}>Description</th> 
                                <th>Check:</th>  
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map(company => (
                                <tr key={company.id}>
                                    <td>{company.id}</td>
                                    <td>{company.name}</td>
                                    <td>{company.email}</td>
                                    <td>{company.address}</td>
                                    <td>{company.phone_number}</td>
                                    <td>{company.password}</td>
                                    <td>{company.opening_year}</td>
                                    <td>{company.description}</td>
                                    <td>
                                        <a href={`./CompanyPage/${company.id}`}  className="btn-link mr-2">Company`s Page</a>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CompanyList;
