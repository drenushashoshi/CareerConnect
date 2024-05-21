import axios from 'axios';

const API_URL = 'http://localhost:8080/public/Location';

export const getLocations = () => {
    return axios.get(API_URL);
};

export const createLocation = (location) => {
    return axios.post(API_URL, location);
};

export const deleteLocation = (name) => {
    return axios.delete(`${API_URL}/${encodeURIComponent(name)}`);
};

