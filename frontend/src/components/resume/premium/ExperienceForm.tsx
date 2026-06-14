// src/components/resume/premium/ExperienceForm.tsx

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../../hooks/useResumeStore';
import type { Experience } from '../../../hooks/useResumeStore';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());

export default function ExperienceForm() {
  const { experiences, addExperience, updateExperience, removeExperience } = useResumeStore();
  
  const [newExp, setNewExp] = useState<Partial<Experience>>({
    jobTitle: '',
    company: '',
    location: '',
    startMonth: 'January',
    startYear: currentYear.toString(),
    endMonth: 'January',
    endYear: currentYear.toString(),
    isPresent: false,
    description: '',
    id: '',
  });

  const handleAdd = () => {
    if (!newExp.jobTitle || !newExp.company) {
      alert('Please fill in Job Title and Company');
      return;
    }
    const id = Date.now().toString();
    addExperience({ ...newExp as Experience, id, description: newExp.description || '' });
    setNewExp({
      jobTitle: '',
      company: '',
      location: '',
      startMonth: 'January',
      startYear: currentYear.toString(),
      endMonth: 'January',
      endYear: currentYear.toString(),
      isPresent: false,
      description: '',
      id: '',
    });
  };

  const updateItem = (id: string, field: keyof Experience, value: any) => {
    // FIX: use the store's own updateExperience action instead of direct setState.
    // Same stale-closure issue as EducationForm — direct setState closes over the
    // `experiences` array snapshot from the last render, which can be outdated.
    // updateExperience(id, partial) always reads the latest store state internally.
    if (field === 'isPresent' && value === true) {
      // When marking as current role, clear end date fields in the same update.
      updateExperience(id, { isPresent: true, endMonth: '', endYear: '' });
    } else {
      updateExperience(id, { [field]: value });
    }
  };

  const removeItem = (id: string) => {
    removeExperience(id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
        <p className="text-sm text-gray-500 mt-1">Add your professional work history</p>
      </div>

      {/* Existing Experience Items */}
      {experiences.length > 0 && (
        <div className="space-y-5">
          {experiences.map((exp) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg p-5 bg-gray-50/30 relative">
              <button
                onClick={() => removeItem(exp.id)}
                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete experience"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => updateItem(exp.id, 'jobTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateItem(exp.id, 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Amazon, Google, Startup"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location (Optional)</label>
                <input
                  type="text"
                  value={exp.location || ''}
                  onChange={(e) => updateItem(exp.id, 'location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., New York, NY / Remote"
                />
              </div>

              {/* Date Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Month</label>
                  <select
                    value={exp.startMonth}
                    onChange={(e) => updateItem(exp.id, 'startMonth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {months.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
                  <select
                    value={exp.startYear}
                    onChange={(e) => updateItem(exp.id, 'startYear', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {years.map((y) => <option key={y}>{y}</option>)}
                  </select>
                </div>
                
                {!exp.isPresent && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Month</label>
                      <select
                        value={exp.endMonth}
                        onChange={(e) => updateItem(exp.id, 'endMonth', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {months.map((m) => <option key={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
                      <select
                        value={exp.endYear}
                        onChange={(e) => updateItem(exp.id, 'endYear', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {years.map((y) => <option key={y}>{y}</option>)}
                      </select>
                    </div>
                  </>
                )}
              </div>

              {/* Current Role Checkbox */}
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  checked={exp.isPresent}
                  onChange={(e) => updateItem(exp.id, 'isPresent', e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-700">
                  I currently work here
                </label>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description / Achievements
                </label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateItem(exp.id, 'description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="• Describe your responsibilities and achievements&#10;• Use bullet points for clarity&#10;• Quantify results when possible (e.g., 'Improved performance by 40%')"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Experience Form */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-gray-900 mb-4">Add New Experience</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newExp.jobTitle}
              onChange={(e) => setNewExp({ ...newExp, jobTitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Senior Software Engineer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newExp.company}
              onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Amazon, Google"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location (Optional)</label>
          <input
            type="text"
            value={newExp.location || ''}
            onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., New York, NY"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Month</label>
            <select
              value={newExp.startMonth}
              onChange={(e) => setNewExp({ ...newExp, startMonth: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {months.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
            <select
              value={newExp.startYear}
              onChange={(e) => setNewExp({ ...newExp, startYear: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Month</label>
            <select
              value={newExp.endMonth}
              onChange={(e) => setNewExp({ ...newExp, endMonth: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={newExp.isPresent}
            >
              {months.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
            <select
              value={newExp.endYear}
              onChange={(e) => setNewExp({ ...newExp, endYear: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={newExp.isPresent}
            >
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="current-new"
            checked={newExp.isPresent}
            onChange={(e) => {
              setNewExp({ ...newExp, isPresent: e.target.checked });
              if (e.target.checked) {
                setNewExp({ ...newExp, isPresent: true, endMonth: '', endYear: '' });
              }
            }}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <label htmlFor="current-new" className="text-sm text-gray-700">
            I currently work here
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description / Achievements</label>
          <textarea
            value={newExp.description}
            onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe your role, responsibilities, and key achievements..."
          />
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </button>
      </div>
    </div>
  );
}