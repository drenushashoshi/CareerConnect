import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080';

export const downloadImage = async (postId) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/public/imagepost/${postId}`, {
            responseType: 'arraybuffer'
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createEmployeePost = async (formData, token) => {
    try {
        const response = await axios.post(`${REST_API_BASE_URL}/employee/createPost`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllEmployeePosts = async (employeeId) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/public/allpost?employeeId=${employeeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getEmployeePost = async (id) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/public/post/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateEmployeePost = async (id, formData, token) => {
    try {
        const response = await axios.put(`${REST_API_BASE_URL}/employee/updatepost/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteEmployeePost = async (id, token) => {
    try {
        const response = await axios.delete(`${REST_API_BASE_URL}/employee/deletepost/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
