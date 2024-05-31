import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApplicationService from '../Services/ApplicationService';

const JobApplication = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const employeeId = sessionStorage.getItem('employeeId');
    console.log(token)
    console.log(employeeId)
    console.log(id)
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone_nr: '',
        age:null,
        city: '',
        description: '',
        gender: '',
        jobid: 0,
        internshipid: id,
        employeeid: employeeId
    });

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleNewApplication = async (event) => {
        event.preventDefault();
        try {
            console.log(values);
            const { data } = await ApplicationService.createApplication(values);
            navigate(`/EmployeePage/`+employeeId);  // Add appropriate navigation route
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="row mx-0 justify-content-center">
                <div className="col-md-7 col-lg-5 px-lg-2 col-xl-4 px-xl-0 px-xxl-3">
                    <form
                        onSubmit={handleNewApplication}
                        method="POST"
                        className="w-100 rounded-1 p-4 border bg-white"
                        encType="multipart/form-data"
                    >
                        <label className="d-block mb-4">
                            <span className="form-label d-block">Your name</span>
                            <input
                                required
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder="Filan Fisteku"
                                value={values.name}
                                onChange={handleChange}
                            />
                        </label>

                        <label className="d-block mb-4">
                            <span className="form-label d-block">Email address</span>
                            <input
                                required
                                name="email"
                                type="email"
                                className="form-control"
                                placeholder="Filan.Fisteku@example.com"
                                value={values.email}
                                onChange={handleChange}
                            />
                        </label>

                        <label className="d-block mb-4">
                            <span className="form-label d-block">City</span>
                            <input
                                required
                                name="city"
                                type="text"
                                className="form-control"
                                placeholder="Prishtine"
                                value={values.city}
                                onChange={handleChange}
                            />
                        </label>

                        <label className="d-block mb-4">
                            <span className="form-label d-block">Phone Number</span>
                            <input
                                required
                                name="phone_nr"
                                type="text"
                                className="form-control"
                                placeholder="xxx-xxx-xxx"
                                value={values.phone_nr}
                                onChange={handleChange}
                            />
                        </label>

                        <label className="d-block mb-4">
                            <span className="form-label d-block">Age</span>
                            <input
                                required
                                name="age"
                                type="number"
                                className="form-control"
                                value={values.age}
                                onChange={handleChange}
                            />
                        </label>

                        <label className="d-block mb-4">
                            <span className="form-label d-block">Tell us more about yourself</span>
                            <textarea
                                name="description"
                                className="form-control"
                                rows="3"
                                placeholder="What motivates you?"
                                value={values.description}
                                onChange={handleChange}
                            ></textarea>
                        </label>

                        <div className="mb-4">
                            <span className="form-label d-block">Gender</span>
                            <div className="form-check">
                                <label className="d-block">
                                    <input
                                        id="male"
                                        type="radio"
                                        className="form-check-input"
                                        name="gender"
                                        value="male"
                                        checked={values.gender === 'male'}
                                        onChange={handleChange}
                                    />
                                    <span className="form-check-label">Male</span>
                                </label>
                            </div>
                            <div className="form-check">
                                <label className="d-block">
                                    <input
                                        id="female"
                                        type="radio"
                                        className="form-check-input"
                                        name="gender"
                                        value="female"
                                        checked={values.gender === 'female'}
                                        onChange={handleChange}
                                    />
                                    <span className="form-check-label">Female</span>
                                </label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary px-3 rounded-3">
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobApplication;
