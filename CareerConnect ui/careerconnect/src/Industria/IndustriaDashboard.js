import React, { useState, useEffect } from 'react';
import { getIndustries, createIndustria, deleteIndustria } from '../Services/IndustriaService';
import SideNavBar from "../SideNavBar";
import {Link} from "react-router-dom";

const IndustriaDashboard = () => {
    const [industries, setIndustries] = useState([]);
    const [newIndustriaName, setNewIndustriaName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [industriaToDelete, setIndustriaToDelete] = useState(null);

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    useEffect(() => {
        if (token && role === 'ADMIN') {
            fetchIndustries();
        }
    }, [token, role]);

    const fetchIndustries = async () => {
        setLoading(true);
        try {
            const response = await getIndustries();
            if (Array.isArray(response)) {
                setIndustries(response);
            } else if (response.data && Array.isArray(response.data)) {
                setIndustries(response.data);
            } else {
                throw new Error('Formati i përgjigjes është i pavlefshëm');
            }
        } catch (error) {
            setError('Gabim gjatë marrjes së industrive');
            console.error('Gabim gjatë marrjes së industrive:', error);
        }
        setLoading(false);
    };

    const handleCreateIndustria = async (e) => {
        e.preventDefault();
        if (!newIndustriaName.trim()) {
            setError('Ju lutemi vendosni një emër të vlefshëm për industria');
            return;
        }

        setLoading(true);
        try {
            await createIndustria({ name: newIndustriaName }, token);
            setNewIndustriaName('');
            await fetchIndustries();
        } catch (error) {
            setError('Gabim gjatë krijimit të industria');
            console.error('Gabim gjatë krijimit të industria:', error);
        }
        setLoading(false);
    };

    const handleDeleteIndustria = async () => {
        setLoading(true);
        try {
            await deleteIndustria(industriaToDelete, token);
            await fetchIndustries();
            setShowDeleteModal(false);
        } catch (error) {
            setError('Gabim gjatë fshirjes së industria');
            console.error('Gabim gjatë fshirjes së industria:', error);
        }
        setLoading(false);
    };

    const toggleDeleteModal = (industriaName) => {
        setShowDeleteModal(!showDeleteModal);
        setIndustriaToDelete(industriaName);
    };

    if(role === 'ADMIN'){
    return (
        <div className="d-flex">
            <SideNavBar/>
        <div className="container-fluid" style={{ marginLeft: '250px', paddingTop: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div className="row">
                <div className="col-md-9">
                    <h2 className="mt-5">Shto Industri të Re:</h2>
                    <form onSubmit={handleCreateIndustria} className="mb-4">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Emri i Industri"
                                value={newIndustriaName}
                                onChange={(e) => setNewIndustriaName(e.target.value)}
                                disabled={loading}
                            />
                            <div className="input-group-append">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? 'Duke shtuar...' : 'Shto Industri'}
                                </button>
                            </div>
                        </div>
                        {error && <p className="text-danger mt-2">{error}</p>}
                    </form>
                    <div>
                        <h2>Lista e Industrive:</h2>
                        <table className="table">
                            <thead className="thead-dark">
                            <tr>
                                <th>Emri</th>
                                <th>Veprim</th>
                            </tr>
                            </thead>
                            <tbody>
                            {industries.map(industria => (
                                <tr key={industria.name}>
                                    <td>{industria.name}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => toggleDeleteModal(industria.name)}
                                            disabled={loading}
                                        >
                                            {loading ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showDeleteModal && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Konfirmo Fshirjen</h5>
                                <button type="button" className="close" onClick={() => setShowDeleteModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>A jeni i sigurt që dëshironi të fshini këtë industrinë?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Anulo</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteIndustria} disabled={loading}>Fshije</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
    );}
    else{
        return (
            <div>
                <h2 className="mt-5">Vetem ADMINI ka akses ne dashboard</h2>
                <Link to="/">Kliko ketu per tu loguar si ADMIN</Link>
            </div>
        );
    }
};

export default IndustriaDashboard;
