import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CvService from '../Services/CvService';
import LanguageService from '../Services/LanguageService';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';

const Language = () => {

    const { id } = useParams();
    const idAsInteger = parseInt(id, 10);
    const [Cv, setCv] = useState();
    const [values, setValues] = useState({
        Language: "",
        Level: "",
        CV:null
    });

    useEffect(() => {
        const fetchCV = async () => {
            const { data } = await CvService.getCVById(id);
            setCv(data);
            console.log(data);
        };
        fetchCV();
    }, [idAsInteger]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSelect = (e) => {
        setValues({ ...values, Level: e });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(Cv);
            console.log(values);

            const { data: Language } = await LanguageService.createLanguage(values, Cv); // Send formData including cvid

            setValues({
                Language: '',
                Level: '',
                CV:null
            });
        } catch (error) {
            console.error('Error creating reference:', error);
        }
    };

    return (
        <div className="Language-form p-4">
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Language:</label>
                            <input type="text" name="Language" value={values.Language} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Level:</label>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={values.Level || "Select Level"}
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
