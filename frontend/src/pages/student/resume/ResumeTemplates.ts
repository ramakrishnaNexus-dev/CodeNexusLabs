// ============================================================
// SKILLS DATABASE
// ============================================================
export const ALL_SKILLS = [
  'Java', 'JavaScript', 'TypeScript', 'Python', 'C++', 'C#', 'Ruby', 'Go', 'Rust', 'PHP',
  'React', 'Angular', 'Vue.js', 'Next.js', 'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot',
  'HTML', 'CSS', 'SASS', 'Tailwind CSS', 'Bootstrap', 'Material UI',
  'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Redis',
  'Git', 'GitHub', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
  'REST API', 'GraphQL', 'Microservices', 'Agile', 'Scrum', 'JIRA',
  'Machine Learning', 'Data Science', 'AI', 'TensorFlow', 'PyTorch',
  'Selenium', 'JUnit', 'TestNG', 'Cypress', 'Playwright', 'Postman',
  'ETL Testing', 'Data Migration', 'Informatica', 'Databricks', 'SSIS', 'Azure Data Factory',
  'Manual Testing', 'Automation Testing', 'Performance Testing', 'Security Testing',
  'Tableau', 'Power BI', 'Excel', 'Data Analysis', 'Data Warehousing',
  'Linux', 'Unix', 'Shell Scripting', 'PowerShell',
  'Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Sketch',
];

// ============================================================
// RESUME TEMPLATES
// ============================================================
export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  layout: 'two-column' | 'single-column' | 'europass';
  colors: {
    primary: string;
    secondary: string;
    sidebar: string;
    sidebarText: string;
    accent: string;
    bg: string;
    text: string;
    heading: string;
  };
  preview: string;
  popular?: boolean;
}

export const TEMPLATES: ResumeTemplate[] = [
  {
    id: 'modern-2col', name: 'Modern Two-Column',
    description: 'Professional sidebar layout with skills & contact',
    category: 'Professional', layout: 'two-column',
    colors: { primary: '#4f46e5', secondary: '#6366f1', sidebar: '#1e1b4b', sidebarText: '#c7d2fe', accent: '#818cf8', bg: '#ffffff', text: '#1f2937', heading: '#4f46e5' },
    preview: '📊', popular: true,
  },
  {
    id: 'ats-single', name: 'ATS-Friendly',
    description: 'Clean single column, optimized for ATS systems',
    category: 'Professional', layout: 'single-column',
    colors: { primary: '#1f2937', secondary: '#374151', heading: '#111827', accent: '#1f2937', bg: '#ffffff', text: '#374151', sidebar: '#ffffff', sidebarText: '#374151' },
    preview: '📄',
  },
  {
    id: 'creative-color', name: 'Creative Modern',
    description: 'Bold colorful design with modern cards',
    category: 'Creative', layout: 'single-column',
    colors: { primary: '#0891b2', secondary: '#06b6d4', heading: '#0e7490', accent: '#22d3ee', bg: '#ffffff', text: '#334155', sidebar: '#ffffff', sidebarText: '#334155' },
    preview: '🎨', popular: true,
  },
  {
    id: 'europass', name: 'Europass EU Format',
    description: 'Official European CV standard layout',
    category: 'Standard', layout: 'europass',
    colors: { primary: '#1e40af', secondary: '#3b82f6', heading: '#1e3a8a', accent: '#2563eb', bg: '#ffffff', text: '#1e293b', sidebar: '#f8fafc', sidebarText: '#1e293b' },
    preview: '🇪🇺',
  },
  {
    id: 'minimal-dark', name: 'Minimal Dark',
    description: 'Elegant grayscale for tech roles',
    category: 'Modern', layout: 'single-column',
    colors: { primary: '#374151', secondary: '#4b5563', heading: '#1f2937', accent: '#6b7280', bg: '#ffffff', text: '#374151', sidebar: '#f9fafb', sidebarText: '#374151' },
    preview: '📓',
  },
];

// ============================================================
// AI GENERATION FUNCTIONS
// ============================================================
export const generateAISummary = (skills: string[], role: string, experience: string): string => {
  const roleText = role || 'Software Professional';
  const skillText = skills.slice(0, 5).join(', ');
  const expText = experience || 'several years';
  return `Results-driven ${roleText} with ${expText} of experience in ${skillText}. Proven track record of delivering high-quality solutions that drive business growth. Skilled in collaborating with cross-functional teams and passionate about leveraging cutting-edge technologies.`;
};

export const generateAISkills = (existingSkills: string[], role: string): string[] => {
  const suggestions: Record<string, string[]> = {
    'java': ['Spring Boot', 'Hibernate', 'Microservices'],
    'python': ['Django', 'Flask', 'FastAPI'],
    'react': ['Next.js', 'Redux', 'TypeScript'],
    'sql': ['PostgreSQL', 'Query Optimization'],
    'default': ['Git', 'Agile', 'JIRA', 'Communication'],
  };
  let suggested: string[] = [];
  const lowerSkills = existingSkills.map(s => s.toLowerCase());
  Object.entries(suggestions).forEach(([key, skills]) => {
    if (lowerSkills.some(s => s.includes(key))) {
      skills.forEach(skill => { if (!lowerSkills.includes(skill.toLowerCase())) suggested.push(skill); });
    }
  });
  if (suggested.length < 3) suggested = [...suggested, ...suggestions['default']];
  return [...new Set(suggested)].slice(0, 6);
};

export const generateAIProject = (skills: string[], role: string) => ({
  title: `${role || 'Software'} Management System`,
  description: `Designed and developed a comprehensive solution using ${skills.slice(0, 3).join(', ')}. Implemented automated workflows reducing manual effort by 40%.`,
  tech: skills.slice(0, 4).join(', '),
});

export const generateAIExperience = (role: string): string => {
  return `Senior ${role || 'Software Professional'}\nTech Company | 2020 - Present\n• Designed and implemented scalable solutions\n• Led a team of engineers, improving delivery time by 30%\n• Mentored junior developers and conducted code reviews`;
};