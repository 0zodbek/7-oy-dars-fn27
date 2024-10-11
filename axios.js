import axios from "axios";

const https = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

https.interceptors.request.use(
    config => {
        
        return config;
    }
),
error => {
    return Promise.reject(error);
}

export default https;