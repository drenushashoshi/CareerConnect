import React, {useEffect, useState} from 'react'
import { listCompanies } from './Services/CompanyService'

const CompanyList = () => {

    const[company, setCompany]=useState([])

    useEffect(()=>{
        listCompanies().then((response)=>{
            setCompany(response.data);
        }).catch(error=>{
            console.error(error);
        })

    }, [])

  return (
    <div className='container'>
      <h2>List of Companies:</h2>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Password</th>
                    <th>Opening_year</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {
                    company.map(company=>
                        <tr key={company.id}>
                            <td>{company.id}</td>
                            <td>{company.name}</td>
                            <td>{company.email}</td>
                            <td>{company.address}</td>
                            <td>{company.phone_number}</td>
                            <td>{company.password}</td>
                            <td>{company.opening_year}</td>
                            <td>{company.description}</td>

                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default CompanyList
