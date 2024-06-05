import axios from "axios";

class LanguageService {
    static BASE_URL = "http://localhost:8080";

    static async createLanguage(language, cvId) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${LanguageService.BASE_URL}/employee/createlanguage/${cvId}`, language, {
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
    
    

    static async getLanguages() {
        const response = await axios.get(`${LanguageService.BASE_URL}/employee/getall/languages`);
        return response.data;
    }

    static async getLanguageById(id) {
        const response = await axios.get(`${LanguageService.BASE_URL}/employee/language/${id}`);
        return response.data;
    }

    static async updateLanguage(id, language) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`${LanguageService.BASE_URL}/employee/updateLanguage/${id}`, language, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("updating with:",response.data)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteLanguage(id) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`${LanguageService.BASE_URL}/employee/deleteLanguage/${id}`, {
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
    static async getLanguageByCvId(id)
    {
        try {
            const response = await axios.get(`${LanguageService.BASE_URL}/public/languages/cv/${id}`, {
                headers: {
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

export default LanguageService;
