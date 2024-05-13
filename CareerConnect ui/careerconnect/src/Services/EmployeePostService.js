import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/api/EmployeePost';

export const createEmployeePost=(employeePost)=>axios.post(REST_API_BASE_URL,employeePost);
export const listEmployeePosts=(employeePostId)=>axios.get(`${REST_API_BASE_URL}?employeePostId=${employeePostId}`);
export const getEmployeePost=(employeePostId)=>axios.get(REST_API_BASE_URL+'/'+employeePostId);
export const updateEmployeePost=(employeePostId,employeePost)=>axios.put(REST_API_BASE_URL+'/'+employeePostId,employeePost);
export const deleteEmployeePost=(employeePostId)=>axios.delete(REST_API_BASE_URL+'/'+employeePostId);