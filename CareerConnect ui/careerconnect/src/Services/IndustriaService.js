import axios from 'axios';

const API_URL = 'http://localhost:8080/public/Industria';

// Fetch all industries
export const getIndustries = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching industries:', error);
        throw error;
    }
};

// Create a new industry
export const createIndustria = async (Industria) => {
    try {
        const response = await axios.post(API_URL, Industria);
        return response.data;
    } catch (error) {
        console.error('Error creating industry:', error);
        throw error;
    }
};

// Delete an industry by name
export const deleteIndustria = async (name) => {
    try {
        const encodedName = encodeURIComponent(name); // Encode the name
        const url = `${API_URL}/${encodedName}`;
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error(`Error deleting industry ${name}:`, error);
        throw error;
    }
};

