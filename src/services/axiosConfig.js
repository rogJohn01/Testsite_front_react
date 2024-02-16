
import axios from 'axios';

const API = axios.create({ baseURL: '' });

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
