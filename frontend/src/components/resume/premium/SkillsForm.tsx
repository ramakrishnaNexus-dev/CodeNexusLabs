// src/components/resume/premium/SkillsForm.tsx

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useResumeStore } from '../../../hooks/useResumeStore';
import type { Skill } from '../../../hooks/useResumeStore';

const suggestedSkills = ['Java', 'Python', 'JavaScript', 'React', 'Spring Boot', 'Node.js', 'TypeScript', 'SQL', 'AWS', 'Docker', 'Kubernetes', 'Git', 'Agile', 'Scrum', 'REST APIs', 'HTML5', 'CSS3', 'Tailwind CSS', 'MongoDB', 'PostgreSQL'];

export default function SkillsForm() {
  const { skills, addSkill, removeSkill } = useResumeStore();
  const [newSkill, setNewSkill] = useState('');

  const handleAdd = () => {
    if (newSkill.trim() && !skills.find(s => s.name.toLowerCase() === newSkill.toLowerCase())) {
      addSkill({ id: Date.now().toString(), name: newSkill.trim(), category: '' });
      setNewSkill('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
      <p className="text-sm text-gray-500">Add your technical and professional skills</p>

      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., Java, React, AWS"
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button onClick={handleAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-lg transition">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestedSkills.map((skill) => (
          <button
            key={skill}
            onClick={() => !skills.find(s => s.name === skill) && addSkill({ id: Date.now().toString() + skill, name: skill, category: '' })}
            className="text-xs bg-gray-100 hover:bg-indigo-100 text-gray-600 px-2.5 py-1 rounded-full transition"
          >
            + {skill}
          </button>
        ))}
      </div>

      {skills.length > 0 && (
        <div className="border-t pt-4">
          <h3 className="font-semibold text-gray-700 mb-3">Your Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                {skill.name}
                <button onClick={() => removeSkill(skill.id)} className="hover:text-red-500 ml-1"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}