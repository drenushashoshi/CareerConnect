import React, { useState, useEffect } from 'react';
import { getLocations, createLocation, deleteLocation } from '../Services/LocationService';

const LocationDashboard = () => {
    const [locations, setLocations] = useState([]);
    const [locationForm, setLocationForm] = useState({ name: '' });

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        const response = await getLocations();
        setLocations(response.data);
    };

    const handleLocationSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form with locationForm:", locationForm);

        if (locationForm.name.trim() === '') return;

        try {
            await createLocation({ name: locationForm.name });
            console.log("Location created successfully");
        } catch (error) {
            console.error("Failed to create location:", error);
        }

        // Reset the form state after submission
        setLocationForm({ name: '' });
        await fetchLocations();
    };

    const handleLocationDelete = async (name) => {
        try {
            await deleteLocation(name);
            console.log("Location deleted successfully");
        } catch (error) {
            console.error("Failed to delete location:", error);
        }
        await fetchLocations();
    };

    return (
        <div>
            <h1>Location Dashboard</h1>

            <h2>Manage Locations</h2>
            <form onSubmit={handleLocationSubmit}>
                <input
                    type="text"
                    placeholder="Location Name"
                    value={locationForm.name}
                    onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                />
                <button type="submit">Create</button>
            </form>
            <ul>
                {locations.map((location) => (
                    <li key={location.name}>
                        {location.name}
                        <button onClick={() => handleLocationDelete(location.name)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocationDashboard;
