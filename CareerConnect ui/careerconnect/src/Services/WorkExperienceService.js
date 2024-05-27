import axios from "axios";

class WorkExperienceService {
    static BASE_URL = "http://localhost:8080";

    static async createWorkExperience(WorkExperience, cvId) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${WorkExperienceService.BASE_URL}/employee/createWorkExperience/${cvId}`, WorkExperience, {
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
    
    

    static async getAllWorkExperiences() {
        const response = await axios.get(`${WorkExperienceService.BASE_URL}/employee/getall/WorkExperiences`);
        return response.data;
    }

    static async getWorkExperienceById(id) {
        const response = await axios.get(`${WorkExperienceService.BASE_URL}/employee/WorkExperience/${id}`);
        return response.data;
    }

    static async updateWorkExperience(id, WorkExperience) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`${WorkExperienceService.BASE_URL}/employee/updateWorkExperience/${id}`, WorkExperience, {
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

    static async deleteWorkExperience(id) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`${WorkExperienceService.BASE_URL}/employee/deleteWorkExperience/${id}`, {
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
    static async getWorkExperienceByCvId(id)
    {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${WorkExperienceService.BASE_URL}/employee/WorkExperiences/cv/${id}`, {
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

export default WorkExperienceService;
