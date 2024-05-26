import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080';

export const listJobs = () => {
    return axios.get(`${REST_API_BASE_URL}/public/getAllJobs`);
}

export const createJob = async (job, token) => {
    try {
        const response = await axios.post(`${REST_API_BASE_URL}/company/createJob`, job, {
            headers:{Authorization: `Bearer ${token}`}
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAllCompanyJobs = async (companyId) =>{
    try{
        const response= await axios.get(`${REST_API_BASE_URL}/public/companyJobs?companyId=${companyId}`)
        return response.data;
    }catch(err){
        throw err;
    }
}

export const updateJob = async (jobId, updatedJobData, token) => {
    try {
        const response = await axios.put(`${REST_API_BASE_URL}/company/updateJob/${jobId}`, updatedJobData,{
            headers:{Authorization: `Bearer ${token}`}
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteJob = async (jobId, token) => {
    try {
        const response = await axios.delete(`${REST_API_BASE_URL}/company/deleteJob/${jobId}`,{
            headers:{Authorization: `Bearer ${token}`}
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getJob = (jobId) => {
    const url = `${REST_API_BASE_URL}/public/readJob/${jobId}`;
    return axios.get(url);
}

export const searchJobs = (query, Industria, location) => {
    return axios.get(`${REST_API_BASE_URL}/public/searchJobs`, {
        params: { query, Industria, location }
    });
}

export const getCompany = (companyId) => {
    return axios.get(`${REST_API_BASE_URL}/public/getCompany/${companyId}`);
};