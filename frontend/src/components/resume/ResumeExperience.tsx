// src/components/resume/ResumeExperience.tsx

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Experience } from '../../types/resume.types';

interface ResumeExperienceProps {
  items: Experience[];
  onChange: (items: Experience[]) => void;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());

const preWrittenBullets = [
  'Developed and maintained scalable web applications using Java, Spring Boot, and React',
  'Collaborated with cross-functional teams to deliver projects on time and within budget',
  'Improved application performance by 40% through code optimization and caching strategies',
  'Implemented RESTful APIs serving 10,000+ requests daily with 99.9% uptime',
  'Mentored junior developers and conducted code reviews to maintain code quality',
  'Reduced technical debt by refactoring legacy code and implementing design patterns',
  'Led Agile ceremonies including daily stand-ups, sprint planning, and retrospectives',
  'Integrated third-party services and APIs to extend application functionality',
];

export default function ResumeExperience({ items, onChange }: ResumeExperienceProps) {
  const [newItem, setNewItem] = useState<Partial<Experience>>({
    jobTitle: '',
    company: '',
    location: '',
    startMonth: 'January',
    startYear: currentYear.toString(),
    endMonth: 'January',
    endYear: currentYear.toString(),
    isPresent: false,
    description: '',
  });

  const addItem = () => {
    if (!newItem.jobTitle || !newItem.company) {
      alert('Please fill in Job Title and Company');
      return;
    }
    const newId = Date.now().toString();
    onChange([...items, { ...newItem as Experience, id: newId, description: newItem.description || '' }]);
    setNewItem({
      jobTitle: '',
      company: '',
      location: '',
      startMonth: 'January',
      startYear: currentYear.toString(),
      endMonth: 'January',
      endYear: currentYear.toString(),
      isPresent: false,
      description: '',
    });
  };

  const updateItem = (id: string, field: keyof Experience, value: any) => {
    onChange(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const addBulletPoint = (id: string, bullet: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      const newDescription = item.description ? `${item.description}\n• ${bullet}` : `• ${bullet}`;
      updateItem(id, 'description', newDescription);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
        <p className="text-gray-500 text-sm mt-1">Add your professional experience</p>
      </div>

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={item.jobTitle}
                  onChange={(e) => updateItem(item.id, 'jobTitle', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Job Title *"
                />
                <input
                  type="text"
                  value={item.company}
                  onChange={(e) => updateItem(item.id, 'company', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Company *"
                />
                <input
                  type="text"
                  value={item.location || ''}
                  onChange={(e) => updateItem(item.id, 'location', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Location (e.g., New York, NY)"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <select
                  value={item.startMonth}
                  onChange={(e) => updateItem(item.id, 'startMonth', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {months.map((m) => <option key={m}>{m}</option>)}
                </select>
                <select
                  value={item.startYear}
                  onChange={(e) => updateItem(item.id, 'startYear', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {years.map((y) => <option key={y}>{y}</option>)}
                </select>

                {!item.isPresent && (
                  <>
                    <select
                      value={item.endMonth}
                      onChange={(e) => updateItem(item.id, 'endMonth', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {months.map((m) => <option key={m}>{m}</option>)}
                    </select>
                    <select
                      value={item.endYear}
                      onChange={(e) => updateItem(item.id, 'endYear', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {years.map((y) => <option key={y}>{y}</option>)}
                    </select>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={item.isPresent}
                  onChange={(e) => updateItem(item.id, 'isPresent', e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label className="text-sm text-gray-600">I currently work here</label>
              </div>

              <textarea
                value={item.description}
                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe your responsibilities and achievements..."
              />

              {/* Pre-written bullets */}
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Quick add bullet points:</p>
                <div className="flex flex-wrap gap-2">
                  {preWrittenBullets.slice(0, 4).map((bullet, idx) => (
                    <button
                      key={idx}
                      onClick={() => addBulletPoint(item.id, bullet)}
                      className="text-xs bg-gray-100 hover:bg-indigo-100 text-gray-700 px-2 py-1 rounded-full transition-colors"
                    >
                      + {bullet.substring(0, 40)}...
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Item Form */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-gray-900 mb-4">Add New Experience</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={newItem.jobTitle}
            onChange={(e) => setNewItem({ ...newItem, jobTitle: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Job Title *"
          />
          <input
            type="text"
            value={newItem.company}
            onChange={(e) => setNewItem({ ...newItem, company: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Company *"
          />
        </div>
        <button
          onClick={addItem}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </button>
      </div>
    </div>
  );
}