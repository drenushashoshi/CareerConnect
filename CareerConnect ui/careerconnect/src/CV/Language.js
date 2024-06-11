import React, { useState, useEffect } from 'react';
import LanguageService from '../Services/LanguageService';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import LanguageShort from './LanguageShort';
import CvService from '../Services/CvService';

const Language = () => {
    const [cv, setCv] = useState(null);
    const employee = sessionStorage.getItem('employeeId');
    const [languages, setLanguages] = useState([]);
    const [values, setValues] = useState({
        language: '',
        level: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchCv();
    }, [employee]);

    const fetchCv = async () => {
        try {
            const response = await CvService.getCvByEmployeeId(employee);
            setCv(response);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchLanguage = async (cvId) => {
        try {
            const response = await LanguageService.getLanguageByCvId(cvId);
            console.log('Fetched languages:', response); // Debugging line
            setLanguages(response || []); // Ensure languages is an array
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    };

    useEffect(() => {
        if (cv && cv.cvid) {
            fetchLanguage(cv.cvid);
        }
    }, [cv]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSelect = (e) => {
        setValues({ ...values, level: e });
        if (errors.level) {
            setErrors({ ...errors, level: '' });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!values.language) newErrors.language = 'Ju lutem plotesoni fushen!';
        if (!values.level) newErrors.level = 'Ju lutem zgjidhni nje opsion!';
        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            console.log("Form values:", values);

            await LanguageService.createLanguage(values, cv.cvid);

            setValues({
                language: '',
                level: '',
            });

            // Fetch the updated languages after adding a new one
            fetchLanguage(cv.cvid); // Ensure the updated list is fetched after submitting
        } catch (error) {
            console.error('Error creating language:', error);
        }
    };

    return (
        <div className="Language-form p-4">
            <hr />
            {languages && languages.length > 0 ? (
                languages.map((initialLanguage, index) => (
                    <div key={index}>
                        <LanguageShort initialLanguage={initialLanguage} />
                    </div>
                ))
            ) : (
                <p></p>
            )}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-8">
                        <div className="form-group">
                            <label>Gjuha:</label>
                            <input
                                type="text"
                                name="language"
                                value={values.language}
                                onChange={handleChange}
                                className={`form-control ${errors.language ? 'is-invalid' : ''}`}
                            />
                            {errors.language && <div className="invalid-feedback">{errors.language}</div>}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Niveli:</label>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={values.level || "Zgjidh Nivelin"}
                                onSelect={handleSelect}
                                className={`form-control ${errors.level ? 'is-invalid' : ''} border-0`}
                            >
                                <Dropdown.Item eventKey="Fillestar">Fillestar</Dropdown.Item>
                                <Dropdown.Item eventKey="Nen-Mesatar">Nen-Mesatar</Dropdown.Item>
                                <Dropdown.Item eventKey="Mesatar">Mesatar</Dropdown.Item>
                                <Dropdown.Item eventKey="Permbi-Mesatar">Permbi-Mesatar</Dropdown.Item>
                                <Dropdown.Item eventKey="Avancum">Avancum</Dropdown.Item>
                            </DropdownButton>
                            {errors.level && <div className="invalid-feedback d-block">{errors.level}</div>}
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3 col-12">Shto Gjuhe Tjeter</button>
            </form>
        </div>
    );
};

export default Language;
