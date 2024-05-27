import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LanguageService from '../Services/LanguageService';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import LanguageShort from './LanguageShort';

const Language = () => {
    const { id } = useParams();
    const [languages, setLanguages] = useState([]);
    const idAsInteger = parseInt(id, 10);
    const [values, setValues] = useState({
        language: '',
        level: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSelect = (e) => {
        setValues({ ...values, level: e });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log("Form values:", values);

            await LanguageService.createLanguage(values, idAsInteger);

            setValues({
                language: '',
                level: '',
            });

            // Fetch the updated languages after adding a new one
            fetchLanguage(); // Ensure the updated list is fetched after submitting
        } catch (error) {
            console.error('Error creating language:', error);
        }
    };

    const fetchLanguage = async () => {
        try {
            const response = await LanguageService.getLanguageByCvId(idAsInteger);
            console.log('Fetched languages:', response); // Debugging line
            setLanguages(response || []); // Ensure languages is an array
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    };

    useEffect(() => {
        fetchLanguage();
    }, [idAsInteger]);

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
                <p>No Languages</p>
            )}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-8">
                        <div className="form-group">
                            <label>Language:</label>
                            <input
                                type="text"
                                name="language"
                                value={values.language}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Level:</label>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={values.level || "Select Level"}
                                onSelect={handleSelect}
                            >
                                <Dropdown.Item eventKey="Beginner">Beginner</Dropdown.Item>
                                <Dropdown.Item eventKey="Pre-intermediate">Pre-intermediate</Dropdown.Item>
                                <Dropdown.Item eventKey="Intermediate">Intermediate</Dropdown.Item>
                                <Dropdown.Item eventKey="Upper-Intermediate">Upper-Intermediate</Dropdown.Item>
                                <Dropdown.Item eventKey="Advanced">Advanced</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3 col-12">Add Another Language</button>
            </form>
        </div>
    );
};

export default Language;
