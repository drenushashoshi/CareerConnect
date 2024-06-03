import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import CvService from '../Services/CvService';
import CustomNavbar from '../CustomNavbar'

const CvInfo = () => {
    const navigate = useNavigate();
    const employee = sessionStorage.getItem('employeeId');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone_nr, setPhone_nr] = useState('');
    const [college, setCollege] = useState('');
    const [degree, setDegree] = useState('');
    const [city, setCity] = useState('');
    const [highschool, setHighschool] = useState('');
    const [description, setDescription] = useState('');
    const [street, setStreet] = useState('');
    const [image, setImage] = useState(null); 
    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [collegeError, setCollegeError] = useState('');
    const [degreeError, setDegreeError] = useState('');
    const [cityError, setCityError] = useState('');
    const [highschoolError, setHighschoolError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [streetError, setStreetError] = useState('');
    const [imageError, setImageError] = useState('');

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (!selectedImage) {
            setImage(null);
            setImageError('Image is required');
        } else {
            setImage(selectedImage);
            setImageError('');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'name':
                setName(value);
                setNameError(value ? '' : 'Name is required');
                break;
            case 'surname':
                setSurname(value);
                setSurnameError(value ? '' : 'Surname is required');
                break;
            case 'email':
                setEmail(value);
                setEmailError(value ? '' : 'Email is required');
                break;
            case 'phone_nr':
                setPhone_nr(value);
                setPhoneError(value ? '' : 'Phone Number is required');
                break;
            case 'college':
                setCollege(value);
                setCollegeError(value ? '' : 'College is required');
                break;
            case 'degree':
                setDegree(value);
                setDegreeError(value ? '' : 'Degree is required');
                break;
            case 'city':
                setCity(value);
                setCityError(value ? '' : 'City is required');
                break;
            case 'highschool':
                setHighschool(value);
                setHighschoolError(value ? '' : 'Highschool is required');
                break;
            case 'description':
                setDescription(value);
                setDescriptionError(value ? '' : 'Description is required');
                break;
            case 'street':
                setStreet(value);
                setStreetError(value ? '' : 'Street is required');
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (nameError || surnameError || emailError || phoneError || collegeError || degreeError || cityError || highschoolError || descriptionError || streetError || imageError) {
            console.log('Please fill out all required fields correctly.');
            return;
        }
        try {
            const CV = { name, surname, email, phone_nr, college, degree, city, highschool, description, street, employee };
            const formData = new FormData();
            formData.append('CV', JSON.stringify(CV));
            if (image) {
                formData.append('image', image);
            }
            const token = localStorage.getItem('token');
            const response = await CvService.createCv(formData, token);
            navigate(`/CvInfo/` + response.cvid);
        } catch (error) {
            setImageError('Please try a different email/phone nr.');
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
                                <input type="text" className="form-control" id="name" name="name" value={name} onChange={handleChange} required />
                                {nameError && <span className="text-danger">{nameError}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname">Surname:</label>
                                <input type="text" className="form-control" id="surname" name="surname" value={surname} onChange={handleChange} required />
                                {surnameError && <span className="text-danger">{surnameError}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" className="form-control" id="email" name="email" value={email} onChange={handleChange} required />
                                {emailError && <span className="text-danger">{emailError}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number:</label>
                                <input type="tel" className="form-control" id="phone_nr" name="phone_nr" value={phone_nr} onChange={handleChange} required />
                                {phoneError && <span className="text-danger">{phoneError}</span>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="street">Street:</label>
                                    <input type="text" className="form-control" id="street" name="street" value={street} onChange={handleChange} />
                                    {streetError && <span className="text-danger">{streetError}</span>}
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="city">City:</label>
                                    <input type="text" className="form-control" id="city" name="city" value={city} onChange={handleChange} />
                                    {cityError && <span className="text-danger">{cityError}</span>}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="college">College:</label>
                                <input type="text" className="form-control" id="college" name="college" value={college} onChange={handleChange} />
                                {collegeError && <span className="text-danger">{collegeError}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="degree">Degree:</label>
                                <input type="text" className="form-control" id="degree" name="degree" value={degree} onChange={handleChange} />
                                {degreeError && <span className="text-danger">{degreeError}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="highSchool">High School:</label>
                                <input type="text" className="form-control" id="highschool" name="highschool" value={highschool} onChange={handleChange} />
                                {highschoolError && <span className="text-danger">{highschoolError}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">About You:</label>
                        <textarea className="form-control" id="description" name="description" style={{ height: '200px' }} placeholder='Describe Yourself' value={description} onChange={handleChange}></textarea>
                        {descriptionError && <span className="text-danger">{descriptionError}</span>}
                    </div>
                    <div className="form-group mt-3 mb-3">
                        <input type="file" className="form-control-file d-none" id="fileInput" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                        <label htmlFor="fileInput" className="btn btn-primary">Choose Picture For Cv</label>
                        {imageError && <span className="text-danger mx-5">{imageError}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary">Continue</button>
                </form>
            </div>
        </>
   
    );
};

export default CvInfo;