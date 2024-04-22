import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/api/Rate';

export const listRates=()=>axios.get(REST_API_BASE_URL);
export const getRates=()=>axios.get(REST_API_BASE_URL);
export const createRate=(rate)=> axios.post(REST_API_BASE_URL,rate);
export const getRate=(rateId)=> axios.get(REST_API_BASE_URL+'/'+rateId);
export const updateRate=(rateId,rate)=>axios.put(REST_API_BASE_URL+'/'+rateId,rate);
export const deleteRate=(rateId)=>axios.delete(REST_API_BASE_URL+'/'+rateId);