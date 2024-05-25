import axios from "axios";

class CvService {
    static BASE_URL = "http://localhost:8080";

    static async createCv(cv) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(CvService.BASE_URL+'/employee/create', cv, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getAllCVs() {
        const response = await axios.get(`${CvService.BASE_URL}/employee/getall`);
        return response.data;
    }

    static async getCVById(id) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${CvService.BASE_URL}/employee/Cv/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async updateCv(id, cv) {
        const response = await axios.put(`${CvService.BASE_URL}/employee/${id}`, cv);
        return response.data;
    }

    static async uploadPicture(id, formData) {
        const response = await axios.post(`${CvService.BASE_URL}/employee/${id}/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }

    static async deleteCv(id) {
        const response = await axios.delete(`${CvService.BASE_URL}/employee/${id}`);
        return response.data;
    }
}

export default CvService;
