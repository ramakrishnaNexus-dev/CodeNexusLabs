import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
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

export const interviewAPI = {
  getAllInterviewCourses: () => API.get('/interview/courses'),
  getInterviewCourse: (id: number) => API.get(`/interview/courses/${id}`),
  createInterviewCourse: (d: any) => API.post('/interview/courses', d),
  updateInterviewCourse: (id: number, d: any) => API.put(`/interview/courses/${id}`, d),
  deleteInterviewCourse: (id: number) => API.delete(`/interview/courses/${id}`),
  addInterviewTopic: (courseId: number, d: any) => API.post(`/interview/courses/${courseId}/topics`, d),
  updateInterviewTopic: (topicId: number, d: any) => API.put(`/interview/topics/${topicId}`, d),
  deleteInterviewTopic: (topicId: number) => API.delete(`/interview/topics/${topicId}`),
  uploadLogo: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return API.post('/interview/upload-logo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Resume API endpoints
export const resumeAPI = {
  // Save resume
  saveResume: (data: any) => API.post('/resumes/save', data),

  // Get my resumes
  getMyResumes: () => API.get('/resumes/my'),

  // Get latest resume
  getLatestResume: () => API.get('/resumes/latest'),

  // Delete resume
  deleteResume: (id: number) => API.delete(`/resumes/${id}`),

  // AI Generate Resume
  aiGenerateResume: (answers: Record<string, string>) => API.post('/resumes/ai-generate', answers),

  // AI Optimize Content
  aiOptimize: (content: string, type: string) => API.post('/resumes/ai-optimize', { content, type }),

  // AI LinkedIn Summary
  aiLinkedInSummary: (profile: Record<string, string>) => API.post('/resumes/ai-linkedin', profile),

  // AI Cover Letter
  aiCoverLetter: (details: Record<string, string>) => API.post('/resumes/ai-cover-letter', details),

  // ATS Score Check
  checkATSScore: (content: string, jobTitle: string) => API.post('/resumes/ats-score', { content, jobTitle }),

  // Get ATS Keywords
  getATSKeywords: (jobTitle: string) => API.get(`/resumes/ats-keywords?jobTitle=${encodeURIComponent(jobTitle)}`),

  // Upload existing resume
  uploadResume: (formData: FormData) => {
    return API.post('/resumes/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default API;