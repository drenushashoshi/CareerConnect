import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/public/jobs';

// Fetch the authentication token from local storage or another secure location
const getAuthToken = () => {
    return localStorage.getItem('token'); // Modify as needed to match your auth storage method
}

export const listJobs = () => {
    return axios.get(REST_API_BASE_URL);
}

export const createJob = async (job) => {
    const token = getAuthToken();
    try {
        const response = await axios.post(REST_API_BASE_URL, job, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateJob = (jobId, updatedJobData) => {
    const url = `${REST_API_BASE_URL}/${jobId}`;
    return axios.put(url, updatedJobData);
}

export const deleteJob = (jobId) => {
    const url = `${REST_API_BASE_URL}/${jobId}`;
    return axios.delete(url);
}

export const getJob = (jobId) => {
    const url = `${REST_API_BASE_URL}/${jobId}`;
    return axios.get(url);
}

export const searchJobs = (query, Industria, location) => {
    return axios.get(`${REST_API_BASE_URL}/search`, {
        params: { query, Industria, location }
    });
}