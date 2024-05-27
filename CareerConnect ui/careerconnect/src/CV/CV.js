import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import CvService from '../Services/CvService';
import ReferenceService from '../Services/ReferenceService';
import WorkExperienceService from '../Services/WorkExperienceService';
import LanguageService from '../Services/LanguageService';
import CustomNavbar from '../CustomNavbar';

const CV = () => {
    const { id } = useParams();
    const idAsInteger = parseInt(id, 10);
    const [Cv, setCv] = useState(null);
    const [references, setReferences] = useState([]) || {};
    const [languages, setLanguages] = useState([]) || {};
    const [workExperiences, setWorkExperiences] = useState([]) || {};

    const fetchCV = async () => {
        try {
            const response = await CvService.getCvByEmployeeId(idAsInteger);
            console.log('Fetched Cv:', response); // Debugging line
            setCv(response);
        } catch (error) {
            console.error('Error fetching Cv:', error);
        }
      };

    useEffect(() => {
        fetchCV();
    }, [idAsInteger]);

    const fetchReferences = async () => {
        try {
            const response = await ReferenceService.getReferenceByCvId(idAsInteger);
            console.log('Fetched references:', response); // Debugging line
            setReferences(response);
        } catch (error) {
            console.error('Error fetching references:', error);
        }
      };

    useEffect(() => {
        fetchReferences();
    }, [idAsInteger]);
    const fetchWorkExperience = async () => {
        try {
            const response = await WorkExperienceService.getWorkExperienceByCvId(idAsInteger);
            console.log('Fetched experiences:', response); // Debugging line
            setWorkExperiences(response);
        } catch (error) {
            console.error('Error fetching experiences:', error);
        }
      };

    useEffect(() => {
        fetchWorkExperience();
    }, [idAsInteger]);

    const fetchLanguages = async () => {
        try {
            const response = await LanguageService.getReferenceByCvId(idAsInteger);
            console.log('Fetched Languages:', response); // Debugging line
            setLanguages(response);
        } catch (error) {
            console.error('Error fetching Languages:', error);
        }
      };

    useEffect(() => {
        fetchLanguages();
    }, [idAsInteger]);

    console.log("CV:",Cv);
    console.log("References:",references);
    console.log("Languages:",languages);
    console.log("Experiences:",workExperiences);
    return (
        <>
        <CustomNavbar/>
        <div className="container">
            {Cv && references && workExperiences && languages && (
                <div className="d-flex " style={{ minHeight: '100vh' }}>
                    <div className="row justify-content-center w-100">
                        <div className="col-lg-4 bg-dark text-light p-4 ">
                            <div className="section">
                                <div className="text-center mb-4">
                                    <img alt="Profile Picture" className="img-fluid rounded-circle" style={{ maxWidth: '150px' }} />
                                </div>
                                <div>
                                    <p><strong>Name:</strong> {Cv.name} {Cv.surname}</p>
                                    <p><strong>Email:</strong> {Cv.email}</p>
                                    <p><strong>Phone:</strong> {Cv.phone_nr}</p>
                                    <p><strong>Address:</strong> {Cv.city},{Cv.street}</p>
                                </div>
                                <div className="mt-4">
                                    <h2 className="mb-4">Education</h2>
                                    <p><strong>University:</strong> {Cv.college}</p>
                                    <p><strong>Degree:</strong> {Cv.degree}</p>
                                    <p><strong>High School:</strong> {Cv.highschool}</p>
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
                        <div className="col-lg-5 p-4 border border-3">
                            <div className="section">
                                <h1 className="mb-2"> {Cv.name} {Cv.surname}</h1>
                                <h3 className="mb-4"></h3>
                                <p>{Cv.description}</p>
                            </div>
                            <div className="section">
                                <h2 className="mb-4">Experience</h2>
                                {workExperiences.map((workExperience, index) => (
                                    <div key={index}>
                                        <p><strong>{workExperience.startingyear}-{workExperience.lastyear}</strong></p>
                                        <p><strong>{workExperience.companyname},{workExperience.street},{workExperience.city}</strong></p>
                                        <p><strong>{workExperience.jobposition}</strong></p>
                                        <p>{workExperience.description}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="section">
                                <h2 className="mb-4">References</h2>
                                {references.map((reference, index) => (
                                    <div key={index}>
                                        <p>{reference.name} {reference.surname} </p>
                                        <p>{reference.jobposition},{reference.companyname}</p>
                                        <p>Phone: {reference.phone_nr}</p>
                                        <p>Email: {reference.email}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}

export default CV;
