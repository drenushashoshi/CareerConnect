import axios from 'axios';

const API_URL = 'http://localhost:8080';

// Fetch all industries
export const getIndustries = async () => {
    try {
        const response = await axios.get(`${API_URL}/public/industria`);
        return response.data;
    } catch (error) {
        console.error('Error fetching industries:', error);
        throw error;
    }
};

// Create a new industry
export const createIndustria = async (Industria, token) => {
    try {
        const response = await axios.post(`${API_URL}/admin/industria`, Industria, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating industry:', error);
        throw error;
    }
};

// Delete an industry by name
export const deleteIndustria = async (name, token) => {
    try {
        const encodedName = encodeURIComponent(name); // Encode the name
        const url = `${API_URL}/admin/deleteIndustria/${encodedName}`;
        const response = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting industry ${name}:`, error);
        throw error;
    }
};

