import axios from 'axios';

const API_URL = 'http://localhost:8080/api/Applications';

export async function saveApplication(Application)
{
    return await axios.post(API_URL,Application);
}
export async function getApplications(page = 0, size = 10)
{
    return await axios.get(`${API_URL}?page=${page}&size=${size}`); 
}
export async function getApplication(id)
{
    return await axios.get(`${API_URL}/${id}`); 
}
export async function updateApplication(Application)
{
    return await axios.post(API_URL,Application); 
}
export async function updateResume(formData)
{
    return await axios.put(`${API_URL}/CV`,formData); 
}
export async function deleteApplication(id)
{
    return await axios.delete(`${API_URL}/${id}`); 
}