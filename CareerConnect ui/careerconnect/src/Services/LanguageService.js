import axios from "axios";

class LanguageService {
    static BASE_URL = "http://localhost:8080";

    static async createLanguage(language, cv) {
        const token = localStorage.getItem('token');
        try {
            const requestBody = { ...language, cv };
            const response = await axios.post(LanguageService.BASE_URL + '/employee/createlanguage', requestBody, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
        const response = await axios.put(`${LanguageService.BASE_URL}/employee/updateLanguage/${id}`, language);
        return response.data;
    }

    static async deleteLanguage(id) {
        const response = await axios.delete(`${LanguageService.BASE_URL}/employee/deleteLanguage/${id}`);
        return response.data;
    }
    static async getLanguageByCvId(id)
    {
        const response = await axios.get(`${LanguageService.BASE_URL}/employee/languages/cv/${id}`)
    }
}

export default LanguageService;
