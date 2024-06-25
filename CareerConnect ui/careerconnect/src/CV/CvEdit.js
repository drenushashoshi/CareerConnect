import React, { useEffect, useState } from 'react';
import CustomNavbar from '../CustomNavbar';
import { useNavigate } from 'react-router-dom';
import CvService from '../Services/CvService';
import Footer from '../Footer';
import EmployeeService from '../Services/EmployeeService';

const CvEdit = () => {
    const navigate = useNavigate();
    const [Cv, setCv] = useState(null);
    const employee = sessionStorage.getItem('employeeId');
    const [errors, setErrors] = useState({});
    const [fileError, setFileError] = useState('');
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
    const [uniqueError, setUniqueError] = useState('');

    useEffect(() => {
        if (!EmployeeService.isAuthenticated()) {
            navigate('/');
        }
    }, [navigate]);

    const fetchCV = async () => {
        try {
            const response = await CvService.getCvByEmployeeId(employee);
            console.log('Fetched Cv:', response);
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
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'surname':
                setSurname(value);
                break;
            case 'email':
                setEmail(value);
                setUniqueError('');
                break;
            case 'phone_nr':
                if (/^\d*$/.test(value)) {
                    setPhone_nr(value);
                }
                setUniqueError('');
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
        if (!name) newErrors.name = 'Ju lutem plotesoni fushen e duhur';
        if (!surname) newErrors.surname = 'Ju lutem plotesoni fushen e duhur';
        if (!email) newErrors.email = 'Ju lutem plotesoni fushen e duhur';
        if (!phone_nr) newErrors.phone_nr = 'Ju lutem plotesoni fushen e duhur';
        if (phone_nr && phone_nr.length !== 9) newErrors.phone_nr = 'Numri i telefonit duhet te kete 9 karaktere';
        if (!description) newErrors.description = 'Ju lutem plotesoni fushen e duhur';
        if (!college) newErrors.college = 'Ju lutem plotesoni fushen e duhur';
        if (!degree) newErrors.degree = 'Ju lutem plotesoni fushen e duhur';
        if (!highschool) newErrors.highschool = 'Ju lutem plotesoni fushen e duhur';
        if (!phone_nr) newErrors.phone_nr = 'Ju lutem plotesoni fushen e duhur';
        if (!street) newErrors.street = 'Ju lutem plotesoni fushen e duhur';
        if (!city) newErrors.city = 'Ju lutem plotesoni fushen e duhur';
        if (!image) newErrors.fileInput = 'Ju lutem zgjidhni nje fotografi!';
        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0 || fileError || uniqueError) {
            setErrors(validationErrors);
            return;
        }
        try {
            const formData = new FormData();
            formData.append('CV', JSON.stringify({ name, surname, email, phone_nr, college, degree, city, highschool, description, street, employee }));
            if (image) {
                formData.append('image', image);
            }

            const token = localStorage.getItem('token');
            console.log("Sending request to update CV with ID:", Cv.cvid);
            console.log("Form Data:", formData);

            const response = await CvService.updateCv(Cv.cvid, formData, token);

            if (response.status === 200) {
                navigate(`/CvInfo`);
            } else if (response.status === 409) {
                setUniqueError('Email/Numri i telefonit eshte ne perdorim');
            } else if (response.status === 404) {
                setUniqueError('CV not found');
            } else {
                setUniqueError('An unexpected error occurred');
                console.error('Unexpected Error:', response);
            }
        } catch (error) {
            console.log(error.message);
            setUniqueError('An error occurred while updating the CV');
        }
    };

    return (
        <div>
            <CustomNavbar />
            <div className="container mt-2x">
                <h1 className="mb-4">Informacioni Personal</h1>
                {Cv && (
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Emri:</label>
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
                                    <label htmlFor="surname">Mbiemri:</label>
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
                                    <label htmlFor="phone_nr">Nr. telefonit:</label>
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
                                        <label htmlFor="street">Lagja:</label>
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
                                        <label htmlFor="city">Qyteti:</label>
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
                                    <label htmlFor="college">Fakulteti:</label>
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
                                    <label htmlFor="degree">Diploma:</label>
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
                                    <label htmlFor="highschool">Shkolla e mesme:</label>
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
                            <label htmlFor="description">Per ju:</label>
                            <textarea
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                id="description"
                                name="description"
                                style={{ height: '200px' }}
                                placeholder=''
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
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="fileInput" className="btn btn-primary">Zgjidh fotografi per CV</label>
                            {fileError && <div className="invalid-feedback d-block">Ju lutem zgjidh fotografi!</div>}
                            {uniqueError && <span className="text-danger mx-5">{uniqueError}</span>}
                        </div>
                        <button type="submit" className="btn btn-primary">Vazhdo</button><br /><br />
                    </form>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CvEdit;
