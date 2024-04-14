import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/api/applications';

export const getApplications=()=>axios.get(REST_API_BASE_URL);
export const createApplication=(Application)=> axios.post(REST_API_BASE_URL, Application);
export const getApplication=(ApplicationID)=>axios.get(REST_API_BASE_URL+'/'+ApplicationID);
export const updateApplication=(ApplicationID, Application)=>axios.put(REST_API_BASE_URL +'/'+ApplicationID, Application);
export const uploadResume=(file)=>axios.put(REST_API_BASE_URL+'/CV',file);
export const getResume=(file)=>axios.get(REST_API_BASE_URL+'/resume/'+file);
export const deleteApplication=(ApplicationID)=>axios.delete(REST_API_BASE_URL+'/'+ApplicationID);
