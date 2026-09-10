import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor: attach token if stored in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tx_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: handle 401 unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token might be invalid or expired
      // Do not auto-clear if already on login page to allow message display
      if (window.location.pathname !== '/login') {
        localStorage.removeItem('tx_token');
        localStorage.removeItem('tx_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
