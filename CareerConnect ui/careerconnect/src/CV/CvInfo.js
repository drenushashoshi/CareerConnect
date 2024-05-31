import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import CvService from '../Services/CvService';
import CustomNavbar from '../CustomNavbar'

const CvInfo = () => {
    const navigate = useNavigate();
    const employee = sessionStorage.getItem('employeeId');
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


    const handleImageChange = (e) => {
        setImage(e.target.files[0]); 
    };

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
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const CV = {name, surname, email, phone_nr, college, degree, city, highschool, description, street, employee};
            console.log(CV);
            const formData = new FormData();
            formData.append('CV', JSON.stringify(CV));
            if (image) {
                formData.append('image', image);
            }
            console.log(formData);
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
    
            const token = localStorage.getItem('token');
            console.log(token);
            const response = await CvService.createCv(formData, token);
    
            navigate(`/CvInfo/`+response.cvid)
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
                                <input type="text" className="form-control" id="name" name="name" value={name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname">Surname:</label>
                                <input type="text" className="form-control" id="surname" name="surname" value={surname} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" className="form-control" id="email" name="email" value={email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number:</label>
                                <input type="tel" className="form-control" id="phone_nr" name="phone_nr" value={phone_nr} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="street">Street:</label>
                                    <input type="text" className="form-control" id="street" name="street" value={street} onChange={handleChange} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="city">City:</label>
                                    <input type="text" className="form-control" id="city" name="city" value={city} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="college">College:</label>
                                <input type="text" className="form-control" id="college" name="college" value={college} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="degree">Degree:</label>
                                <input type="text" className="form-control" id="degree" name="degree" value={degree} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="highSchool">High School:</label>
                                <input type="text" className="form-control" id="highschool" name="highschool" value={highschool} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">About You:</label>
                        <textarea className="form-control" id="description" name="description" style={{ height: '200px' }} placeholder='Describe Yourself' value={description} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group mt-3 mb-3">
                        <input type="file" className="form-control-file d-none" id="fileInput" accept="image/*" style={{display:'none'}} onChange={handleImageChange} />
                        <label htmlFor="fileInput" className="btn btn-primary">Choose Picture For Cv</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Continue</button>
                </form>
            </div>
        </>
    );
};

export default CvInfo;
