import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CvInfo = () => {
    const [formData, setFormData] = useState({
        profilepic: '',
        name: '',
        surname: '',
        email: '',
        phone_nr: '',
        street: '',
        city: '',
        description: '',
        college: '',
        degree: '',
        highSchool: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, picture: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here
        console.log(formData);
    };

    return (
        <div className="container">
            <h1 className="mb-4">Personal Information</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Surname:</label>
                            <input type="text" className="form-control" id="surname" name="surname" value={formData.surname} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number:</label>
                            <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="street">Street:</label>
                                <input type="text" className="form-control" id="street" name="street" value={formData.street} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="city">City:</label>
                                <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="college">College:</label>
                            <input type="text" className="form-control" id="college" name="college" value={formData.college} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="degree">Degree:</label>
                            <input type="text" className="form-control" id="degree" name="degree" value={formData.degree} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="highSchool">High School:</label>
                            <input type="text" className="form-control" id="highSchool" name="highSchool" value={formData.highSchool} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">About You:</label>
                    <textarea className="form-control" id="description" name="description" style={{ height: '200px' }} placeholder='Describe Yourself' value={formData.description} onChange={handleChange}></textarea>
                </div>
                <div className="form-group mt-3 mb-3">
                    <label htmlFor="picture"></label>
                    <input type="file" className="form-control-file d-none" id="picture" accept="image/*" onChange={handlePictureChange} required />
                    <label htmlFor="picture" className="btn btn-primary">Choose Picture For Cv</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default CvInfo;
