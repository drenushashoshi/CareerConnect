import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/Internship';

export const listInternships = () => axios.get(REST_API_BASE_URL + '/all');
export const getAllCompanyInternships = (companyId) => axios.get(`${REST_API_BASE_URL}?companyId=${companyId}`);
export const createInternship=(internship)=> axios.post(REST_API_BASE_URL, internship);
export const getInternship=(internshipId)=>axios.get(REST_API_BASE_URL+'/'+internshipId);
export const updateInternship=(internshipId, internship)=>axios.put(REST_API_BASE_URL +'/'+internshipId, internship);
export const deleteInternship=(internshipId)=>axios.delete(REST_API_BASE_URL+'/'+internshipId);