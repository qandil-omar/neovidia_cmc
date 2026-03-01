import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  timeout: 5000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('neovidia_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('neovidia_token');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
