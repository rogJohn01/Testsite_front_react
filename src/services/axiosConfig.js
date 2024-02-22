
import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL + ':3006',
    withCredentials: true, // Send cookies with requests
});

// Request interceptor to add the auth token
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('accesstoken');
    console.log("token: " , token)
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
        console.log(" req.headers.Authorization: " , req.headers.Authorizatio )
    }
    return req;
});


// Response interceptor for handling 401 Unauthorized responses
API.interceptors.response.use(
    response => response,
    async (error) => {
        // First, check if the error has a response object
        if (!error.response) {
            // Handle errors without a response (e.g., network errors, CORS issues, etc.)
            console.error("Network error or no response received:", error);
            return Promise.reject(error);
        }

        const originalRequest = error.config;
        // Check if it's a refresh token request to prevent infinite loop
        if (error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/login/refresh_token')) {
            originalRequest._retry = true;
            try {
                const response = await API.post('/login/refresh_token', {}, { withCredentials: true });
                const { accessToken } = response.data;
                localStorage.setItem('accesstoken', accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return API(originalRequest);
            } catch (refreshError) {
                console.log("Failed to refresh token:", refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);






export default API;
