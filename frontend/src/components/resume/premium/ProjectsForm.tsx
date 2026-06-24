// src/components/resume/premium/ProjectsForm.tsx

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../../hooks/useResumeStore';
import type { Project } from '../../../hooks/useResumeStore';

export default function ProjectsForm() {
  const { projects, addProject, updateProject, removeProject } = useResumeStore();

  console.log('[ProjectsForm] projects from store:', projects.length, projects.map(p => ({ id: p.id, name: p.name })));

  const [newProj, setNewProj] = useState<Partial<Project>>({
    name: '',
    description: '',
    technologies: [],
    githubLink: '',
    liveLink: '',
    id: '',
    startDate: '',
    endDate: '',
  });

  const handleAdd = () => {
    if (!newProj.name) return;

    // FIX: crypto.randomUUID instead of Date.now().toString()
   const id = `proj-${crypto.randomUUID()}`;
    console.log('[ProjectsForm] handleAdd — generating id:', id);

    const newProject: Project = {
      id,
      name: newProj.name || '',
      description: newProj.description || '',
      technologies: newProj.technologies || [],
      githubLink: newProj.githubLink || '',
      liveLink: newProj.liveLink || '',
      startDate: newProj.startDate || '',
      endDate: newProj.endDate || '',
    };

    addProject(newProject);

    setNewProj({
      name: '',
      description: '',
      technologies: [],
      githubLink: '',
      liveLink: '',
      id: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Projects</h2>

      {projects.length > 0 && (
        <div className="space-y-4">
          {projects.map((proj, index) => (
            <div key={proj.id} className="border border-gray-100 rounded-lg p-4 bg-gray-50/30">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-gray-700">
                  #{index + 1} · {proj.name}
                  <span className="ml-2 text-xs text-gray-400">id: {proj.id.slice(0, 12)}</span>
                </h3>
                <button onClick={() => removeProject(proj.id)} className="text-red-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                  placeholder="Project Name *"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <textarea
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                  rows={2}
                  placeholder="Description"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
                <input
                  type="text"
                  value={proj.technologies?.join(', ') || ''}
                  onChange={(e) =>
                    updateProject(proj.id, {
                      technologies: e.target.value.split(',').map((t) => t.trim()),
                    })
                  }
                  placeholder="Technologies (comma separated)"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t pt-4">
        <h3 className="font-medium text-gray-700 mb-3">Add New Project</h3>
        <div className="space-y-3">
          <input
            type="text"
            value={newProj.name}
            onChange={(e) => setNewProj({ ...newProj, name: e.target.value })}
            placeholder="Project Name *"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <textarea
            value={newProj.description}
            onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
            rows={2}
            placeholder="Description"
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
          <input
            type="text"
            value={newProj.technologies?.join(', ') || ''}
            onChange={(e) =>
              setNewProj({
                ...newProj,
                technologies: e.target.value.split(',').map((t) => t.trim()),
              })
            }
            placeholder="Technologies (comma separated)"
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-3 w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>
    </div>
  );
}