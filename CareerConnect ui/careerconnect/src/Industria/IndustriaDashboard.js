import React, { useState, useEffect } from 'react';
import { getIndustries, createIndustria, deleteIndustria } from '../Services/IndustriaService';

const IndustriaDashboard = () => {
    const [Industries, setIndustries] = useState([]);
    const [newIndustriaName, setNewIndustriaName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchIndustries();
    }, []);

    const fetchIndustries = async () => {
        setLoading(true);
        try {
            const response = await getIndustries();
            console.log('Response:', response);
            if (Array.isArray(response)) {
                setIndustries(response);
            } else if (response.data && Array.isArray(response.data)) {
                setIndustries(response.data);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            setError('Error fetching industries');
            console.error('Error fetching industries:', error);
        }
        setLoading(false);
    };


    const handleCreateIndustria = async () => {
        if (!newIndustriaName.trim()) {
            setError('Please enter a valid industria name');
            return;
        }

        setLoading(true);
        try {
            await createIndustria({ name: newIndustriaName });
            setNewIndustriaName('');
            await fetchIndustries();
        } catch (error) {
            setError('Error creating industria');
            console.error('Error creating industria:', error);
        }
        setLoading(false);
    };

    const handleDeleteIndustria = async (name) => {
        setLoading(true);
        try {
            await deleteIndustria(name);
            await fetchIndustries();
        } catch (error) {
            setError('Error deleting industria');
            console.error('Error deleting industria:', error);
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Industria Dashboard</h1>

            <h2>Create New Industria</h2>
            <form onSubmit={handleCreateIndustria}>
                <input
                    type="text"
                    placeholder="Industria Name"
                    value={newIndustriaName}
                    onChange={(e) => setNewIndustriaName(e.target.value)}
                />
                <button type="submit">Create</button>
                {error && <p>{error}</p>}
            </form>

            <h2>Industries</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {Industries.map((Industria) => (
                        <li key={Industria.name}>
                            {Industria.name}
                            <button onClick={() => handleDeleteIndustria(Industria.name)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default IndustriaDashboard;
