// src/components/resume/premium/EducationForm.tsx

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../../hooks/useResumeStore';
import type { Education } from '../../../hooks/useResumeStore';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());

export default function EducationForm() {
  const { educations, addEducation, updateEducation, removeEducation } = useResumeStore();

  // Debug: log every time educations changes
  console.log('[EducationForm] educations from store:', educations.length, educations.map(e => ({ id: e.id, institution: e.institution })));

  const [newEdu, setNewEdu] = useState<Partial<Education>>({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    location: '',
    startMonth: 'August',
    startYear: (currentYear - 4).toString(),
    endMonth: 'May',
    endYear: currentYear.toString(),
    cgpa: '',
    description: '',
    id: '',
  });

  const handleAdd = () => {
    if (!newEdu.institution || !newEdu.degree) {
      alert('Please fill in Institution and Degree');
      return;
    }

    // FIX: Use crypto.randomUUID() instead of Date.now().toString()
    // Date.now() can produce duplicate IDs if two items are added
    // within the same millisecond.
    const id = `edu-${crypto.randomUUID()}`;
    console.log('[EducationForm] handleAdd — generating id:', id);
    console.log('[EducationForm] handleAdd — current educations before add:', educations.length);

    const newEducation: Education = {
      id,
      institution: newEdu.institution || '',
      degree: newEdu.degree || '',
      fieldOfStudy: newEdu.fieldOfStudy || '',
      location: newEdu.location || '',
      startMonth: newEdu.startMonth || 'August',
      startYear: newEdu.startYear || (currentYear - 4).toString(),
      endMonth: newEdu.endMonth || 'May',
      endYear: newEdu.endYear || currentYear.toString(),
      cgpa: newEdu.cgpa || '',
      description: newEdu.description || '',
    };

    addEducation(newEducation);

    setNewEdu({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startMonth: 'August',
      startYear: (currentYear - 4).toString(),
      endMonth: 'May',
      endYear: currentYear.toString(),
      cgpa: '',
      description: '',
      id: '',
    });
  };

  const updateItem = (id: string, field: keyof Education, value: string) => {
    // Uses the store's functional updater — always reads CURRENT state.
    updateEducation(id, { [field]: value });
  };

  const removeItem = (id: string) => {
    removeEducation(id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Education</h2>
        <p className="text-sm text-gray-500 mt-1">Add your educational background</p>
      </div>

      {educations.length > 0 && (
        <div className="space-y-5">
          {educations.map((edu, index) => (
            <div key={edu.id} className="border border-gray-200 rounded-lg p-5 bg-gray-50/30 relative">
              <span className="absolute top-3 left-3 text-xs text-gray-400">#{index + 1} · id: {edu.id.slice(0, 12)}</span>
              <button
                onClick={() => removeItem(edu.id)}
                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete education"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateItem(edu.id, 'institution', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Stanford University"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateItem(edu.id, 'degree', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Bachelor of Science, Master of Arts"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study (Optional)</label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy || ''}
                    onChange={(e) => updateItem(edu.id, 'fieldOfStudy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Computer Science, Business Administration"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location (Optional)</label>
                  <input
                    type="text"
                    value={edu.location || ''}
                    onChange={(e) => updateItem(edu.id, 'location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Stanford, CA"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Month</label>
                  <select
                    value={edu.startMonth}
                    onChange={(e) => updateItem(edu.id, 'startMonth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {months.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
                  <select
                    value={edu.startYear}
                    onChange={(e) => updateItem(edu.id, 'startYear', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {years.map((y) => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Month</label>
                  <select
                    value={edu.endMonth}
                    onChange={(e) => updateItem(edu.id, 'endMonth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {months.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Year (Graduation Year)</label>
                  <select
                    value={edu.endYear}
                    onChange={(e) => updateItem(edu.id, 'endYear', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {years.map((y) => <option key={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">CGPA / Percentage (Optional)</label>
                <input
                  type="text"
                  value={edu.cgpa || ''}
                  onChange={(e) => updateItem(edu.id, 'cgpa', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 3.8/4.0, 85%"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information (Optional)</label>
                <textarea
                  value={edu.description || ''}
                  onChange={(e) => updateItem(edu.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Relevant coursework, honors, activities..."
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t pt-6">
        <h3 className="font-semibold text-gray-900 mb-4">Add New Education</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institution <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newEdu.institution}
              onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Stanford University"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Degree <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newEdu.degree}
              onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Bachelor of Science"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study (Optional)</label>
            <input
              type="text"
              value={newEdu.fieldOfStudy || ''}
              onChange={(e) => setNewEdu({ ...newEdu, fieldOfStudy: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Computer Science"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location (Optional)</label>
            <input
              type="text"
              value={newEdu.location || ''}
              onChange={(e) => setNewEdu({ ...newEdu, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Stanford, CA"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Month</label>
            <select
              value={newEdu.startMonth}
              onChange={(e) => setNewEdu({ ...newEdu, startMonth: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {months.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
            <select
              value={newEdu.startYear}
              onChange={(e) => setNewEdu({ ...newEdu, startYear: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Month</label>
            <select
              value={newEdu.endMonth}
              onChange={(e) => setNewEdu({ ...newEdu, endMonth: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {months.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Year (Graduation Year)</label>
            <select
              value={newEdu.endYear}
              onChange={(e) => setNewEdu({ ...newEdu, endYear: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">CGPA / Percentage (Optional)</label>
          <input
            type="text"
            value={newEdu.cgpa || ''}
            onChange={(e) => setNewEdu({ ...newEdu, cgpa: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., 3.8/4.0, 85%"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information (Optional)</label>
          <textarea
            value={newEdu.description}
            onChange={(e) => setNewEdu({ ...newEdu, description: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Relevant coursework, honors, activities..."
          />
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Education
        </button>
      </div>
    </div>
  );
}