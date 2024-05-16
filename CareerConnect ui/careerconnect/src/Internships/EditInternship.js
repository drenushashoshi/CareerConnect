import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomNavbar from '../CustomNavbar';
import InterService from '../Services/InterService'
import Footer from '../Footer';

const EditInternship = () => {
    const [tittle, setTittle] = useState('');
    const [company_name, setCompany_name] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [requirements, setRequirements] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    const [deadline, setDeadline] = useState('');
    const [titleError, setTitleError] = useState('');
    const [companyNameError, setCompanyNameError] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const [deadlineError, setDeadlineError] = useState('');
    const [requirementsError, setRequirementsError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [typeError, setTypeError] = useState('');

    const { id } = useParams();
    const [internship, setInternship] = useState(null);

    useEffect(() => {
        if (id) {
            const token=localStorage.getItem('token');
            InterService.getInternshipById(id, token)
                .then((response) => {
                    setInternship(response.data);
                    setTittle(response.tittle);
                    setCompany_name(response.company_name);
                    setStart_date(response.start_date);
                    setEnd_date(response.end_date);
                    setRequirements(response.requirements);
                    setDescription(response.description);
                    setLocation(response.location);
                    setType(response.type);
                    setDeadline(response.deadline);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [id]);

    const navigator = useNavigate();

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
        if (!tittle.trim()) {
            setTitleError('Titulli nuk mund të jetë bosh');
            isValid = false;
        }
        if (!company_name.trim()) {
            setCompanyNameError('Emri i kompanisë nuk mund të jetë bosh');
            isValid = false;
        }
        if (!start_date.trim()) {
            setStartDateError('Data e fillimit nuk mund të jetë bosh');
            isValid = false;
        }
        if (!end_date.trim()) {
            setEndDateError('Data e përfundimit nuk mund të jetë bosh');
            isValid = false;
        }
        if (!deadline.trim()) {
            setDeadlineError('Afati i dorëzimit nuk mund të jetë bosh');
            isValid = false;
        }
        if (!requirements.trim()) {
            setRequirementsError('Njohuritë e nevojshme nuk mund të jenë boshe');
            isValid = false;
        }
        if (!location.trim()) {
            setLocationError('Lokacioni nuk mund të jetë bosh');
            isValid = false;
        }
        if (!type.trim()) {
            setTypeError('Tipi i punës nuk mund të jetë bosh');
            isValid = false;
        }

        if (isValid) {
            const updatedInternship = { tittle, company_name, description, start_date, end_date, requirements, location, type, deadline };
            if (id) {
                const token=localStorage.getItem('token');
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

    const locationOptions = [
        'Deçan', 'Dragash', 'Drenas', 'Ferizaj', 'Fushë Kosovë', 'Gjakovë', 'Gjilan', 'Burim',
        'Kaçanik', 'Dardanë', 'Klinë', 'Lipjan', 'Malishevë', 'Mitrovicë', 'Kastriot', 'Pejë',
        'Besianë', 'Prishtinë', 'Prizren', 'Rahovec', 'Skenderaj', 'Suharekë', 'Shtërpcë', 'Shtime',
        'Viti', 'Vushtrri'
    ];

    const categoryOptions = [
        'Administratë', 'Arkitekturë', 'Art dhe Kulturë', 'Banka', 'Industria Automobilistike',
        'Retail dhe Distribuim', 'Ndërtimtari & Patundshmëri', 'Mbështetje e Konsumatorëve, Call Center',
        'Ekonomi, Financë, Kontabilitet', 'Edukim, Shkencë & Hulumtim', 'Punë të Përgjithshme',
        'Burime Njerëzore', 'Teknologji e Informacionit', 'Gazetari, Shtyp & Media', 'Ligj & Legjislacion',
        'Menaxhment', 'Marketing, Reklamim & PR', 'Inxhinieri', 'Shëndetësi, Medicinë', 'Industri Farmaceutike',
        'Prodhim', 'Siguri & Mbrojtje', 'Industri të Shërbimit', 'Telekomunikim', 'Tekstil, Lëkurë, Industri Veshëmbathjeje',
        'Menaxhment Ekzekutiv', 'Gastronomi, Hoteleri, Turizëm', 'Përkthim, Interpretim', 'Transport, Logjistikë',
        'Industri e Përpunimit të Drurit'
    ];

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
                                        <div className="job-tittle">
                                            <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Titulli</h4>
                                            <p style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>
                                                <input type="text" value={tittle} onChange={(e) => setTittle(e.target.value)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px', width:'400px' }} />
                                                {titleError && <div style={{ color: 'red' }}>{titleError}</div>}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="job-post-details">
                                    <div className="post-details1 mb-50">
                                        <div className="small-section-tittle">
                                            <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Pershkrimi</h4>
                                        </div>
                                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px', width: '100%', height: '200px', resize: 'none' }}></textarea>
                                    </div>
                                    <div className="post-details2 mb-50">
                                        <div className="small-section-tittle">
                                            <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Njohurite e nevojshme</h4>
                                        </div>
                                        <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px', width: '100%', height: '200px', resize: 'none' }}></textarea>
                                        {requirementsError && <div style={{ color: 'red' }}>{requirementsError}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4">
                                <div className="post-details3 mb-4">
                                    <div className="small-section-tittle">
                                        <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Informatat e pergjithshme</h4>
                                    </div>
                                    <ul style={{ listStyle: 'none' }}>
                                        <li>Lokacioni:
                                            <select
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                className="form-control"
                                                style={{ width: '100%' }}
                                            >
                                                <option value="">Zgjidh Lokacionin</option>
                                                {locationOptions.map((loc, index) => (
                                                    <option key={index} value={loc}>{loc}</option>
                                                ))}
                                            </select><br/>
                                            {locationError && <div style={{ color: 'red' }}>{locationError}</div>}
                                        </li>
                                        <li>Tipi i punes:
                                            <select
                                                value={type}
                                                onChange={(e) => setType(e.target.value)}
                                                className="form-control"
                                                style={{ width: '100%' }}
                                            >
                                                <option value="">Zgjidh Kategorinë</option>
                                                {categoryOptions.map((cat, index) => (
                                                    <option key={index} value={cat}>{cat}</option>
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
                                    <div className="small-section-tittle">
                                        <h4 style={{ color: '#4e8fff', fontFamily: 'Verdana' }}>Company Information</h4>
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
