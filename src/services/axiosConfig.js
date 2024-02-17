
import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL + ':3006', // Ensure this matches your API's base URL
});
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('accesstoken');
    console.log("token: " , token)
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
        console.log(" req.headers.Authorization: " , req.headers.Authorizatio )
    }
    return req;
});

export default API;
