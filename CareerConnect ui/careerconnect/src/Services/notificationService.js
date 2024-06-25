import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/company/notifications';

const getNotifications = async (token, companyId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${companyId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('data from service:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error.response?.data || error.message);
        throw error;
    }
};

const markAsRead = async (notificationId, token) => {
    try {
        await axios.put(`${API_BASE_URL}/${notificationId}/mark-read`, null, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        console.error('Error marking notification as read:', error.response?.data || error.message);
        throw error;
    }
};

const deleteNotification = async (notificationId, token) => {
    try {
        await axios.delete(`${API_BASE_URL}/${notificationId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        console.error('Error deleting notification:', error.response?.data || error.message);
        throw error;
    }
};

export default {
    getNotifications,
    markAsRead,
    deleteNotification
};
