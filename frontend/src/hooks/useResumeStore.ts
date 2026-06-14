// src/hooks/useResumeStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ============================================
// ALL TYPES EXPORTED - NO RED LINES
// ============================================

export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  linkedin: string;
  github: string;
  website: string;
  title: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isPresent: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  cgpa: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  achievements?: string;
  githubLink: string;
  liveLink: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Basic' | 'Conversational' | 'Professional' | 'Native';
}

// ============================================
// STORE STATE INTERFACE
// ============================================

interface ResumeState {
  // Data
  contactInfo: ContactInfo;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  
  // UI Settings
  selectedTemplate: number;
  resumeTitle: string;
  
  // Actions - Contact
  setContactInfo: (info: Partial<ContactInfo>) => void;
  setSummary: (summary: string) => void;
  
  // Actions - Experience
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperiences: (startIndex: number, endIndex: number) => void;
  
  // Actions - Education
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  
  // Actions - Skills
  addSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;
  
  // Actions - Projects
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  
  // Actions - Settings
  setSelectedTemplate: (templateId: number) => void;
  setResumeTitle: (title: string) => void;
  
  // Actions - Reset & Load
  resetResume: () => void;
  loadResume: (data: Partial<ResumeState>) => void;
}

// ============================================
// DEFAULT STATE
// ============================================

const defaultContactInfo: ContactInfo = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  linkedin: '',
  github: '',
  website: '',
  title: '',
};

// ============================================
// ZUSTAND STORE
// ============================================

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      // Initial State
      contactInfo: defaultContactInfo,
      summary: '',
      experiences: [],
      educations: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
      selectedTemplate: 1,
      resumeTitle: 'My Resume',

      // Contact Actions
      setContactInfo: (info) =>
        set((state) => ({
          contactInfo: { ...state.contactInfo, ...info },
        })),

      setSummary: (summary) => set({ summary }),

      // Experience Actions
      addExperience: (exp) =>
        set((state) => ({
          experiences: [...state.experiences, exp],
        })),

      updateExperience: (id, exp) =>
        set((state) => ({
          experiences: state.experiences.map((e) =>
            e.id === id ? { ...e, ...exp } : e
          ),
        })),

      removeExperience: (id) =>
        set((state) => ({
          experiences: state.experiences.filter((e) => e.id !== id),
        })),

      reorderExperiences: (startIndex, endIndex) =>
        set((state) => {
          const newExperiences = [...state.experiences];
          const [removed] = newExperiences.splice(startIndex, 1);
          newExperiences.splice(endIndex, 0, removed);
          return { experiences: newExperiences };
        }),

      // Education Actions
      addEducation: (edu) =>
        set((state) => ({
          educations: [...state.educations, edu],
        })),

      updateEducation: (id, edu) =>
        set((state) => ({
          educations: state.educations.map((e) =>
            e.id === id ? { ...e, ...edu } : e
          ),
        })),

      removeEducation: (id) =>
        set((state) => ({
          educations: state.educations.filter((e) => e.id !== id),
        })),

      // Skills Actions
      addSkill: (skill) =>
        set((state) => ({
          skills: [...state.skills, skill],
        })),

      removeSkill: (id) =>
        set((state) => ({
          skills: state.skills.filter((s) => s.id !== id),
        })),

      // Projects Actions
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),

      updateProject: (id, project) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...project } : p
          ),
        })),

      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),

      // Settings Actions
      setSelectedTemplate: (templateId) => set({ selectedTemplate: templateId }),
      setResumeTitle: (title) => set({ resumeTitle: title }),

      // Reset
      resetResume: () =>
        set({
          contactInfo: defaultContactInfo,
          summary: '',
          experiences: [],
          educations: [],
          skills: [],
          projects: [],
          certifications: [],
          languages: [],
          selectedTemplate: 1,
          resumeTitle: 'My Resume',
        }),

      loadResume: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),
    }),
    {
      name: 'resume-storage',
    }
  )   
);