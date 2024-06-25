import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CvService from '../Services/CvService';
import ReferenceService from '../Services/ReferenceService';
import WorkExperienceService from '../Services/WorkExperienceService';
import LanguageService from '../Services/LanguageService';
import CustomNavbar from '../CustomNavbar';
import EmployeeService from '../Services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const CV = () => {
    const navigator = useNavigate();
    const employee = sessionStorage.getItem('employeeId');
    const [Cv, setCv] = useState(null);
    const [references, setReferences] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [profileImageURL, setProfileImageURL] = useState(null);
    const [workExperiences, setWorkExperiences] = useState([]);

    const fetchCV = async () => {
        try {
            const response = await CvService.getCvByEmployeeId(employee);
            console.log('Fetched Cv:', response); // Debugging line
            setCv(response);
        } catch (error) {
            console.error('Error fetching Cv:', error);
        }
    };

    const fetchProfileImage = async () => {
        if (Cv) {
            try {
                const token = localStorage.getItem('token');
                console.log(Cv.cvid)
                const imageData = await CvService.downloadImage(Cv.cvid); // Assuming Cv contains necessary data including id
                const blob = new Blob([imageData], { type: 'image/jpeg' });
                const url = URL.createObjectURL(blob);
                setProfileImageURL(url);
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        }
    };

    useEffect(() => {
        fetchCV();
    }, [employee]);

    useEffect(()=>{

        if (!EmployeeService.isAuthenticated()) {
            navigator('/');
        }
    },[navigator])
    useEffect(() => {
        if (Cv) {
            fetchProfileImage();

            const fetchReferences = async () => {
                try {
                    const response = await ReferenceService.getReferenceByCvId(Cv.cvid);
                    console.log('Fetched references:', response); // Debugging line
                    setReferences(response);
                } catch (error) {
                    console.error('Error fetching references:', error);
                }
            };

            const fetchWorkExperience = async () => {
                try {
                    const response = await WorkExperienceService.getWorkExperienceByCvId(Cv.cvid);
                    console.log('Fetched experiences:', response); // Debugging line
                    setWorkExperiences(response);
                } catch (error) {
                    console.error('Error fetching experiences:', error);
                }
            };

            const fetchLanguages = async () => {
                try {
                    const response = await LanguageService.getLanguageByCvId(Cv.cvid);
                    console.log('Fetched Languages:', response); // Debugging line
                    setLanguages(response);
                } catch (error) {
                    console.error('Error fetching Languages:', error);
                }
            };

            fetchReferences();
            fetchWorkExperience();
            fetchLanguages();
        }
    }, [Cv]);

    console.log("CV:", Cv);
    console.log("References:", references);
    console.log("Languages:", languages);
    console.log("Experiences:", workExperiences);
    console.log("Image: ",profileImageURL)

    return (
        <>
            <CustomNavbar />
            <div className="container">
                {Cv && (
                    <div className="d-flex" style={{ minHeight: '100vh' }}>
                        <div className="row justify-content-center w-100">
                            <div className="col-lg-4 bg-dark text-light p-4">
                                <div className="section">
                                    <div className="text-center mb-4">
                                        <img
                                            alt="Profile Picture"
                                            src={profileImageURL}
                                            className="img-fluid"
                                            style={{ width: '250px', height: '230px', borderRadius: '50%' }}
                                        />
                                    </div>
                                    <div>
                                        <p><strong>Emri:</strong> {Cv.name} {Cv.surname}</p>
                                        <p><strong>Email:</strong> {Cv.email}</p>
                                        <p><strong>Nr. telefonit:</strong> {Cv.phone_nr}</p>
                                        <p><strong>Adresa:</strong> {Cv.city}, {Cv.street}</p>
                                    </div>
                                    <div className="mt-4">
                                        <h2 className="mb-4">Edukimi</h2>
                                        <p><strong>Fakulteti:</strong> {Cv.college}</p>
                                        <p><strong>Diploma:</strong> {Cv.degree}</p>
                                        <p><strong>Shkolla e mesme:</strong> {Cv.highschool}</p>
                                    </div>
                                    <div className="mt-4">
                                        <h2 className="mb-4">Gjuhet</h2>
                                        {languages.map((language, index) => (
                                            <p key={index}>
                                                <strong>Gjuha:</strong> {language.language} <span className="mx-4"><strong>Niveli:</strong> {language.level}</span>
                                                <br/>
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
                                    <h2 className="mb-4">Eksperienca</h2>
                                    {workExperiences.map((workExperience, index) => (
                                        <div key={index}>
                                            <p><strong>{workExperience.startingyear} - {workExperience.lastyear}</strong></p>
                                            <p><strong>{workExperience.companyname}, {workExperience.street}, {workExperience.city}</strong></p>
                                            <p><strong>{workExperience.jobposition}</strong></p>
                                            <p>{workExperience.description}</p>
                                            <hr/>
                                        </div>
                                    ))}
                                </div>
                                <div className="section">
                                    <h2 className="mb-4">Referencat</h2>
                                    {references.map((reference, index) => (
                                        <div key={index}>
                                            <p>{reference.name} {reference.surname} </p>
                                            <p>{reference.jobposition}, {reference.companyname}</p>
                                            <p>Numri telefonit: {reference.phone_nr}</p>
                                            <p>Email: {reference.email}</p>
                                            <hr/>
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
