import axios from "axios";


class EmployeeService{
    static BASE_URL="http://localhost:8080"

    static async login(email, password){
        try{
            const response= await axios.post(`${EmployeeService.BASE_URL}/auth/loginE`,{email, password} )
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async register(employeeData){
        try{
            const response= await axios.post(`${EmployeeService.BASE_URL}/public/registerE`, employeeData, )
            return response.data;
        }catch(err){
            throw err;
        }
    }
    
    
    static async getAllEmployees(){
        try{
            const response= await axios.get(`${EmployeeService.BASE_URL}/public/getAllEmployees`)
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async getProfile(token){
        try{
            const response= await axios.get(`${EmployeeService.BASE_URL}/employee/getProfile`, {
                headers:{Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async getEmployeeById(id, token){
        try{
            const response= await axios.get(`${EmployeeService.BASE_URL}/public/getEmployee/${id}`)
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async deleteEmployee(id, token){
        try{
            const response= await axios.delete(`${EmployeeService.BASE_URL}/employee/deleteEmployee/${id}`, {
                headers:{Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async updateEmployee(id,employeeData, token){
        try{
            const response= await axios.put(`${EmployeeService.BASE_URL}/employee/updateEmployee/${id}`, employeeData, {
                headers:{Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    
    }
    static isAuthenticated(){
        const token=localStorage.getItem('token')
        return !!token
    }
    static isAdmin(){
        const role=localStorage.getItem('role')
        return role==='ADMIN'
    }
    static isEmployee(){
        const role=localStorage.getItem('role')
        return role==='Employee'
    }
    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }


}
export default EmployeeService;