import axios from "axios";

class ApplicationService {
    static BASE_URL = "http://localhost:8080";

    static async createApplication(Application, id) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${ApplicationService.BASE_URL}/employee/createApplication/${id}`, Application, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    
    static async getApplications() {
        const response = await axios.get(`${ApplicationService.BASE_URL}/employee/getAll/applications`);
        return response.data;
    }

    static async getApplication(id) {
        const response = await axios.get(`${ApplicationService.BASE_URL}/employee/Application/${id}`);
        return response.data;
    }

    static async updateApplication(id, Application) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`${ApplicationService.BASE_URL}/employee/updateApplication/${id}`, Application, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteApplication(id) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`${ApplicationService.BASE_URL}/employee/deleteApplication/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
   
}

export default ApplicationService;
