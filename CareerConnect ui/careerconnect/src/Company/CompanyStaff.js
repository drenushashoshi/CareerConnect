import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBInput, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import CompanyService from '../Services/CompanyService';

const CompanyStaff = ({ companyId }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [role, setRole] = useState('');
    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [roleError, setRoleError] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setNameError('');
        setSurnameError('');
        setRoleError('');

        let isValid = true;

        if (!name.trim()) {
            setNameError('Shkruani emrin');
            isValid = false;
        }

        if (!surname.trim()) {
            setSurnameError('Shkruani mbiemrin');
            isValid = false;
        }

        if (!role.trim()) {
            setRoleError('Shkruani rolin');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const companyStaff = { name, surname, role, companyId };

        const formData = new FormData();
        formData.append('companyStaff', JSON.stringify(companyStaff));
        if (image) {
            formData.append('image', image);
        }

        const token = localStorage.getItem('token');
        try {
            const response = await CompanyService.createCompanyStaff(formData, token);
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
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
                                /><br />
                                {roleError && <div className="text-danger">{roleError}</div>}
                                <div className="mb-3">
                                    <label
                                        htmlFor="fileInput"
                                        className="btn btn-outline-primary"
                                        style={{ display: 'block', cursor: 'pointer' }}
                                    >
                                        Foto
                                    </label>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />
                                    {image && <div className="mt-2">{image.name}</div>}
                                </div>
                            </MDBCardBody>
                            <div className="d-flex justify-content-center">
                                <button
                                    className='mb-3'
                                    type="submit"
                                    style={{
                                        backgroundColor: '#0d6efd',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 20px',
                                        fontSize: '14px',
                                        borderRadius:'10px'
                                    }}
                                >
                                    Posto Staf të kompanisë
                                </button>
                            </div>
                        </form>
                    </MDBCard>
                </div>
            </div>
        </div>
    );
}

export default CompanyStaff;
