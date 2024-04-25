import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/api/WorkExperiences';

export const getAllWorkExperiences=()=>axios.get(REST_API_BASE_URL);
export const createWorkExperience=(WorkExperience)=> axios.post(REST_API_BASE_URL, WorkExperience);
export const getWorkExperienceById=(WorkExperienceId)=>axios.get(REST_API_BASE_URL+'/'+WorkExperienceId);
export const updateWorkExperience=(WorkExperienceId, WorkExperience)=>axios.put(REST_API_BASE_URL +'/'+WorkExperienceId, WorkExperience);
export const deleteWorkExperience=(WorkExperienceId)=>axios.put(REST_API_BASE_URL+'/'+WorkExperienceId);
export const getWorkExperienceByCvId=()=>axios.get(REST_API_BASE_URL);