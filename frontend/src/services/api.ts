import axios from 'axios';

const API_BASE_URL = 'https://codenexuslabs-production.up.railway.app/api/v1';

const API = axios.create({ 
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (r) => r.data, 
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (d: any) => API.post('/auth/login', d),
  register: (d: any) => API.post('/auth/register', d),
};

export const catalogAPI = {
  getAllCourses: () => API.get('/courses'),
  getCourse: (id: number) => API.get(`/courses/${id}`),
  getByCategory: (category: string) => API.get(`/courses/category/${category}`),
  createCourse: (d: any) => API.post('/courses', d),
  updateCourse: (id: number, d: any) => API.put(`/courses/${id}`, d),
  deleteCourse: (id: number) => API.delete(`/courses/${id}`),
};

export const adminAPI = {
  getStats: () => API.get('/admin/stats'),
  getUsers: (params?: any) => API.get('/admin/users', { params }),
};

export default API;