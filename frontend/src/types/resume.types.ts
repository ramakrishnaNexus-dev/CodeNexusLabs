// src/types/resume.types.ts

export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  title?: string; // professional title / headline
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location?: string;
  startMonth: string;
  startYear: string;
  endMonth?: string;
  endYear?: string;
  isPresent: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  location?: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  cgpa?: string;
  description?: string;
}

export interface Skills {
  items: string[];
  mode: 'bullet' | 'classic';
  categories?: { name: string; items: string[] }[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  // FIX: was `string` — every template and form treats this as string[]
  technologies: string[];
  achievements?: string;
  githubLink?: string;
  liveLink?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Basic' | 'Conversational' | 'Professional' | 'Native';
}

export interface Achievement {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: string[];
}

export interface ResumeData {
  id?: number;
  title: string;
  templateId: number;
  contactInfo: ContactInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  projects: Project[];
  certifications?: Certification[];
  languages?: Language[];
  achievements?: Achievement[]
  customSections?: CustomSection[];
}

export interface ResumeTemplate {
  id: number;
  name: string;
  category: string;
  thumbnailUrl: string;
  htmlTemplate: string;
  cssStyles: string;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}
