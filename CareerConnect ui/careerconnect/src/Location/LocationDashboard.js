import React, { useState, useEffect } from 'react';
import { getLocations, createLocation, deleteLocation } from '../Services/LocationService';
import SideNavBar from "../SideNavBar";

const LocationDashboard = () => {
    const [locations, setLocations] = useState([]);
    const [newLocationName, setNewLocationName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [locationToDelete, setLocationToDelete] = useState(null);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        setLoading(true);
        try {
            const response = await getLocations();
            if (Array.isArray(response)) {
                setLocations(response);
            } else if (response.data && Array.isArray(response.data)) {
                setLocations(response.data);
            } else {
                throw new Error('Formati i përgjigjes është i pavlefshëm');
            }
        } catch (error) {
            setError('Gabim gjatë marrjes së vendndodhjeve');
            console.error('Gabim gjatë marrjes së vendndodhjeve:', error);
        }
        setLoading(false);
    };

    const handleCreateLocation = async (e) => {
        e.preventDefault();
        if (!newLocationName.trim()) {
            setError('Ju lutemi vendosni një emër vendndodhjeje të vlefshëm');
            return;
        }

        setLoading(true);
        try {
            await createLocation({ name: newLocationName });
            setNewLocationName('');
            await fetchLocations();
        } catch (error) {
            setError('Gabim gjatë krijimit të vendndodhjes');
            console.error('Gabim gjatë krijimit të vendndodhjes:', error);
        }
        setLoading(false);
    };

    const handleDeleteLocation = async () => {
        setLoading(true);
        try {
            await deleteLocation(locationToDelete);
            await fetchLocations();
            setShowDeleteModal(false);
        } catch (error) {
            setError('Gabim gjatë fshirjes së vendndodhjes');
            console.error('Gabim gjatë fshirjes së vendndodhjes:', error);
        }
        setLoading(false);
    };

    const toggleDeleteModal = (locationName) => {
        setShowDeleteModal(!showDeleteModal);
        setLocationToDelete(locationName);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <SideNavBar />
                </div>
                <div className="col-md-9">
                    <h2 className="mt-5">Shto Vendndodhje të Re</h2>
                    <form onSubmit={handleCreateLocation} className="mb-4">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Vendos Emrin e Vendndodhjes"
                                value={newLocationName}
                                onChange={(e) => setNewLocationName(e.target.value)}
                                disabled={loading}
                            />
                            <div className="input-group-append">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? 'Duke shtuar...' : 'Shto Vendndodhje'}
                                </button>
                            </div>
                        </div>
                        {error && <p className="text-danger mt-2">{error}</p>}
                    </form>
                    <div className="mt-5">
                        <h2>Lista e Vendndodhjeve</h2>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Emri</th>
                                <th>Veprim</th>
                            </tr>
                            </thead>
                            <tbody>
                            {locations.map(location => (
                                <tr key={location.name}>
                                    <td>{location.name}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => toggleDeleteModal(location.name)}
                                            disabled={loading}
                                        >
                                            {loading ? 'Duke fshirë...' : 'Fshi'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {showDeleteModal && (
                        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Konfirmoni Fshirjen</h5>
                                        <button type="button" className="close" onClick={() => toggleDeleteModal(null)}>
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <p>A jeni i sigurt që dëshironi të fshini këtë vendndodhje?</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => toggleDeleteModal(null)}>Anulo</button>
                                        <button type="button" className="btn btn-danger" onClick={handleDeleteLocation} disabled={loading}>Fshije</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LocationDashboard;
