import React, { useState, useEffect } from 'react';
import { getIndustries, createIndustria, deleteIndustria } from '../Services/IndustriaService';
import SideNavBar from "../SideNavBar";

const IndustriaDashboard = () => {
    const [industries, setIndustries] = useState([]);
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

    const handleCreateIndustria = async (e) => {
        e.preventDefault();
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
        <div className="d-flex">
            <SideNavBar />
            <div className='container-fluid' style={{ marginLeft: '250px', marginTop: '100px', paddingTop: '20px' }}>
                <h2 style={{ fontFamily: 'Arial, sans-serif' }}>LIST OF INDUSTRIES:</h2><br/>
                <div className="table-responsive">
                    <table className='table table-striped table-bordered'>
                        <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {industries.map(industria => (
                            <tr key={industria.name}>
                                <td>{industria.name}</td>
                                <td><button onClick={() => handleDeleteIndustria(industria.name)}>Delete</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <h2>Add New Industria:</h2>
                <form onSubmit={handleCreateIndustria}>
                    <div>
                        <input
                            type="text"
                            placeholder="Industria Name"
                            value={newIndustriaName}
                            onChange={(e) => setNewIndustriaName(e.target.value)}
                        />
                    </div>
                    <button type="submit">Add Industria</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default IndustriaDashboard;
