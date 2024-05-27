import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080';


export const createEmployeePost = async (employeePost, token) => {
    try {
        const response = await axios.post(`${REST_API_BASE_URL}/employee/registerPost`, employeePost, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const listEmployeePosts = async () => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/public/EmployeePost`);
        return response.data;
    } catch (error) {
        console.error('Error fetching employee posts:', error);
        throw error;
    }
};

export const getEmployeePost = (employeePostId) => axios.get(`${REST_API_BASE_URL}/${employeePostId}`)
    .then(response => response.data); // Extract data from response

export const updateEmployeePost = (employeePostId, employeePost) => axios.put(`${REST_API_BASE_URL}/${employeePostId}`, employeePost)
    .then(response => response.data); // Extract data from response

export const deleteEmployeePost = async (postId) => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`${REST_API_BASE_URL}/employee/deletePost/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error deleting employee post:', error);
        throw error;
    }
};
