import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/Internship/all';

export const listInternships=()=>axios.get(REST_API_BASE_URL);