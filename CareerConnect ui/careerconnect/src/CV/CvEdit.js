import React, { useEffect, useRef, useState } from 'react';
import CustomNavbar from '../CustomNavbar';
import { useNavigate } from 'react-router-dom';
import CvService from '../Services/CvService';

const CvEdit = () => {
    const navigate = useNavigate();
    const [Cv, setCv] = useState(null);
    const employee = sessionStorage.getItem('employeeId');
    const [errors, setErrors] = useState({});
    const [fileError, setFileError] = useState('');
    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [email,setEmail] = useState('');
    const [phone_nr,setPhone_nr] = useState('');
    const [college,setCollege] = useState('');
    const [degree,setDegree] = useState('');
    const [city,setCity] = useState('');
    const [highschool,setHighschool] = useState('');
    const [description,setDescription] = useState('');
    const [street,setStreet] = useState('');
    const [image, setImage] = useState(null); 

    const fetchCV = async () => {
        try {
            const response = await CvService.getCvByEmployeeId(employee);
            console.log('Fetched Cv:', response); // Debugging line
            setCv(response);
            setName(response.name || '');
            setSurname(response.surname || '');
            setImage(response.image || '');
            setEmail(response.email || '');
            setDescription(response.description || '');
            setCollege(response.college || '');
            setDegree(response.degree || '');
            setHighschool(response.highschool || '');
            setPhone_nr(response.phone_nr || '');
            setStreet(response.street || '');
            setCity(response.city || '');
        } catch (error) {
            console.error('Error fetching Cv:', error);
        }
    };

    useEffect(() => {
        fetchCV();
    }, [employee]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch(name) {
            case 'name':
                setName(value);
                break;
            case 'surname':
                setSurname(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone_nr':
                setPhone_nr(value);
                break;
            case 'college':
                setCollege(value);
                break;
            case 'degree':
                setDegree(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'highschool':
                setHighschool(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'street':
                setStreet(value);
                break;
            default:
                break;
        }
        setErrors({ ...errors, [event.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Please fill out the name';
        if (!surname) newErrors.surname = 'Please fill out the surname';
        if (!email) newErrors.email = 'Please fill out the email';
        if (!phone_nr) newErrors.phone_nr = 'Please fill out the phone number';
        if (!description) newErrors.description = 'Please fill out the description';
        if (!college) newErrors.college = 'Please fill out the college';
        if (!degree) newErrors.degree = 'Please fill out the degree';
        if (!highschool) newErrors.highschool = 'Please fill out the highschool';
        if (!phone_nr) newErrors.phone_nr = 'Please fill out the phone_nr';
        if (!street) newErrors.street = 'Please fill out the street';
        if (!city) newErrors.city = 'Please fill out the city';
        if (!image) newErrors.fileInput = 'Please insert an image';
        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0 || fileError) {
            setErrors(validationErrors);
            return;
        }
        try {
            const formData = new FormData();
            formData.append('CV', JSON.stringify({name, surname, email, phone_nr, college, degree, city, highschool, description, street, employee}));
            if (image) {
                formData.append('image', image);
            }

            const token = localStorage.getItem('token');
            CvService.updateCv(Cv.cvid, formData, token)
                .then((response) => {
                console.log(response);
        })
        navigate(`/CvInfo/`+Cv.cvid);
        } catch (error) {
            console.error('Error updating CV:', error);
        }
    };

    return (
        <div>
            <CustomNavbar />
            <div className="container mt-2x">
                <h1 className="mb-4">Personal Information</h1>
                {Cv && (
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="surname">Surname:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
                                        id="surname"
                                        name="surname"
                                        value={surname}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.surname && <div className="invalid-feedback">{errors.surname}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone_nr">Phone Number:</label>
                                    <input
                                        type="tel"
                                        className={`form-control ${errors.phone_nr ? 'is-invalid' : ''}`}
                                        id="phone_nr"
                                        name="phone_nr"
                                        value={phone_nr}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.phone_nr && <div className="invalid-feedback">{errors.phone_nr}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="street">Street:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.street ? 'is-invalid' : ''}`}
                                            id="street"
                                            name="street"
                                            value={street}
                                            onChange={handleChange}
                                        />
                                        {errors.street && <div className="invalid-feedback">{errors.street}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="city">City:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                            id="city"
                                            name="city"
                                            value={city}
                                            onChange={handleChange}
                                        />
                                        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="college">College:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.college ? 'is-invalid' : ''}`}
                                        id="college"
                                        name="college"
                                        value={college}
                                        onChange={handleChange}
                                    />
                                    {errors.college && <div className="invalid-feedback">{errors.college}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="degree">Degree:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.degree ? 'is-invalid' : ''}`}
                                        id="degree"
                                        name="degree"
                                        value={degree}
                                        onChange={handleChange}
                                    />
                                    {errors.degree && <div className="invalid-feedback">{errors.degree}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="highschool">High School:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.highschool ? 'is-invalid' : ''}`}
                                        id="highschool"
                                        name="highschool"
                                        value={highschool}
                                        onChange={handleChange}
                                    />
                                    {errors.highschool && <div className="invalid-feedback">{errors.highschool}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">About You:</label>
                            <textarea
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                id="description"
                                name="description"
                                style={{ height: '200px' }}
                                placeholder='Describe Yourself'
                                value={description}
                                onChange={handleChange}
                            ></textarea>
                            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                        </div>
                        <div className="form-group mt-3 mb-3">
                            <input
                                type="file"
                                className="form-control-file d-none"
                                id="fileInput"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                style={{display:'none'}}
                            />
                            <label htmlFor="fileInput" className="btn btn-primary">Choose Picture For Cv</label>
                            {fileError && <div className="invalid-feedback d-block">Please insert an image</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Continue</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CvEdit;
