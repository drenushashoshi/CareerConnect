import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/api/CompanyStaff';

export const createCompanyStaff=(companyStaff)=>axios.post(REST_API_BASE_URL, companyStaff);
export const listCompanyStaffs = (companyId) => axios.get(`${REST_API_BASE_URL}?companyId=${companyId}`);