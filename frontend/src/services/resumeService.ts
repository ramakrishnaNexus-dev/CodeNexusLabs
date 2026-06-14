// src/services/resumeService.ts

import type { ResumeData, ResumeTemplate, ApiResponse } from '../types/resume.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const resumeService = {
  // Get all templates
  getTemplates: async (): Promise<ApiResponse<ResumeTemplate[]>> => {
    const response = await fetch(`${API_BASE_URL}/resume/templates`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.json();
  },

  // Create new resume
  createResume: async (data: Partial<ResumeData>): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/resume/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Update existing resume
  updateResume: async (resumeId: number, data: Partial<ResumeData>): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/resume/update/${resumeId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Get single resume
  getResume: async (resumeId: number): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/resume/get/${resumeId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.json();
  },

  // Get all resumes for current user
  getAllResumes: async (): Promise<ApiResponse<any[]>> => {
    const response = await fetch(`${API_BASE_URL}/resume/list`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.json();
  },

  // Delete resume
  deleteResume: async (resumeId: number): Promise<ApiResponse<null>> => {
    const response = await fetch(`${API_BASE_URL}/resume/delete/${resumeId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.json();
  },
};