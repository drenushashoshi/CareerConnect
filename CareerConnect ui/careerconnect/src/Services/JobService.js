import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/api/jobs';

export const listJobs = () => {
    return axios.get(REST_API_BASE_URL);
}

export const createJob = (job) => {
    return axios.post(REST_API_BASE_URL, job);
}

// Add other job-related service methods as needed
