import React, { useState, useEffect } from 'react';
import { listCompanyStaffs, getCompanyStaff, updateCompanyStaff, deleteCompanyStaff } from '../Services/CompanyStaffService';
import {
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCol,
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';
import { ReactComponent as EditButton } from './pencil.svg';
import {ReactComponent as DeleteButton} from './trash.svg'
import Modal from 'react-bootstrap/Modal';

const ListStaff = ({ companyId }) => {
    const [companyStaff, setCompanyStaff] = useState([]);
    const [companyStaffId, setCompanyStaffId] = useState(null);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [role, setRole] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        listCompanyStaffs(companyId)
            .then((response) => {
                setCompanyStaff(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [companyId]);

    const handleShowModal = (id) => {
        setShowModal(true);
        setCompanyStaffId(id);
        getCompanyStaff(id)
            .then((response) => {
                const { name, surname, role } = response.data;
                setName(name);
                setSurname(surname);
                setRole(role);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCompanyStaffId(null);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const staff = { name, surname, role };
        if (companyStaffId) {
            updateCompanyStaff(companyStaffId, staff)
                .then((response) => {
                    console.log(response.data);
                    handleCloseModal();
                    window.location.href = `/CompanyPage/${companyId}`;
                })
                .catch(error => {
                    console.error("Error updating companyStaff:", error);
                });
        }
    };

    function deleteStaff(staffId) {
        deleteCompanyStaff(staffId)
          .then((response) => {
            window.location.href = `/CompanyPage/${companyId}`;
          })
          .catch(error => {
            console.error(error);
          });
      }

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {companyStaff.map(staff => (
                    <div key={staff.id} className="col mb-4">
                        <MDBCard className="h-100 position-relative" style={{ backgroundColor: '#e3f2fd', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)' }}>
                            <MDBCardBody className="text-center">
                                <div className="position-absolute top-0 end-0 mt-2 me-2">
                                <button
                                    onClick={() => handleShowModal(staff.id)}
                                    style={{
                                        border: 'none',
                                        background: 'none',
                                        padding: 0,
                                        cursor: 'pointer' 
                                    }}
                                >
                                    <EditButton />
                                </button><br/>
                                <button
                                    onClick={() => deleteStaff(staff.id)}
                                    style={{
                                        border: 'none',
                                        background: 'none',
                                        padding: 0,
                                        cursor: 'pointer' 
                                    }}
                                >
                                    <DeleteButton />
                                </button>
                                </div>
                                <MDBRow>
                                    <MDBCardText>{staff.name} {staff.surname}</MDBCardText>
                                </MDBRow>
                                <MDBCardText>{staff.role}</MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                ))}
            </div>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Body className='text-center custom-font'>
                    <MDBCard className="mb-4" style={{ backgroundColor: '#e3f2fd', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)' }}>
                        <form onSubmit={handleSubmit}>
                            <MDBCardBody className="text-center">
                                <MDBRow>
                                    <MDBCol>
                                        <MDBInput
                                            type="text"
                                            placeholder='Emri'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </MDBCol>
                                    <MDBCol>
                                        <MDBInput
                                            type="text"
                                            placeholder='Mbiemri'
                                            value={surname}
                                            onChange={(e) => setSurname(e.target.value)}
                                        />
                                    </MDBCol>
                                </MDBRow><br />
                                <MDBInput
                                    type="text"
                                    placeholder='Pozita e punes (p.sh CEO)'
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                            </MDBCardBody>
                            <div className="d-flex justify-content-center">
                                <MDBBtn
                                    className='mb-3 btn-primary'
                                    type="submit"
                                    style={{
                                        border: '1px solid #0d6efd',
                                        width: '140px',
                                        height: '40px'
                                    }}
                                >
                                    Save Changes
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBCard>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ListStaff;
