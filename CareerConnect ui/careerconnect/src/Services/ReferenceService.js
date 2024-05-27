import axios from "axios";

class ReferenceService {
    static BASE_URL = "http://localhost:8080";

    static async createReference(Reference, cvId) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${ReferenceService.BASE_URL}/employee/createReference/${cvId}`, Reference, {
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
    
    

    static async getAllReferences() {
        const response = await axios.get(`${ReferenceService.BASE_URL}/employee/getall/References`);
        return response.data;
    }

    static async getReferenceById(ReferenceId) {
        const response = await axios.get(`${ReferenceService.BASE_URL}/employee/Reference/${ReferenceId}`);
        return response.data;
    }

    static async updateReference(ReferenceId, Reference) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`${ReferenceService.BASE_URL}/employee/updateReference/${ReferenceId}`, Reference, {
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

    static async deleteReference(ReferenceId) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`${ReferenceService.BASE_URL}/employee/deleteReference/${ReferenceId}`, {
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
    static async getReferenceByCvId(id)
    {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${ReferenceService.BASE_URL}/employee/References/cv/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default ReferenceService;
