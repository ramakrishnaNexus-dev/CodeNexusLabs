// src/components/resume/ResumeProjects.tsx

import { useState } from 'react';
import { Plus, Trash2, ExternalLink, X } from 'lucide-react';
import type { Project } from '../../types/resume.types';

interface ResumeProjectsProps {
  items: Project[];
  onChange: (items: Project[]) => void;
}

// Helper: Convert comma string to array
const stringToArray = (str: string): string[] => {
  if (!str) return [];
  return str.split(',').map(s => s.trim()).filter(s => s);
};

// Helper: Convert array to comma string for display
const arrayToString = (arr: string[] | undefined): string => {
  if (!arr || arr.length === 0) return '';
  return arr.join(', ');
};

const preWrittenProjects = [
  {
    name: 'E-Commerce Platform',
    description: 'Built a full-stack e-commerce platform with product catalog, shopping cart, user authentication, and payment integration.',
    technologies: 'React, Spring Boot, PostgreSQL, Stripe API, JWT',
  },
  {
    name: 'Task Management App',
    description: 'Developed a task management application with user authentication, real-time updates, drag-and-drop functionality, and task categories.',
    technologies: 'Node.js, Express, MongoDB, Socket.io, React',
  },
  {
    name: 'Portfolio Website',
    description: 'Created a responsive portfolio website showcasing projects and skills with dark/light mode, animations, and contact form.',
    technologies: 'React, Tailwind CSS, Framer Motion, EmailJS',
  },
  {
    name: 'Weather Dashboard',
    description: 'Built a weather dashboard using external API to display current weather, 5-day forecast, and interactive maps.',
    technologies: 'JavaScript, OpenWeather API, Chart.js, Leaflet',
  },
  {
    name: 'Blog Platform',
    description: 'Developed a full-featured blog platform with user authentication, rich text editor, comments, and search functionality.',
    technologies: 'Django, PostgreSQL, Bootstrap, CKEditor',
  },
];

export default function ResumeProjects({ items, onChange }: ResumeProjectsProps) {
  const [newItem, setNewItem] = useState<Partial<Project>>({
    name: '',
    description: '',
    technologies: [],
    achievements: '',
    githubLink: '',
    liveLink: '',
  });
  const [showExamples, setShowExamples] = useState(false);

  const addItem = () => {
    if (!newItem.name) {
      alert('Please enter a project name');
      return;
    }
    const newId = Date.now().toString();
    onChange([...items, { ...newItem as Project, id: newId, technologies: newItem.technologies || [] }]);
    setNewItem({
      name: '',
      description: '',
      technologies: [],
      achievements: '',
      githubLink: '',
      liveLink: '',
    });
  };

  const updateItem = (id: string, field: keyof Project, value: any) => {
    onChange(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const applyExample = (example: typeof preWrittenProjects[0]) => {
    const newId = Date.now().toString();
    onChange([...items, {
      id: newId,
      name: example.name,
      description: example.description,
      technologies: stringToArray(example.technologies),
      achievements: '',
      githubLink: '',
      liveLink: '',
    }]);
    setShowExamples(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-500 text-sm mt-1">Add your personal or academic projects</p>
        </div>
        <button
          onClick={() => setShowExamples(true)}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          View Examples
        </button>
      </div>

      {/* Examples Modal */}
      {showExamples && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold text-lg">Project Examples</h3>
              <button onClick={() => setShowExamples(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh] space-y-3">
              {preWrittenProjects.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => applyExample(example)}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                >
                  <h4 className="font-semibold text-indigo-600 mb-1">{example.name}</h4>
                  <p className="text-sm text-gray-600 mb-1 line-clamp-2">{example.description}</p>
                  <p className="text-xs text-gray-500">Tech: {example.technologies}</p>
                </button>
              ))}
            </div>
            <div className="p-4 border-t bg-gray-50">
              <button
                onClick={() => setShowExamples(false)}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Items */}
      {items.length > 0 && (
        <div className="space-y-6 mb-8">
          {items.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-5 relative bg-gray-50/30">
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
                  placeholder="Project Name *"
                />

                <textarea
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Project description..."
                />

                <input
                  type="text"
                  value={arrayToString(item.technologies)}
                  onChange={(e) => updateItem(item.id, 'technologies', stringToArray(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Technologies used (e.g., React, Spring Boot, MySQL)"
                />

                <textarea
                  value={item.achievements || ''}
                  onChange={(e) => updateItem(item.id, 'achievements', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Key achievements / unique features (Optional)"
                />

                <div className="flex gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-400">🔗</span>
                      <label className="text-xs text-gray-500">GitHub Link</label>
                    </div>
                    <input
                      type="url"
                      value={item.githubLink || ''}
                      onChange={(e) => updateItem(item.id, 'githubLink', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-400">🌐</span>
                      <label className="text-xs text-gray-500">Live Demo Link</label>
                    </div>
                    <input
                      type="url"
                      value={item.liveLink || ''}
                      onChange={(e) => updateItem(item.id, 'liveLink', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="https://yourproject.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Item Form */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-gray-900 mb-4">Add New Project</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Project Name *"
          />
          <textarea
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Project description..."
          />
          <input
            type="text"
            value={arrayToString(newItem.technologies)}
            onChange={(e) => setNewItem({ ...newItem, technologies: stringToArray(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Technologies used (comma-separated)"
          />
        </div>
        <button
          onClick={addItem}
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>
    </div>
  );
}