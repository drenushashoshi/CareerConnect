import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getLocations = () => {
    return axios.get(`${API_URL}/public/location`);
};

export const createLocation = (location, token) => {
    return axios.post(`${API_URL}/admin/location`, location, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const deleteLocation = (name, token) => {
    return axios.delete(`${API_URL}/admin/deleteLocation/${encodeURIComponent(name)}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

