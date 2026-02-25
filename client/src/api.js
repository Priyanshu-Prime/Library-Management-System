import axios from 'axios';

const PORT = import.meta.env.VITE_ADDRESS;

const api = axios.create({
  baseURL: `http://${PORT}/api`,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
