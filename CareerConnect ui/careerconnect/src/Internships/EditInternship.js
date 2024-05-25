import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomNavbar from '../CustomNavbar';
import InterService from '../Services/InterService'
import Footer from '../Footer';
import { getLocations } from '../Services/LocationService';
import { getIndustries } from '../Services/IndustriaService';
import CompanyService from '../Services/CompanyService';


const EditInternship = () => {
    const [title, settitle] = useState('');
    const [company_name, setCompany_name] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [requirements, setRequirements] = useState('');
    const [deadline, setDeadline] = useState('');
    const [locationName, setLocation] = useState('');
    const [industriaName, setIndustria] = useState('');
    const [titleError, setTitleError] = useState('');
    const [companyNameError, setCompanyNameError] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const [deadlineError, setDeadlineError] = useState('');
    const [requirementsError, setRequirementsError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [typeError, setTypeError] = useState('');
    const [locations, setLocations] = useState([]);
    const [industries, setIndustries] = useState([]);

    const navigator = useNavigate();

    const { id } = useParams();
    const [internship, setInternship] = useState(null);

    useEffect(() => {
        if (!CompanyService.isCompany()) {
            navigator('/');
        }
    }, [navigator]);

    useEffect(() => {
        if (id) {
            const token = localStorage.getItem('token');
            InterService.getInternshipById(id, token)
                .then((response) => {
                    setInternship(response.data);
                    settitle(response.title);
                    setCompany_name(response.company_name);
                    setStart_date(response.start_date);
                    setEnd_date(response.end_date);
                    setRequirements(response.requirements);
                    setDescription(response.description);
                    setLocation(response.locationName);
                    setIndustria(response.industriaName);
                    setDeadline(response.deadline);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [id]);

    useEffect(() => {
        async function fetchData() {
            try {
                const locationsResponse = await getLocations();
                console.log("Locations Response:", locationsResponse);
                if (locationsResponse && locationsResponse.data && locationsResponse.data.length > 0) {
                    setLocations(locationsResponse.data);
                } else {
                    console.error('No locations found in the response');
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            }

            try {
                const response = await getIndustries();
                console.log('Response:', response);
                if (Array.isArray(response)) {
                    setIndustries(response);
                } else if (response.data && Array.isArray(response.data)) {
                    setIndustries(response.data);
                } else {
                    console.error('Invalid response format');
                }
            } catch (error) {
                console.error('Error fetching industries:', error);
            }
        }

        fetchData();
    }, []);

    

    const isEmptyOrWhitespace = (str) => {
        return !str || /^\s*$/.test(str);
    };

    function saveInternship(e) {
        e.preventDefault();
        setTitleError('');
        setCompanyNameError('');
        setStartDateError('');
        setEndDateError('');
        setDeadlineError('');
        setRequirementsError('');
        setLocationError('');
        setTypeError('');

        let isValid = true;
        if (isEmptyOrWhitespace(title)) {
            setTitleError('Titulli nuk mund të jetë bosh');
            isValid = false;
        }
        if (isEmptyOrWhitespace(start_date)) {
            setStartDateError('Data e fillimit nuk mund të jetë bosh');
            isValid = false;
        }
        if (isEmptyOrWhitespace(end_date)) {
            setEndDateError('Data e përfundimit nuk mund të jetë bosh');
            isValid = false;
        }
        if (isEmptyOrWhitespace(deadline)) {
            setDeadlineError('Afati i dorëzimit nuk mund të jetë bosh');
            isValid = false;
        }
        if (isEmptyOrWhitespace(requirements)) {
            setRequirementsError('Njohuritë e nevojshme nuk mund të jenë boshe');
            isValid = false;
        }
        if (isEmptyOrWhitespace(locationName)) {
            setLocationError('Lokacioni nuk mund të jetë bosh');
            isValid = false;
        }
        if (isEmptyOrWhitespace(industriaName)) {
            setTypeError('Tipi i punës nuk mund të jetë bosh');
            isValid = false;
        }

        if (isValid) {
            const updatedInternship = { title, company_name, description, start_date, end_date, requirements, locationName, industriaName, deadline };
            if (id) {
                const token = localStorage.getItem('token');
                InterService.updateInternship(id, updatedInternship, token)
                    .then((response) => {
                        console.log(response.data);
                        navigator(`/InternshipDetails/${id}`);
                    })
                    .catch(error => {
                        console.error("Error updating internship:", error);
                    });
            }
        }
    }


    return (
        <>
            <CustomNavbar />
            <main>
                <br />
                <div className="job-post-company pt-120 pb-120">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-xl-7 col-lg-8">
                                <div className="single-job-items mb-50">
                                    <div className="job-items">
                                        <div className="job-title">
                                            <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Titulli</h4>
                                            <p style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>
                                                <input type="text" value={title} onChange={(e) => settitle(e.target.value)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px', width:'400px' }} />
                                                {titleError && <div style={{ color: 'red' }}>{titleError}</div>}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="job-post-details">
                                    <div className="post-details1 mb-50">
                                        <div className="small-section-title">
                                            <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Pershkrimi</h4>
                                        </div>
                                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px', width: '100%', height: '200px', resize: 'none' }}></textarea>
                                    </div>
                                    <div className="post-details2 mb-50">
                                        <div className="small-section-title">
                                            <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Njohurite e nevojshme</h4>
                                        </div>
                                        <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px', width: '100%', height: '200px', resize: 'none' }}></textarea>
                                        {requirementsError && <div style={{ color: 'red' }}>{requirementsError}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4">
                                <div className="post-details3 mb-4">
                                    <div className="small-section-title">
                                        <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Informatat e pergjithshme</h4>
                                    </div>
                                    <ul style={{ listStyle: 'none' }}>
                                        <li>Lokacioni:
                                            <select
                                                value={locationName}
                                                onChange={(e) => setLocation(e.target.value)}
                                                className="form-control"
                                                style={{ width: '100%' }}
                                            >
                                                <option value="">Zgjidh Lokacionin</option>
                                                {locations.map(location => (
                                                    <option key={location.name} value={location.name}>{location.name}</option>
                                                ))}
                                            </select><br/>
                                            {locationError && <div style={{ color: 'red' }}>{locationError}</div>}
                                        </li>
                                        <li>Tipi i punes:
                                            <select
                                                value={industriaName}
                                                onChange={(e) => setIndustria(e.target.value)}
                                                className="form-control"
                                                style={{ width: '100%' }}
                                            >
                                                <option value="">Zgjidh Kategorinë</option>
                                                {industries.map(industry => (
                                                    <option key={industry.name} value={industry.name}>{industry.name}</option>
                                                ))}
                                            </select><br/>
                                            {typeError && <div style={{ color: 'red' }}>{typeError}</div>}
                                        </li>
                                        <li>Data e fillimit: <input type="text" value={start_date} onChange={(e) => setStart_date(e.target.value)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px' }} /></li>
                                        {startDateError && <div style={{ color: 'red' }}>{startDateError}</div>}
                                        <li>Data e pefundimit: <input type="text" value={end_date} onChange={(e) => setEnd_date(e.target.value)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px' }} /></li>
                                        {endDateError && <div style={{ color: 'red' }}>{endDateError}</div>}
                                        <li>Afati i dorezimit: <input type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px' }} /></li>
                                        {deadlineError && <div style={{ color: 'red' }}>{deadlineError}</div>}
                                    </ul>
                                </div>
                                <div className="post-details4 mb-4">
                                    <div className="small-section-title">
                                        <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Informacioni lidhur me kompaninë</h4>
                                    </div>
                                    <ul style={{ listStyle: 'none' }}>
                                        <li>Emri i kompanise: <input type="text" value={company_name} onChange={(e) => setCompany_name(e.target.value)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px' }} /></li>
                                        {companyNameError && <div style={{ color: 'red' }}>{companyNameError}</div>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="apply-btn2" style={{ textAlign: 'center' }}>
                            <button className="btn btn-primary" onClick={saveInternship} style={{ borderRadius: '5px', backgroundColor: '#4e8fff', color: 'white', padding: '10px 20px', cursor: 'pointer', transition: 'background-color 0.3s' }}>Ruaj ndryshimet</button>
                        </div><br/>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default EditInternship;
