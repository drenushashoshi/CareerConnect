import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/jobs';

export const listJobs = () => {
    return axios.get(REST_API_BASE_URL);
}

export const createJob = (job) => {
    return axios.post(REST_API_BASE_URL, job);
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