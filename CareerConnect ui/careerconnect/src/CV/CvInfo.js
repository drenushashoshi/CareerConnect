import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import CvService from '../Services/CvService';
import CustomNavbar from '../CustomNavbar'

const CvInfo = () => {
    const fileRef = useRef();
    const navigate = useNavigate();
    const [file, setFile] = useState(undefined);
    const employeeId = sessionStorage.getItem('employeeId');
    const [values, setValues] = useState({
        employee: employeeId,
        name: '',
        surname: '',
        profilepic: null,
        email: '',
        description: '',
        college: '',
        degree: '',
        highschool: '',
        phone_nr: '',
        street: '',
        city: ''
    });

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(values);
            const createdCv = await CvService.createCv(values);
            const cvId = createdCv.cvid;
            console.log(cvId);
            const formData = new FormData();
            formData.append('file', file, file.name);
            console.log(formData);
            console.log(createdCv);
            setFile(undefined);
            fileRef.current.value = null;
            navigate(`/CvInfo/${cvId}`);
        } catch (error) {
            console.error('Error creating CV or uploading picture:', error);
        }
    };

    return (
        <>
            <CustomNavbar />
            <div className="container mt-2x">
                <h1 className="mb-4">Personal Information</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" className="form-control" id="name" name="name" value={values.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname">Surname:</label>
                                <input type="text" className="form-control" id="surname" name="surname" value={values.surname} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" className="form-control" id="email" name="email" value={values.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number:</label>
                                <input type="tel" className="form-control" id="phone_nr" name="phone_nr" value={values.phone_nr} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="street">Street:</label>
                                    <input type="text" className="form-control" id="street" name="street" value={values.street} onChange={handleChange} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="city">City:</label>
                                    <input type="text" className="form-control" id="city" name="city" value={values.city} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="college">College:</label>
                                <input type="text" className="form-control" id="college" name="college" value={values.college} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="degree">Degree:</label>
                                <input type="text" className="form-control" id="degree" name="degree" value={values.degree} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="highSchool">High School:</label>
                                <input type="text" className="form-control" id="highschool" name="highschool" value={values.highschool} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">About You:</label>
                        <textarea className="form-control" id="description" name="description" style={{ height: '200px' }} placeholder='Describe Yourself' value={values.description} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group mt-3 mb-3">
                        <input type="file" className="form-control-file d-none" id="file" accept="image/*" onChange={(event) => {
                            console.log(event.target.files[0]);
                            setFile(event.target.files[0]);
                        }} ref={fileRef} required />
                        <label htmlFor="file" className="btn btn-primary">Choose Picture For Cv</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Continue</button>
                </form>
            </div>
        </>
    );
};

export default CvInfo;
