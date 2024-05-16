import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomNavbar from '../CustomNavbar';
import InterService from '../Services/InterService';
import backgroundImage from './background.jpg';
import Footer from '../Footer';
import { ReactComponent as GeoIcon } from './geo-alt.svg';
import { ReactComponent as ClockIcon } from './hourglass-split.svg';


function InternshipListing() {
    
    const locations = [
        'Deçan', 'Dragash', 'Drenas', 'Ferizaj', 'Fushë Kosovë', 'Gjakovë', 'Gjilan', 'Burim',
        'Kaçanik', 'Dardanë', 'Klinë', 'Lipjan', 'Malishevë', 'Mitrovicë', 'Kastriot', 'Pejë',
        'Besianë', 'Prishtinë', 'Prizren', 'Rahovec', 'Skenderaj', 'Suharekë', 'Shtërpcë', 'Shtime',
        'Viti', 'Vushtrri'
    ];
    const categories = [
        'Administratë',
        'Arkitekturë',
        'Art dhe Kulturë',
        'Banka',
        'Industria Automobilistike',
        'Retail dhe Distribuim',
        'Ndërtimtari & Patundshmëri',
        'Mbështetje e Konsumatorëve, Call Center',
        'Ekonomi, Financë, Kontabilitet',
        'Edukim, Shkencë & Hulumtim',
        'Punë të Përgjithshme',
        'Burime Njerëzore',
        'Teknologji e Informacionit',
        'Gazetari, Shtyp & Media',
        'Ligj & Legjislacion',
        'Menaxhment',
        'Marketing, Reklamim & PR',
        'Inxhinieri',
        'Shëndetësi, Medicinë',
        'Industri Farmaceutike',
        'Prodhim',
        'Siguri & Mbrojtje',
        'Industri të Shërbimit',
        'Telekomunikim',
        'Tekstil, Lëkurë, Industri Veshëmbathjeje',
        'Menaxhment Ekzekutiv',
        'Gastronomi, Hoteleri, Turizëm',
        'Përkthim, Interpretim',
        'Transport, Logjistikë',
        'Industri e Përpunimit të Drurit'
    ];

    const[internship, setInternship]=useState([])

    useEffect(() => {
        fetchInternships();
    }, []);

    const fetchInternships=async()=>{
        try{
            const response=await InterService.getAllInternships();
            setInternship(response);
        }catch(error){
            console.log('Error fetching internships ', error);
        }
    };
    

    return (
        <>
            <CustomNavbar />
            <div style={{ 
            backgroundImage: `url(${backgroundImage})`, 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'center', 
            textAlign: 'center',
            minHeight: '100vh', 
            }}>
                <div className="container-fluid  py-5" style={{width:'80%', marginTop:'20px', backgroundColor:'#6078a9', borderRadius:'25px'}}>
                    <div className="container">
                        <div className="row g-3 justify-content-center align-items-center">
                            <div className="col-md-3">
                                <input type="text" className="form-control" placeholder="Keyword" />
                            </div>
                            <div className="col-md-3">
                                <select className="form-select">
                                    <option value="">Industria</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>

                            </div>
                            <div className="col-md-3">
                                <select className="form-select">
                                    <option selected>Location</option>
                                    {locations.map((location, index) => (
                                        <option key={index} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <Button variant="dark" className="w-100">Search</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="row">
                        {internship.map(internship => (
                            <div key={internship.id} className="col-md-6 mb-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{internship.tittle}</Card.Title>
                                        <Card.Text className="text-start p-3"> 
                                            Data e fillimit se praktikes: <strong>{internship.start_date}</strong><br/>
                                            Data e perfundimit se praktikes: <strong>{internship.end_date}</strong><br/>
                                            <GeoIcon/><strong>{internship.location}</strong><br />
                                            <ClockIcon/>Afati i aplikimit: <strong>{internship.deadline}</strong>
                                        </Card.Text>
                                        <Link to="/applications" className="btn btn-primary me-2">Apliko</Link>
                                        <Link to={`/InternshipDetails/${internship.id}`} className="btn btn-secondary me-2">Shiko detajet</Link> 
                                        <Link  className="btn btn-secondary">Shiko aplikimet</Link> 
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <Footer/>
        </>
    );
}

export default InternshipListing;
