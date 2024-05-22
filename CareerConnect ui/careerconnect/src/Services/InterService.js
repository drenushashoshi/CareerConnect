import axios from "axios";


class CompanyService{
    static BASE_URL="http://localhost:8080"

    
    static async createInternship(InternshipData, token){
        try{
            const response= await axios.post(`${CompanyService.BASE_URL}/company/createInternship`, InternshipData, {
                headers:{Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async getAllCompanyInternships(companyId){
        try{
            const response= await axios.get(`${CompanyService.BASE_URL}/public/companyInternships?companyId=${companyId}`)
            return response.data;
        }catch(err){
            throw err;
        }
    }
    
    static async getAllInternships(){
        try{
            const response= await axios.get(`${CompanyService.BASE_URL}/public/readInternships`)
            return response.data;
        }catch(err){
            throw err;
        }
    }
    
    static async getInternshipById(id){
        try{
            const response= await axios.get(`${CompanyService.BASE_URL}/public/readInternship/${id}`)
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async deleteInternship(id, token){
        try{
            const response= await axios.delete(`${CompanyService.BASE_URL}/company/deleteInternship/${id}`, {
                headers:{Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async updateInternship(id,internshipData, token){
        try{
            const response= await axios.put(`${CompanyService.BASE_URL}/company/updateInternship/${id}`, internshipData, {
                headers:{Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async searchInternships(query, Industria, location) {
        try {
            const response = await axios.get(`${CompanyService.BASE_URL}/public/search`, {
                params: { query, Industria, location }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }


}
export default CompanyService;