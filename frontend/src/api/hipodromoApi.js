import axios from "axios";
import { getEnvVariables } from "../helpers";

const {VITE_API_URL} = getEnvVariables()

const hipodromoApi = axios.create({
    baseURL: VITE_API_URL
    // baseURL: 'http://localhost:8080/api'
});

//CONFIGURAR INTERCEPTORES
hipodromoApi.interceptors.request.use(config=>{
    config.headers = {
        ...config.headers,
        // res.header("Access-Control-Allow-Origin", "*");
        'x-token': localStorage.getItem('token')
    }
    return config
})



export default hipodromoApi;