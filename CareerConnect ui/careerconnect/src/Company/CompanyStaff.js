import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBInput, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import { createCompanyStaff } from '../Services/CompanyStaffService';


const CompanyStaff = ({ companyId }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [role, setRole] = useState('');
    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [roleError, setRoleError] = useState('');

    

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset error messages
        setNameError('');
        setSurnameError('');
        setRoleError('');

        let isValid = true;

        // Validate name
        if (!name) {
            setNameError('Please enter your name.');
            isValid = false;
        }

        // Validate surname
        if (!surname) {
            setSurnameError('Please enter your surname.');
            isValid = false;
        }

        // Validate role
        if (!role) {
            setRoleError('Please enter your role.');
            isValid = false;
        }

        // If any validation failed, stop execution
        if (!isValid) {
            return;
        }

        // If all inputs are valid, proceed with form submission
        const companyStaff = { name, surname, role, companyId };
        console.log(companyStaff);
        createCompanyStaff(companyStaff)
            .then((response) => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="container">
            <div className="row justify-content-start">
                <div className="col-lg-4">
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
                                        {nameError && <div className="text-danger">{nameError}</div>}
                                    </MDBCol>
                                    <MDBCol>
                                        <MDBInput
                                            type="text"
                                            placeholder='Mbiemri'
                                            value={surname}
                                            onChange={(e) => setSurname(e.target.value)}
                                        />
                                        {surnameError && <div className="text-danger">{surnameError}</div>}
                                    </MDBCol>
                                </MDBRow><br />
                                <MDBInput
                                    type="text"
                                    placeholder='Pozita e punes (p.sh CEO)'
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                {roleError && <div className="text-danger">{roleError}</div>}
                            </MDBCardBody>
                            <div className="d-flex justify-content-center">
                                <MDBBtn
                                    className='mb-3'
                                    type="submit"
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: 'black',
                                        border: '1px solid #0d6efd',
                                        width: '30px',
                                        height: '30px'
                                    }}
                                >
                                    +
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBCard>
                </div>
            </div>
        </div>
    );
}

export default CompanyStaff;
