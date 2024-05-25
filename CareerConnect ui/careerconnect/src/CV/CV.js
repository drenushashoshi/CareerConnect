import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import CvService, { getCVById } from '../Services/CvService';
import { getReferenceByCvId } from '../Services/ReferenceService';
import { getWorkExperienceByCvId } from '../Services/WorkExperienceService';
import LanguageService from '../Services/LanguageService';

const CV = () => {
    const { id } = useParams();
    const idAsInteger = parseInt(id, 10);
    const [Cv, setCv] = useState(null);
    const [references, setReferences] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [workExperiences, setWorkExperiences] = useState([]);

    useEffect(() => {
        const fetchCV = async () => {
            try {
                const { data } = await CvService.getCVById(idAsInteger);
                setCv(data);
            } catch (error) {
                console.error("Error fetching CV:", error);
            }
        };
        fetchCV();
    }, [idAsInteger]);

    useEffect(() => {
        const fetchReferences = async () => {
            try {
                const { data } = await getReferenceByCvId(idAsInteger);
                setReferences(data);
            } catch (error) {
                console.error("Error fetching references:", error);
            }
        };
        fetchReferences();
    }, [idAsInteger]);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const { data } = await LanguageService.getLanguageByCvId(idAsInteger);
                setLanguages(data);
            } catch (error) {
                console.error("Error fetching languages:", error);
            }
        };
        fetchLanguages();
    }, [idAsInteger]);

    useEffect(() => {
        const fetchWorkExperiences = async () => {
            try {
                const { data } = await getWorkExperienceByCvId(idAsInteger);
                setWorkExperiences(data);
            } catch (error) {
                console.error("Error fetching work experiences:", error);
            }
        };
        fetchWorkExperiences();
    }, [idAsInteger]);
    return (
        <div className="container">
            <div className="row justify-content-center">
                {/* Left Part */}
                <div className="col-lg-4 bg-dark text-light">
                    <div className="section">
                        <div className="text-center mb-4">
                            <img src={Cv.profilepic} alt="Profile Picture" className="img-fluid rounded-circle" style={{ maxWidth: '150px' }} />
                        </div>
                        <div>
                            <p><strong>Name:</strong>{Cv.name} {Cv.surname}</p>
                            <p><strong>Email:</strong>{Cv.email}</p>
                            <p><strong>Phone:</strong>{Cv.phone_nr}</p>
                            <p><strong>Address:</strong>{Cv.Address}</p>
                        </div>
                        <div className="mt-4">
                            <h2 className="mb-4">Education</h2>
                            <p><strong>University:</strong>{Cv.college}</p>
                            <p><strong>Degree:</strong>{Cv.degree}</p>
                            <p><strong>High School:</strong>{Cv.highschool}</p>
                        </div>
                        <div className="mt-4">
                            <h2 className="mb-4">Languages</h2>
                            {languages.map((language, index) => (
                                <p key={index}>
                                    <strong>Language:</strong> {language.Language} <span className="ml-4"><strong>Level:</strong> {language.Level}</span>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Part */}
                <div className="col-lg-8">
                    <div className="section">
                        <h1 className="mb-2">{Cv.name} {Cv.surname}</h1>
                        <h3 className="mb-4"></h3>
                        <p>{Cv.description}</p>
                    </div>
                    <div className="section">
                        <h2 className="mb-4">Experience</h2>
                        {workExperiences.map((workExperiences, index) => (
                            <p key={index}>
                                <p><strong>{workExperiences.startyear}-{workExperiences.lastyear}</strong></p>
                                <p><strong>{workExperiences.companyname},{workExperiences.street},{workExperiences.city}</strong></p>
                                <p><strong>{workExperiences.jobposition}</strong></p>
                                <p>{workExperiences.description}</p>
                            </p>
                        ))}
                    </div>
                    <div className="section">
                        <h2 className="mb-4">Reference</h2>
                        {references.map((references, index) => (
                            <p key={index}>
                                <p>{references.name} {references.surname} </p>
                                <p>{references.jobposition},{references.companyname}</p>
                                <p>Phone: {references.phone_nr}</p>
                                <p>Email: {references.email}</p>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CV;
