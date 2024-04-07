import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import backgroundImage from './login-test2.avif';
import CostumNavbar from "./CostumNavbar"; // Importing the Navbar component

function JobListing() {
    const [showModal, setShowModal] = useState(false);
    const locations = [
        'Deçan', 'Dragash', 'Drenas', 'Ferizaj', 'Fushë Kosovë', 'Gjakovë', 'Gjilan', 'Burim',
        'Kaçanik', 'Dardanë', 'Klinë', 'Lipjan', 'Malishevë', 'Mitrovicë', 'Kastriot', 'Pejë',
        'Besianë', 'Prishtinë', 'Prizren', 'Rahovec', 'Skenderaj', 'Suharekë', 'Shtërpcë', 'Shtime',
        'Viti', 'Vushtrri'
    ];

    const handleApplyClick = () => {
        // Logic for applying to the job
        console.log('Applied to the job');
    };

    const handleWebpageLink = (url) => {
        window.open(url, '_blank');
    };

    return (
        <>
            <CostumNavbar />
            {/* Search Start */}
            <div className="container-fluid bg-primary py-5">
                <div className="container">
                    <div className="row g-3 justify-content-center align-items-center">
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="Keyword" />
                        </div>
                        <div className="col-md-3">
                            <select className="form-select">
                                    <option value="">Industria</option>
                                    <option value="administrata">Administratë</option>
                                    <option value="arkitekture">Arkitekturë</option>
                                    <option value="art_dhe_kulture">Art dhe Kulturë</option>
                                    <option value="banka">Banka</option>
                                    <option value="industria_automobilistike">Industria Automobilistike</option>
                                    <option value="retail_dhe_distribuim">Retail dhe Distribuim</option>
                                    <option value="ndertimtari_patundshmeri">Ndërtimtari & Patundshmëri</option>
                                    <option value="mbeshtetje_konsumatoreve_call_center">Mbështetje e Konsumatorëve, Call Center</option>
                                    <option value="ekonomi_financ_kontabilitet">Ekonomi, Financë, Kontabilitet</option>
                                    <option value="edukim_shkence_hulumtim">Edukim, Shkencë & Hulumtim</option>
                                    <option value="pune_te_pergjithshme">Punë të Përgjithshme</option>
                                    <option value="burime_njerzore">Burime Njerëzore</option>
                                    <option value="teknologji_informacionit">Teknologji e Informacionit</option>
                                    <option value="gazetari_shtyp_media">Gazetari, Shtyp & Media</option>
                                    <option value="ligj_legjislacion">Ligj & Legjislacion</option>
                                    <option value="menaxhment">Menaxhment</option>
                                    <option value="marketing_reklamim_pr">Marketing, Reklamim & PR</option>
                                    <option value="inxhinieri">Inxhinieri</option>
                                    <option value="shendetesi_medicin">Shëndetësi, Medicinë</option>
                                    <option value="industri_farmaceutike">Industri Farmaceutike</option>
                                    <option value="prodhim">Prodhim</option>
                                    <option value="sherbime_publike_qeveritare">Shërbime Publike, Qeveritare</option>
                                    <option value="siguri_mbrojtje">Siguri & Mbrojtje</option>
                                    <option value="industri_sherbimit">Industri të Shërbimit</option>
                                    <option value="telekomunikim">Telekomunikim</option>
                                    <option value="tekstil_lekure_veshembathje">Tekstil, Lëkurë, Industri Veshëmbathjeje</option>
                                    <option value="menaxhment_ekzekutiv">Menaxhment Ekzekutiv</option>
                                    <option value="gastronomi_hoteleri_turizem">Gastronomi, Hoteleri, Turizëm</option>
                                    <option value="perkthim_interpretim">Përkthim, Interpretim</option>
                                    <option value="transport_logjistike">Transport, Logjistikë</option>
                                    <option value="industri_perpunimit_drurit">Industri e Përpunimit të Drurit</option>
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
                            <Button variant="dark" className="w-100" onClick={() => handleApplyClick()}>Search</Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Search End */}
        </>
    );
}

export default JobListing;
