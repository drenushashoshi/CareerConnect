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
    <div >
      <h2>List of Companies:</h2>
      <table className='table'>
        <thread>
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
        </thread>
        <tbody>
            {
                company.map(company=>
                    <tr key={company.id}>
                        <td>{company.id}</td>
                        <td>{company.name}</td>
                        <td>{company.email}</td>
                        <td>{company.address}</td>
                        <td>{company.phone}</td>
                        <td>{company.password}</td>
                        <td>{company.opening_year}</td>
                        <td>{company.description}</td>

                    </tr>)
            }
        </tbody>
      </table>
    </div>
  )
}

export default CompanyList
