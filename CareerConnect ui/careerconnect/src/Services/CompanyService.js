import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/api/Company';

export const listCompanies=()=>{
    return axios.get(REST_API_BASE_URL);
}
export const createCompany=(company)=> axios.post(REST_API_BASE_URL, company);
export const authenticateCompany = (data) => axios.post(`${REST_API_BASE_URL}/login`, data);
