import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const uploadApi = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Common interceptor for both instances
const addTokenInterceptor = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('uploadApi headers:', config.headers); // Debug log
      } else {
        console.warn('No token found in localStorage for', config.url);
      }
      return config;
    },
    (error) => {
      console.error('Interceptor error:', error);
      return Promise.reject(error);
    }
  );
};

addTokenInterceptor(api);
addTokenInterceptor(uploadApi);

export { uploadApi };
export default api;