import axios from "axios";


class CompanyService{
    static BASE_URL="http://localhost:8080"

    static async login(email, password){
        try{
            const response= await axios.post(`${CompanyService.BASE_URL}/auth/login`,{email, password} )
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async downloadImage(staffId) {
        try {
          const response = await axios.get(`${CompanyService.BASE_URL}/public/downloadImage/${staffId}`, {
           responseType: 'arraybuffer' 
          });
          return response.data;
        } catch (err) {
          throw err;
        }
      }
    
    static async register(companyData){
        try{
            const response= await axios.post(`${CompanyService.BASE_URL}/auth/register`, companyData, )
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async createCompanyStaff(formData, token) {
        try {
            const response = await axios.post(`${CompanyService.BASE_URL}/company/registerStaff`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    
    static async getAllCompanyStaff(companyId){
        try{
            const response= await axios.get(`${CompanyService.BASE_URL}/public/CompanyStaff?companyId=${companyId}`)
            return response.data;
        }catch(err){
            throw err;
        }
    }
    
    static async getAllCompanies(){
        try{
            const response= await axios.get(`${CompanyService.BASE_URL}/public/getAllCompanies`)
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async getProfile(token){
        try{
            const response= await axios.get(`${CompanyService.BASE_URL}/admincompany/getProfile`, {
                headers:{Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async getCompany(id){
        try{
            const response= await axios.get(`${CompanyService.BASE_URL}/public/getCompany/${id}`)
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getStaff(id, token){
        try{
            const response= await axios.get(`${CompanyService.BASE_URL}/company/getStaff/${id}`, {
                headers:{Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async deleteCompany(id, token){
        try{
            const response= await axios.delete(`${CompanyService.BASE_URL}/company/deleteCompany/${id}`, {
                headers:{Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async deleteStaff(id, token){
        try{
            const response= await axios.delete(`${CompanyService.BASE_URL}/company/deleteStaff/${id}`, {
                headers:{Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async updateCompany(id,companyData, token){
        try{
            const response= await axios.put(`${CompanyService.BASE_URL}/company/updateCompany/${id}`, companyData, {
                headers:{Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async updateStaff(id, formData, token) {
        try {
          const response = await axios.put(`${CompanyService.BASE_URL}/company/updateStaff/${id}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });
          return response.data;
        } catch (err) {
          throw err;
        }
      }
      
    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        sessionStorage.clear();
        window.history.pushState(null, '', '/');
    }
    
    static isAuthenticated(){
        const token=localStorage.getItem('token')
        return !!token
    }
    static isAdmin(){
        const role=localStorage.getItem('role')
        return role==='ADMIN'
    }
    static isCompany(){
        const role=localStorage.getItem('role')
        return role==='Company'
    }
    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }


}
export default CompanyService;