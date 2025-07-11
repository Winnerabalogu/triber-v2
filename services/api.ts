import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v2',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

api.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data && error.response.data.detail) {
      const errorDetails = error.response.data.detail;
      const errorMessage = Array.isArray(errorDetails)
        ? errorDetails.map(e => e.msg).join(', ')
        : "An unknown validation error occurred.";
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.reject(new Error(error.message || 'An unknown server error occurred.'));
  }
);

export default api;