import axios from "axios";

class ApplicationService {
    static BASE_URL = "http://localhost:8080";

    static async createApplication(Application) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${ApplicationService.BASE_URL}/employee/createApplication`, Application, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("API:",response.data)
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    
    static async getApplications() {
        const response = await axios.get(`${ApplicationService.BASE_URL}/public/getAll/applications`);
        return response.data;
    }

    static async getApplication(id) {
        const response = await axios.get(`${ApplicationService.BASE_URL}/public/Application/${id}`);
        return response.data;
    }

    static async updateApplication(id, Application) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`${ApplicationService.BASE_URL}/public/updateApplication/${id}`, Application, {
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
            const response = await axios.delete(`${ApplicationService.BASE_URL}/public/deleteApplication/${id}`, {
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
    static async getApplicationByJobId(id)
    {
        const token = localStorage.getItem('token');
        try{
            const response = await axios.get(`${ApplicationService.BASE_URL}/public/Application/job/${id}`,{

                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })
            console.log("API",response.data);
            return response.data;
        }
        catch(err)
        {
            throw err;
        }
    }
    static async getApplicationByInternshipId(id)
    {
        const token = localStorage.getItem('token');
        try{
            const response = await axios.get(`${ApplicationService.BASE_URL}/public/Application/internship/${id}`,{

                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })
            console.log("API",response.data);
            return response.data;
        }
        catch(err)
        {
            throw err;
        }
    }
   
}

export default ApplicationService;