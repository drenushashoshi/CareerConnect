import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/api/References';

export const getAllReferences=()=>axios.get(REST_API_BASE_URL);
export const createReference=(Reference,cv)=> axios.post(REST_API_BASE_URL, Reference,cv);
export const getReferenceById=(ReferenceId)=>axios.get(REST_API_BASE_URL+'/'+ReferenceId);
export const updateReference=(ReferenceId, Reference)=>axios.put(REST_API_BASE_URL +'/'+ReferenceId, Reference);
export const deleteReference=(ReferenceId)=>axios.put(REST_API_BASE_URL+'/'+ReferenceId);
export const getReferenceByCvId=(id)=>axios.get(REST_API_BASE_URL+'/cv/'+id);