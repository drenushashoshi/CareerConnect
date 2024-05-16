import React, { useState, useEffect } from 'react';
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
import { ReactComponent as DeleteButton } from './trash.svg';
import Modal from 'react-bootstrap/Modal';
import CompanyService from '../Services/CompanyService';

const ListStaff = ({ companyId }) => {
  const [companyStaff, setCompanyStaff] = useState([]);
  const [companyStaffId, setCompanyStaffId] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [role, setRole] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [staffChanges, setStaffChanges] = useState(0); // State to track changes

  useEffect(() => {
    fetchStaff(companyId);
  }, [companyId, staffChanges]); // Added staffChanges as a dependency

  const fetchStaff = async (companyId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await CompanyService.getAllCompanyStaff(companyId, token);
      setCompanyStaff(response);
    } catch (error) {
      console.log('Error fetching staff', error);
    }
  };

  const handleShowModal = (id) => {
    setShowModal(true);
    setCompanyStaffId(id);
    const token = localStorage.getItem('token');
    CompanyService.getStaff(id, token)
      .then((response) => {
        const { name, surname, role } = response;
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

    setNameError('');
    setSurnameError('');
    setRoleError('');

    let isValid = true;
    if (!name.trim()) {
      setNameError('Emri nuk mund të jetë bosh');
      isValid = false;
    }
    if (!surname.trim()) {
      setSurnameError('Mbiemri nuk mund të jetë bosh');
      isValid = false;
    }
    if (!role.trim()) {
      setRoleError('Pozita e punës nuk mund të jetë bosh');
      isValid = false;
    }

    if (isValid) {
      const staffData = { name, surname, role };
      const token = localStorage.getItem('token');
      CompanyService.updateStaff(companyStaffId, staffData, token)
        .then((response) => {
          console.log(response);
          handleCloseModal();
          setStaffChanges(prev => prev + 1); 
        })
        .catch(error => {
          console.error("Error updating staff:", error);
        });
    }
  };

  const deleteStaff = (staffId) => {
    const token = localStorage.getItem('token');
    CompanyService.deleteStaff(staffId, token)
      .then((response) => {
        console.log(response);
        setStaffChanges(prev => prev + 1); 
      })
      .catch(error => {
        console.error(error);
      });
  };

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
                  </button><br />
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
                      onChange={(e) => {
                        setName(e.target.value);
                        setNameError('');
                      }}
                    />
                    {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
                  </MDBCol>
                  <MDBCol>
                    <MDBInput
                      type="text"
                      placeholder='Mbiemri'
                      value={surname}
                      onChange={(e) => {
                        setSurname(e.target.value);
                        setSurnameError('');
                      }}
                    />
                    {surnameError && <div style={{ color: 'red' }}>{surnameError}</div>}
                  </MDBCol>
                </MDBRow><br />
                <MDBInput
                  type="text"
                  placeholder='Pozita e punes (p.sh CEO)'
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setRoleError('');
                  }}
                />
                {roleError && <div style={{ color: 'red' }}>{roleError}</div>}
              </MDBCardBody>
              <div className="d-flex justify-content-center">
                <MDBBtn
                  className='mb-3 btn-primary'
                  type="submit"
                  style={{
                    border: '1px solid #0d6efd',
                    width: '160px',
                    height: '40px'
                  }}
                >
                  Ruaj Ndryshimet
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
