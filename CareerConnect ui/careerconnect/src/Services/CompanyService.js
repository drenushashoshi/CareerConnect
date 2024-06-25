import axios from "axios";


class CompanyService{
    static BASE_URL="http://localhost:8080"
    static parseExpirationTime(expirationTime) {
        const timeUnit = expirationTime.slice(-3);
        const timeValue = parseInt(expirationTime.slice(0, -3), 10);
    
        let expirationDuration = 0;
        switch (timeUnit) {
          case 'Hrs':
            expirationDuration = timeValue * 3600 * 1000;
            break;
          case 'Min':
            expirationDuration = timeValue * 60 * 1000;
            break;
          default:
            throw new Error(`Unknown time unit: ${timeUnit}`);
        }
    
        return new Date().getTime() + expirationDuration;
      }
    
      static async refreshToken() {
        const token = localStorage.getItem('refreshToken');
        if (!token) return null;
    
        try {
          const response = await axios.post(`${CompanyService.BASE_URL}/auth/refresh`, { refreshToken: token });
          const newExpirationTime = CompanyService.parseExpirationTime(response.data.expirationTime);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('tokenExpiry', newExpirationTime);
          return response.data.token;
        } catch (error) {
          console.error('Failed to refresh token:', error);
          return null;
        }
      }
    
      static async getAuthToken() {
        const token = localStorage.getItem('token');
        const tokenExpiry = localStorage.getItem('tokenExpiry');
        if (new Date().getTime() > tokenExpiry) {
          return await CompanyService.refreshToken();
        }
        return token;
      }

      static async login(email, password) {
        try {
          const response = await axios.post(`${CompanyService.BASE_URL}/auth/login`, { email, password });
          const expirationTime = CompanyService.parseExpirationTime(response.data.expirationTime);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem('tokenExpiry', expirationTime);
          localStorage.setItem('role', response.data.role);
          return response.data;
        } catch (err) {
          throw err;
        }
      }
    static async downloadImage(staffId) {
        try {
          const response = await axios.get(`${CompanyService.BASE_URL}/public/downloadImagee/${staffId}`, {
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
    
    static async getAllCompanies(token){
        try{
            const response= await axios.get(`${CompanyService.BASE_URL}/admin/getAllCompanies`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
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
            const response= await axios.delete(`${CompanyService.BASE_URL}/admin/deleteCompany/${id}`, {
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
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenExpiry');
        localStorage.removeItem('id');
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