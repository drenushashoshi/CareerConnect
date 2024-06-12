import React, { useEffect, useState } from 'react';
import EmployeeService from '../Services/EmployeeService';
import SideNavBar from '../SideNavBar';
import { Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const navigator = useNavigate();

    useEffect(() => {
        if (!EmployeeService.isAdmin()) {
            navigator('/');
        }
    }, [navigator]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await EmployeeService.getAllEmployees(token);
            setEmployees(response.employeeList);
        } catch (error) {
            console.log('Error fetching employees ', error);
        }
    };

    const openModal = (id) => {
        setSelectedEmployeeId(id);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedEmployeeId(null);
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await EmployeeService.deleteEmployee(selectedEmployeeId, token);
            fetchEmployees();
            closeModal();
        } catch (error) {
            console.error('Error deleting employee', error);
        }
    };
    const DeleteConfirmationModal = ({ show, handleClose, handleDelete }) => (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body className='text-center custom-font'>
            <h5 className='mt-3'>Me fshirjen e profilit, të gjitha te dhënat do fshihen. Doni të vazhdoni?</h5>
            <div className='mt-4 mb-4'>
              <Link to='' className='btn' onClick={handleClose} style={{ marginRight: '40px', textDecoration: 'none', color: '#007bff', borderColor: '#007bff' }}>Cancel</Link>
              <Button onClick={handleDelete} className='btn btn-primary' style={{ marginRight: '40px', textDecoration: 'none', color: '#fff', width: '80px' }}>OK</Button>
            </div>
          </Modal.Body>
        </Modal>
      );

    return (
        <div className="d-flex">
            <SideNavBar />
            <div className='container-fluid' style={{ marginLeft: '250px', marginTop: '100px', paddingTop: '20px' }}>
                <h2 style={{ fontFamily: 'Arial, sans-serif' }}>LISTA E PUNONJËSVE TË REGJISTRUAR:</h2><br />
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
                                        <button className="btn btn-danger" onClick={() => openModal(employee.id)}>
                                            Fshij profilin
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <DeleteConfirmationModal 
                show={showModal} 
                handleClose={closeModal} 
                handleDelete={handleDelete} 
            />
        </div>
    );
};

export default EmployeeList;
