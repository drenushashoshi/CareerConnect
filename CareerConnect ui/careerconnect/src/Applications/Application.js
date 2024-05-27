import React, { useRef, useState } from 'react'
import ApplicationService from '../Services/ApplicationService';
import { useNavigate } from 'react-router-dom';

const Application = () => {
    const navigator = useNavigate();
    const [values, setValues] = useState({
        city: '',
        description: '',
        email: '',
        gender: '',
        name: '',
        phone_nr: '',
        age: '',
    });
    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const handleNewApplication = async (event) => {
        event.preventDefault();
        try {
            console.log(values);
            const { data } = await ApplicationService.createApplication(values);
            navigator(``);
        } catch (error) {
            console.log(error);
        }

    }
    const uploadResume = async (formData) => {
        try {
            const { data: Resume } = await uploadResume(formData);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="container">
                <div className='modal__header'>
                </div>
                <div className="row mx-0 justify-content-center">
                    <div className="col-md-7 col-lg-5 px-lg-2 col-xl-4 px-xl-0 px-xxl-3">
                        <form onSubmit={handleNewApplication}
                            method="POST"
                            className="w-100 rounded-1 p-4 border bg-white"
                            action="https://herotofu.com/start"
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
                                    onChange={onChange}
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
                                    onChange={onChange}
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
                                    onChange={onChange}
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
                                    onChange={onChange}
                                />
                            </label>

                            <label className="d-block mb-4">
                                <span className="form-label d-block">Age</span>
                                <input
                                    required
                                    name="age"
                                    type="number"
                                    className="form-control"
                                    placeholder=""
                                    value={values.age}
                                    onChange={onChange}
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
                                    onChange={onChange}
                                ></textarea>
                            </label>
                            <div className="mb-4">
                                <span className="form-label d-block">Gender</span>
                                <div>
                                    <div className="form-check">
                                        <label className="d-block">
                                            <input
                                                id='male'
                                                type="radio"
                                                className="form-check-input"
                                                name="gender"
                                                value="male"
                                                checked={values.gender === 'male'}
                                                onChange={onChange}
                                            />
                                            <span className="form-check-label"
                                            >Male</span
                                            >
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="form-check">
                                        <input
                                            id='female'
                                            type="radio"
                                            className="form-check-input"
                                            name="gender"
                                            value="female"
                                            checked={values.gender === 'female'}
                                            onChange={onChange}
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
        </>
    )
}

export default Application