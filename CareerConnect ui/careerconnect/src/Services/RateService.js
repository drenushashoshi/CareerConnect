import axios from "axios";

class RateService{
    static BASE_URL="http://localhost:8080"

    static async createRate(rateData){
        try{
            const response= await axios.post(`${RateService.BASE_URL}/public/createRate`, rateData)
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getAllRates(token){
        try{
            const response= await axios.get(`${RateService.BASE_URL}/public/getAllRates`)
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async getRateById(id, token){
        try{
            const response= await axios.get(`${RateService.BASE_URL}/admin/getRate/${id}`,{
                headers:{Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async deleteRate(id){
        try{
            const response= await axios.delete(`${RateService.BASE_URL}/public/deleteRate/${id}`)
            return response.data;
        }catch(err){
            throw err;
        }
    }

}
export default RateService;