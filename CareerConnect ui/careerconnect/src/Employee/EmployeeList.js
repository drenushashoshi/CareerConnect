import React, { useEffect, useState } from 'react';
import EmployeeService from '../Services/EmployeeService';
import SideNavBar from '../SideNavBar';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await EmployeeService.getAllEmployees();
            setEmployees(response.employeeList);
        } catch (error) {
            console.log('Error fetching employees ', error);
        }
    };

    return (
        <div className="d-flex">
            <SideNavBar />
            <div className='container-fluid' style={{ marginLeft: '250px',marginTop:'100px', paddingTop: '20px' }}>
                <h2 style={{ fontFamily: 'Arial, sans-serif' }}>LIST OF EMPLOYEES:</h2><br/>
                <div className="table-responsive">
                    <table className='table table-striped table-bordered'>
                        <thead className="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Age</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Job Preferences</th>
                                <th>Skills</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.surname}</td>
                                    <td>{employee.age}</td>
                                    <td>{employee.address}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.jobPreferences}</td>
                                    <td>{employee.skills}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
