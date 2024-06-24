import axios from "axios";

class EmployeeService {
  static BASE_URL = "http://localhost:8080";

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
      const response = await axios.post(`${EmployeeService.BASE_URL}/auth/refreshE`, { refreshToken: token });
      const newExpirationTime = EmployeeService.parseExpirationTime(response.data.expirationTime);
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
      return await EmployeeService.refreshToken();
    }
    return token;
  }

  static async login(email, password) {
    try {
      const response = await axios.post(`${EmployeeService.BASE_URL}/auth/loginE`, { email, password });
      const expirationTime = EmployeeService.parseExpirationTime(response.data.expirationTime);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('tokenExpiry', expirationTime);
      localStorage.setItem('role', response.data.role);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async register(employeeData) {
    try {
      const response = await axios.post(`${EmployeeService.BASE_URL}/public/registerE`, employeeData);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getAllEmployees() {
    try {
      const token = await EmployeeService.getAuthToken();
      const response = await axios.get(`${EmployeeService.BASE_URL}/admin/getAllEmployees`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getProfile() {
    try {
      const token = await EmployeeService.getAuthToken();
      const response = await axios.get(`${EmployeeService.BASE_URL}/employee/getProfile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getEmployeeById(id) {
    try {
      const token = await EmployeeService.getAuthToken();
      const response = await axios.get(`${EmployeeService.BASE_URL}/public/getEmployee/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async deleteEmployee(id) {
    try {
      const token = await EmployeeService.getAuthToken();
      const response = await axios.delete(`${EmployeeService.BASE_URL}/admin/deleteEmployee/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateEmployee(id, employeeData) {
    try {
      const token = await EmployeeService.getAuthToken();
      const response = await axios.put(`${EmployeeService.BASE_URL}/employee/updateEmployee/${id}`, employeeData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('role');
  }

  static isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem('role');
    return role === 'ADMIN';
  }

  static isEmployee() {
    const role = localStorage.getItem('role');
    return role === 'Employee';
  }

  static adminOnly() {
    return this.isAuthenticated() && this.isAdmin();
  }
}

export default EmployeeService;
