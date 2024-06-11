import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { createEmployeePost } from '../Services/EmployeePostService';
import EmployeeService from "../Services/EmployeeService";

const EmployeePostSignup = ({ employeeId, loggedInEmployeeId}) => {
    const [formData, setFormData] = useState({
        media_url: null,
        title: '',
        content: '',
        timestamp: new Date().toISOString(),
        employeeId: null
    });
    const [error, setError] = useState('');
    const isEmployee = EmployeeService.isEmployee();

    useEffect(() => {
        setFormData(prevFormData => ({ ...prevFormData, employeeId }));
    }, [employeeId]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const newValue = name === 'media_url' ? (files.length > 0 ? files[0] : null) : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const postData = new FormData();
            if (formData.media_url != null) {
                postData.append('image', formData.media_url);
            }
            postData.append('title', formData.title);
            postData.append('content', formData.content);
            postData.append('timestamp', formData.timestamp);
            postData.append('employeeId', formData.employeeId);

            const response = await createEmployeePost(postData, token);
            console.log('Post created:', response);
            setFormData({ media_url: null, title: '', content: '', timestamp: new Date().toISOString(), employeeId: formData.employeeId });
            document.getElementById('media_url').value = null;
            window.location.reload();
        } catch (error) {
            console.error('Error creating post:', error);
            setError('Dështoi krijimi i postimit. Ju lutemi provoni përsëri.');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.shiftKey === false) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    if (employeeId !== loggedInEmployeeId || !isEmployee ) {
        return null;
    }
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="col-lg-6">
                <MDBCard className="mb-4" style={{ backgroundColor: '#e3f2fd', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)' }}>
                    <form onSubmit={handleSubmit}>
                        <MDBCardBody className="text-center">
                            {error && <p className="text-red-500">{error}</p>}
                            <MDBRow>
                                <MDBCol>
                                    <label htmlFor="media_url" className="btn btn-outline-primary">
                                        Ngarko Imazh
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="media_url"
                                        name="media_url"
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                    />
                                    {formData.media_url && <div className="mt-2">{formData.media_url.name}</div>}
                                </MDBCol>
                            </MDBRow><br />
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput
                                        type="text"
                                        placeholder='Titulli'
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        onKeyPress={handleKeyPress}
                                        required
                                    />
                                </MDBCol>
                            </MDBRow><br />
                            <MDBRow>
                                <MDBCol>
                                    <textarea
                                        placeholder='Përmbajtja'
                                        id="content"
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        onKeyPress={handleKeyPress}
                                        required
                                        style={{ width: '100%', minHeight: '150px', resize: 'vertical' }}
                                        rows={4}
                                        className="form-control"
                                    />
                                </MDBCol>
                            </MDBRow><br />
                        </MDBCardBody>
                        <div className="d-flex justify-content-center">
                            <MDBBtn
                                className='mb-3'
                                type="submit"
                                style={{
                                    backgroundColor: '#0d6efd',
                                    color: 'white',
                                    width: '100px',
                                    height: '40px'
                                }}
                            >
                                Posto
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCard>
            </div>
        </div>
    );
};

export default EmployeePostSignup;
