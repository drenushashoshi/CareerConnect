import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/api/CVs';

export const getAllCVs=()=>axios.get(REST_API_BASE_URL);
export const createCv=(Cv)=> axios.post(REST_API_BASE_URL, Cv);
export const getCVById=(CvId)=>axios.get(REST_API_BASE_URL+'/'+CvId);
export const updateCv=(CvId, Cv)=>axios.put(REST_API_BASE_URL +'/'+CvId, Cv);
export const uploadPicture=(file)=>axios.put(REST_API_BASE_URL+'/CV',file);
export const getPicture=(file)=>axios.get(REST_API_BASE_URL+'/resume/'+file);
export const deleteCv=(CvId)=>axios.delete(REST_API_BASE_URL+'/'+CvId);
