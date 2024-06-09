import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import CvService from '../Services/CvService';
import ReferenceService from '../Services/ReferenceService';
import WorkExperienceService from '../Services/WorkExperienceService';
import LanguageService from '../Services/LanguageService';
import CustomNavbar from '../CustomNavbar';
import EmployeeService from '../Services/EmployeeService';

const CV = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const idAsInteger = parseInt(id, 10);
    const [Cv, setCv] = useState(null);
    const [references, setReferences] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [profileImageURL, setProfileImageURL] = useState(null);
    const [workExperiences, setWorkExperiences] = useState([]);

    useEffect(() => {
        if (!EmployeeService.isEmployee()) {
          navigate('/');
        } else {
          const storedEmployeeId = sessionStorage.getItem('employeeId');
          if (id !== storedEmployeeId) {
            EmployeeService.logout();
            navigate('/');
          }
        }
      }, [navigate, id]);

    const fetchCV = async () => {
        try {
            const response = await CvService.getCvByEmployeeId(idAsInteger);
            console.log('Fetched Cv:', response); 
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
    }, [id]);

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
                    const response = await LanguageService.getReferenceByCvId(Cv.cvid);
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
                                        <p><strong>Name:</strong> {Cv.name} {Cv.surname}</p>
                                        <p><strong>Email:</strong> {Cv.email}</p>
                                        <p><strong>Phone:</strong> {Cv.phone_nr}</p>
                                        <p><strong>Address:</strong> {Cv.city}, {Cv.street}</p>
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
                                    <h2 className="mb-4">Experience</h2>
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
                                    <h2 className="mb-4">References</h2>
                                    {references.map((reference, index) => (
                                        <div key={index}>
                                            <p>{reference.name} {reference.surname} </p>
                                            <p>{reference.jobposition}, {reference.companyname}</p>
                                            <p>Phone: {reference.phone_nr}</p>
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
