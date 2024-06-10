import axios from "axios";

class CvService {
    static BASE_URL = "http://localhost:8080";
    

    static async createCv(formData,token) {
        try {
            const response = await axios.post(`${CvService.BASE_URL}/employee/createCv`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            return response;
        } catch (error) {
            if (error.response) {
                console.log("Error Response:", error.response.data);
                return error.response;
            } else if (error.request) {
                console.log("Error Request:", error.request);
                throw new Error('No response received from server');
            } else {
                console.log('Error', error.message);
                throw new Error('Error in setting up request: ' + error.message);
            }
        }
    }
    static async downloadImage(cvid) {
        try {
          const response = await axios.get(`${CvService.BASE_URL}/public/downloadImage/${cvid}`, {
            responseType: 'arraybuffer' 
          });
          console.log('Api;',response.data)
          return response.data;
        } catch (err) {
          throw err;
        }
      }

    static async getAllCVs() {
        const response = await axios.get(`${CvService.BASE_URL}/employee/getall`);
        return response.data;
    }

    static async getCVById(id) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${CvService.BASE_URL}/public/Cv/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("API Response:", response.data);  // Log the entire response
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async getCvByEmployeeId(id)
    {
        try
        {
            const response = await axios.get(`${CvService.BASE_URL}/public/Cv/Employee/${id}`);
            console.log("Api Response:",response.data);
            return response.data;
        }catch(error)
        {
            throw null;
        }
    }

    static async updateCv(id, formData, token) {
        try {
            const response = await axios.put(
                `${CvService.BASE_URL}/employee/update/cv/${id}`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log("Update Cv Service:", response.data);
            return response;
        } catch (error) {
            if (error.response) {
                console.log("Error Response:", error.response.data);
                return error.response;
            } else if (error.request) {
                console.log("Error Request:", error.request);
                throw new Error('No response received from server');
            } else {
                console.log('Error', error.message);
                throw new Error('Error in setting up request: ' + error.message);
            }
        }
    }

    static async deleteCv(id) {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${CvService.BASE_URL}/employee/deleteCv/${id}`,
                {
                    headers:{Authorization: `Bearer ${token}`}
                }
            );
            
            return response.data;
        }
        catch(err)
        {
            throw err;
        }
    }
}

export default CvService;
