import axios from 'axios'

const baseUrl =  "http://localhost:8002/api/v1"

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
    timeout: 10000,
});

export default axiosInstance