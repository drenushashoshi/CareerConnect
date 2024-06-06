import React, { useEffect, useState } from 'react';
import EmployeeService from '../Services/EmployeeService';
import SideNavBar from '../SideNavBar';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigator=useNavigate();

    useEffect(() => {
        if (!EmployeeService.isAdmin()) {
            navigator('/');
        }
    }, [navigator]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const removeEmployee = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await EmployeeService.deleteEmployee(id, token);
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee', error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await EmployeeService.getAllEmployees(token);
            setEmployees(response.employeeList);
        } catch (error) {
            console.log('Error fetching employees ', error);
        }
    };

    return (
        <div className="d-flex">
            <SideNavBar />
            <div className='container-fluid' style={{ marginLeft: '250px',marginTop:'100px', paddingTop: '20px' }}>
                <h2 style={{ fontFamily: 'Arial, sans-serif' }}>LISTA E PUNONJËSVE TË REGJISTRUAR:</h2><br/>
                <div className="table-responsive">
                    <table className='table table-striped table-bordered'>
                        <thead className="thead-dark">
                            <tr>
                                <th>Emri</th>
                                <th>Mbiemri</th>
                                <th>Mosha</th>
                                <th>Adresa</th>
                                <th>Email</th>
                                <th>Numri kontaktues</th>
                                <th>Preferencat për punë</th>
                                <th>Aftësitë</th>
                                <th>Shiko:</th>
                                <th>Kontrollo:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees?.map(employee => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.surname}</td>
                                    <td>{employee.age}</td>
                                    <td>{employee.address}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.jobPreferences}</td>
                                    <td>{employee.skills}</td>
                                    <td>
                                        <a href={`/EmployeePage/${employee.id}`}
                                            className="btn btn-link"
                                            style={{ padding: 0, textDecoration: 'none', color: '#007bff' }}
                                        >
                                            Profili i punetorit
                                        </a>
                                    </td>
                                    <td>
                                    <button className="btn btn-danger" onClick={() => removeEmployee(employee.id)}>
                                        Fshij profilin
                                    </button>

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

export default EmployeeList;
