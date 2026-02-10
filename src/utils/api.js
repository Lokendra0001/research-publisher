import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3002/api/v1',
    withCredentials: true, // IMPORTANT: Requests cookies to be sent/received
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
