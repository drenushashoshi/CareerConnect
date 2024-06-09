import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApplicationService from '../Services/ApplicationService';
import CustomNavbar from '../CustomNavbar';
import Footer from '../Footer';

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
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        // Validate name
        if (!values.name.trim()) {
            errors.name = 'Ju lutem plotesoni fushen e duhur!';
            isValid = false;
        }

        // Validate email
        if (!values.email.trim()) {
            errors.email = 'Ju lutem plotesoni fushen e duhur!';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email eshte invalid';
            isValid = false;
        }

        // Validate phone number
        if (!values.phone_nr.trim()) {
            errors.phone_nr = 'Ju lutem plotesoni fushen e duhur!';
            isValid = false;
        }

        // Validate age
        if (!values.age.trim()) {
            errors.age = 'Ju lutem plotesoni fushen e duhur!';
            isValid = false;
        }

        // Validate city
        if (!values.city.trim()) {
            errors.city = 'Ju lutem plotesoni fushen e duhur!';
            isValid = false;
        }

        // Validate description
        if (!values.description.trim()) {
            errors.description = 'Ju lutem plotesoni fushen e duhur!';
            isValid = false;
        }

        // Validate gender
        if (!values.gender.trim()) {
            errors.gender = 'Ju lutem plotesoni fushen e duhur!';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };


    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleNewApplication = async (event) => {
        event.preventDefault();
        if (validateForm()) {
        try {
            console.log(values);
            const { data } = await ApplicationService.createApplication(values);
            navigate(`/EmployeePage/`+employeeId);  // Add appropriate navigation route
        } catch (error) {
            console.error(error);
        }
    }
    };

    return (
        <>
        <CustomNavbar></CustomNavbar>
        <div className="container my-3">
        <div className="row mx-0 justify-content-center">
            <div className="col-md-7 col-lg-5 px-lg-2 col-xl-4 px-xl-0 px-xxl-3">
                <form
                    onSubmit={handleNewApplication}
                    method="POST"
                    className="w-100 rounded-1 p-4 border bg-white"
                    encType="multipart/form-data"
                >
                    <label className="d-block mb-4">
                        <span className="form-label d-block">Emri:</span>
                        <input
                            required
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={values.name}
                            onChange={handleChange}
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </label>

                    <label className="d-block mb-4">
                        <span className="form-label d-block">Email:</span>
                        <input
                            required
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder=""
                            value={values.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </label>

                    <label className="d-block mb-4">
                        <span className="form-label d-block">Qyteti:</span>
                        <input
                            required
                            name="city"
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={values.city}
                            onChange={handleChange}
                        />
                        {errors.city && <div className="text-danger">{errors.city}</div>}
                    </label>

                    <label className="d-block mb-4">
                        <span className="form-label d-block">Numri i telefonit:</span>
                        <input
                            required
                            name="phone_nr"
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={values.phone_nr}
                            onChange={handleChange}
                        />
                        {errors.phone_nr && <div className="text-danger">{errors.phone_nr}</div>}
                    </label>

                    <label className="d-block mb-4">
                        <span className="form-label d-block">Mosha</span>
                        <input
                            required
                            name="age"
                            type="number"
                            className="form-control"
                            value={values.age}
                            onChange={handleChange}
                        />
                        {errors.age && <div className="text-danger">{errors.age}</div>}
                    </label>

                    <label className="d-block mb-4">
                        <span className="form-label d-block">Tregoni me shum per vedi:</span>
                        <textarea
                            name="description"
                            className="form-control"
                            rows="3"
                            placeholder="Cka ju motivon?"
                            value={values.description}
                            onChange={handleChange}
                        ></textarea>
                        {errors.description && <div className="text-danger">{errors.description}</div>}
                    </label>

                    <div className="mb-4">
                        <span className="form-label d-block">Gjinia</span>
                        <div className="form-check">
                            <label className="d-block">
                                <input
                                    id="male"
                                    type="radio"
                                    className="form-check-input"
                                    name="gender"
                                    value="male"
                                    checked={values.gender === 'Mashkull'}
                                    onChange={handleChange}
                                />
                                <span className="form-check-label">Mashkull</span>
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
                                    checked={values.gender === 'Femer'}
                                    onChange={handleChange}
                                />
                                <span className="form-check-label">Femer</span>
                            </label>
                        </div>
                        {errors.gender && <div className="text-danger">{errors.gender}</div>}
                    </div>

                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary px-3 rounded-3">
                            Apliko
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <Footer></Footer>
    </>
    );
};

export default JobApplication;
