// src/components/resume/ResumeSkills.tsx

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Skills } from '../../types/resume.types';

interface ResumeSkillsProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

const preWrittenSkills = [
  'Java', 'Python', 'JavaScript', 'TypeScript', 'React', 'Spring Boot',
  'Node.js', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'SQL', 'MongoDB',
  'Git', 'Agile', 'Scrum', 'REST APIs', 'Microservices', 'CI/CD', 'Jenkins',
  'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Angular', 'Vue.js',
];

export default function ResumeSkills({ data, onChange }: ResumeSkillsProps) {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !data.items.includes(newSkill.trim())) {
      onChange({ ...data, items: [...data.items, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    onChange({ ...data, items: data.items.filter((s) => s !== skill) });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
        <p className="text-gray-500 text-sm mt-1">Showcase your technical and professional skills</p>
      </div>

      {/* Mode Selection */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => onChange({ ...data, mode: 'bullet' })}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            data.mode === 'bullet'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Bullet Mode
        </button>
        <button
          onClick={() => onChange({ ...data, mode: 'classic' })}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            data.mode === 'classic'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Classic Mode (Comma Separated)
        </button>
      </div>

      {/* Skills Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Add Skills</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., Java, Spring Boot, React"
          />
          <button
            onClick={addSkill}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Pre-written Skills Quick Add */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Quick add common skills:</p>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border border-gray-100 rounded-lg">
          {preWrittenSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => {
                if (!data.items.includes(skill)) {
                  onChange({ ...data, items: [...data.items, skill] });
                }
              }}
              className="text-xs bg-gray-100 hover:bg-indigo-100 text-gray-700 px-2.5 py-1 rounded-full transition-colors"
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Display */}
      {data.items.length > 0 && (
        <div className="border-t pt-4">
          <h3 className="font-semibold text-gray-900 mb-3">Your Skills ({data.items.length})</h3>
          {data.mode === 'bullet' ? (
            <div className="flex flex-wrap gap-2">
              {data.items.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                >
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              {data.items.map((skill, idx) => (
                <span key={skill} className="inline-flex items-center gap-1">
                  <span className="text-gray-700">{skill}</span>
                  <button onClick={() => removeSkill(skill)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                  {idx < data.items.length - 1 && <span className="text-gray-400">•</span>}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-sm text-gray-700">
          <strong className="font-semibold">💡 Tip:</strong> List skills that are relevant to the job you're applying for. 
          Include both technical (Java, Python, React) and soft skills (Leadership, Communication, Problem-solving).
        </p>
      </div>
    </div>
  );
}