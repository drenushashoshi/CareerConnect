import React, { useState, useEffect } from 'react';
import { getLocations, createLocation, deleteLocation } from '../Services/LocationService';
import SideNavBar from "../SideNavBar";

const LocationDashboard = () => {
    const [locations, setLocations] = useState([]);
    const [newLocationName, setNewLocationName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        setLoading(true);
        try {
            const response = await getLocations();
            console.log('Response:', response);
            if (Array.isArray(response)) {
                setLocations(response);
            } else if (response.data && Array.isArray(response.data)) {
                setLocations(response.data);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            setError('Error fetching locations');
            console.error('Error fetching locations:', error);
        }
        setLoading(false);
    };

    const handleCreateLocation = async (e) => {
        e.preventDefault();
        if (!newLocationName.trim()) {
            setError('Please enter a valid location name');
            return;
        }

        setLoading(true);
        try {
            await createLocation({ name: newLocationName });
            setNewLocationName('');
            await fetchLocations();
        } catch (error) {
            setError('Error creating location');
            console.error('Error creating location:', error);
        }
        setLoading(false);
    };

    const handleDeleteLocation = async (name) => {
        setLoading(true);
        try {
            await deleteLocation(name);
            await fetchLocations();
        } catch (error) {
            setError('Error deleting location');
            console.error('Error deleting location:', error);
        }
        setLoading(false);
    };

    return (
        <div className="d-flex">
            <SideNavBar />
            <div className='container-fluid' style={{ marginLeft: '250px', marginTop: '100px', paddingTop: '20px' }}>
                <h2 style={{ fontFamily: 'Arial, sans-serif' }}>LIST OF LOCATIONS:</h2><br />
                <div className="table-responsive">
                    <table className='table table-striped table-bordered'>
                        <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {locations.map(location => (
                            <tr key={location.name}>
                                <td>{location.name}</td>
                                <td><button onClick={() => handleDeleteLocation(location.name)}>Delete</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <h2>Add New Location:</h2>
                <form onSubmit={handleCreateLocation}>
                    <div>
                        <input
                            type="text"
                            placeholder="Location Name"
                            value={newLocationName}
                            onChange={(e) => setNewLocationName(e.target.value)}
                        />
                    </div>
                    <button type="submit">Add Location</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default LocationDashboard;
