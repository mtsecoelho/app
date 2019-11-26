import axios from 'axios';

const app = axios.create({
    baseURL: process.env.REACT_APP_DEFAULT_URL,
    timeout: 10000,
    withCredentials: true
})

export default app;