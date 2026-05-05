import { useState } from 'react';
import { Plus, Search, X, Sparkles, Loader2, Trash2 } from 'lucide-react';
import { ALL_SKILLS } from './ResumeTemplates';
import type { ResumeTemplate } from './ResumeTemplates';

interface ResumeFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  title: string;
  summary: string;
  education: string;
  experience: string;
  languages: string;
  certifications: string;
}

interface Props {
  formData: ResumeFormData;
  setFormData: (data: ResumeFormData) => void;
  skills: string[];
  setSkills: (skills: string[]) => void;
  projects: any[];
  setProjects: (projects: any[]) => void;
  selectedTemplate: ResumeTemplate;
  aiLoading: string | null;
  onAI: (type: string) => void;
}

const ResumeForm = ({ formData, setFormData, skills, setSkills, projects, setProjects, selectedTemplate, aiLoading, onAI }: Props) => {
  const [skillSearch, setSkillSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSkills = ALL_SKILLS.filter(s => 
    s.toLowerCase().includes(skillSearch.toLowerCase()) && !skills.includes(s)
  );

  const addSkill = (skill: string) => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()]);
    }
    setSkillSearch('');
    setShowSuggestions(false);
  };

  const removeSkill = (i: number) => setSkills(skills.filter((_, idx) => idx !== i));

  const addProject = () => setProjects([...projects, { title: '', description: '', tech: '' }]);
  const updateProject = (i: number, field: string, value: string) => {
    const updated: any[] = [...projects];
    updated[i][field] = value;
    setProjects(updated);
  };
  const removeProject = (i: number) => setProjects(projects.filter((_, idx) => idx !== i));

  const update = (field: string, value: string) => setFormData({ ...formData, [field]: value });

  const inputClass = "input-field py-2 text-xs";
  const labelClass = "block text-[11px] font-semibold text-gray-600 mb-1";

  return (
    <div className="p-4 lg:p-5 space-y-4 pb-20">
      
      {/* Personal Info */}
      <div className="card p-4">
        <h2 className="text-sm font-bold text-gray-900 mb-3">👤 Personal Information</h2>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelClass}>Full Name *</label><input className={inputClass} value={formData.fullName} onChange={e => update('fullName', e.target.value)} placeholder="John Doe" /></div>
          <div><label className={labelClass}>Title</label><input className={inputClass} value={formData.title} onChange={e => update('title', e.target.value)} placeholder="Software Engineer" /></div>
          <div><label className={labelClass}>Email *</label><input className={inputClass} value={formData.email} onChange={e => update('email', e.target.value)} /></div>
          <div><label className={labelClass}>Phone</label><input className={inputClass} value={formData.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 9876543210" /></div>
          <div><label className={labelClass}>LinkedIn</label><input className={inputClass} value={formData.linkedin} onChange={e => update('linkedin', e.target.value)} placeholder="linkedin.com/in/..." /></div>
          <div><label className={labelClass}>GitHub</label><input className={inputClass} value={formData.github} onChange={e => update('github', e.target.value)} placeholder="github.com/..." /></div>
        </div>
      </div>

      {/* Summary */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-gray-900">📝 Professional Summary</h2>
          <button onClick={() => onAI('summary')} disabled={aiLoading === 'summary'}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold text-white"
            style={{ backgroundColor: selectedTemplate.colors.primary }}>
            {aiLoading === 'summary' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />} AI
          </button>
        </div>
        <textarea className={inputClass} rows={3} value={formData.summary} onChange={e => update('summary', e.target.value)} placeholder="Click AI or write your summary..." />
      </div>

      {/* Skills */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-gray-900">💻 Technical Skills</h2>
          <button onClick={() => onAI('skills')} disabled={aiLoading === 'skills'}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold text-white"
            style={{ backgroundColor: selectedTemplate.colors.primary }}>
            {aiLoading === 'skills' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />} AI
          </button>
        </div>
        <div className="relative mb-2">
          <div className="flex gap-1.5">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input className="input-field pl-8 py-1.5 text-xs" placeholder="Search skills..." value={skillSearch}
                onChange={e => { setSkillSearch(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill(skillSearch))} />
            </div>
            <button onClick={() => addSkill(skillSearch)} className="btn-primary py-1.5 px-2.5 text-xs"><Plus className="w-3.5 h-3.5" /></button>
          </div>
          {showSuggestions && skillSearch && filteredSkills.length > 0 && (
            <div className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-32 overflow-y-auto">
              {filteredSkills.slice(0, 5).map(skill => (
                <button key={skill} onClick={() => addSkill(skill)} className="w-full text-left px-3 py-1.5 hover:bg-indigo-50 text-xs text-gray-700">{skill}</button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {skills.map((skill, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-medium text-white"
              style={{ backgroundColor: selectedTemplate.colors.primary }}>
              {skill} <button onClick={() => removeSkill(i)} className="hover:opacity-75"><X className="w-2.5 h-2.5" /></button>
            </span>
          ))}
          {skills.length === 0 && <p className="text-xs text-gray-400">No skills added</p>}
        </div>
      </div>

      {/* Experience */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-gray-900">💼 Work Experience</h2>
          <button onClick={() => onAI('experience')} disabled={aiLoading === 'experience'}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold text-white"
            style={{ backgroundColor: selectedTemplate.colors.primary }}>
            {aiLoading === 'experience' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />} AI
          </button>
        </div>
        <textarea className={inputClass} rows={3} value={formData.experience} onChange={e => update('experience', e.target.value)} placeholder="Click AI or enter experience..." />
      </div>

      {/* Education */}
      <div className="card p-4">
        <h2 className="text-sm font-bold text-gray-900 mb-2">🎓 Education</h2>
        <input className={inputClass} value={formData.education} onChange={e => update('education', e.target.value)} placeholder="B.Tech Computer Science, University (2016-2020)" />
      </div>

      {/* Projects */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-gray-900">🚀 Projects</h2>
          <div className="flex gap-1.5">
            <button onClick={() => onAI('project')} disabled={aiLoading === 'project'}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold text-white"
              style={{ backgroundColor: selectedTemplate.colors.primary }}>
              {aiLoading === 'project' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />} AI
            </button>
            <button onClick={addProject} className="btn-secondary py-1 px-2.5 text-xs gap-1"><Plus className="w-3 h-3" /> Add</button>
          </div>
        </div>
        {projects.map((p, i) => (
          <div key={i} className="mb-2 p-3 bg-gray-50 rounded-lg space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-semibold text-gray-500">Project {i + 1}</span>
              {projects.length > 1 && <button onClick={() => removeProject(i)} className="text-red-400 hover:text-red-600"><Trash2 className="w-3 h-3" /></button>}
            </div>
            <input className="input-field py-1.5 text-xs" placeholder="Title" value={p.title} onChange={e => updateProject(i, 'title', e.target.value)} />
            <textarea className="input-field py-1.5 text-xs" rows={1} placeholder="Description" value={p.description} onChange={e => updateProject(i, 'description', e.target.value)} />
            <input className="input-field py-1.5 text-xs" placeholder="Technologies" value={p.tech} onChange={e => updateProject(i, 'tech', e.target.value)} />
          </div>
        ))}
      </div>

      {/* Languages */}
      <div className="card p-4">
        <h2 className="text-sm font-bold text-gray-900 mb-2">🗣️ Languages</h2>
        <input className={inputClass} value={formData.languages} onChange={e => update('languages', e.target.value)} placeholder="English (Fluent), Hindi (Native)" />
      </div>

      {/* Certifications */}
      <div className="card p-4">
        <h2 className="text-sm font-bold text-gray-900 mb-2">📜 Certifications</h2>
        <textarea className={inputClass} rows={2} value={formData.certifications} onChange={e => update('certifications', e.target.value)} placeholder="AWS Certified, Oracle Java Certified" />
      </div>
    </div>
  );
};

export default ResumeForm;