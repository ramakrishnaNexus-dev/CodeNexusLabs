// src/components/resume/ResumeEducation.tsx

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Education } from '../../types/resume.types';

interface ResumeEducationProps {
  items: Education[];
  onChange: (items: Education[]) => void;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());

export default function ResumeEducation({ items, onChange }: ResumeEducationProps) {
  const [newItem, setNewItem] = useState<Partial<Education>>({
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
  });

  const addItem = () => {
    if (!newItem.institution || !newItem.degree) {
      alert('Please fill in Institution and Degree');
      return;
    }
    const newId = Date.now().toString();
    onChange([...items, { ...newItem as Education, id: newId }]);
    setNewItem({
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
    });
  };

  const updateItem = (id: string, field: keyof Education, value: any) => {
    onChange(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Education</h2>
        <p className="text-gray-500 text-sm mt-1">Add your educational background</p>
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
                  value={item.institution}
                  onChange={(e) => updateItem(item.id, 'institution', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Institution Name *"
                />
                <input
                  type="text"
                  value={item.degree}
                  onChange={(e) => updateItem(item.id, 'degree', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Degree *"
                />
                <input
                  type="text"
                  value={item.fieldOfStudy || ''}
                  onChange={(e) => updateItem(item.id, 'fieldOfStudy', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Field of Study (e.g., Computer Science)"
                />
                <input
                  type="text"
                  value={item.location || ''}
                  onChange={(e) => updateItem(item.id, 'location', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Location"
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
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  value={item.cgpa || ''}
                  onChange={(e) => updateItem(item.id, 'cgpa', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="CGPA / Percentage (Optional - only if 3.0+/60%+)"
                />
              </div>

              <textarea
                value={item.description || ''}
                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Relevant coursework, achievements, activities..."
              />
            </div>
          ))}
        </div>
      )}

      {/* Add New Item Form */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-gray-900 mb-4">Add New Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={newItem.institution}
            onChange={(e) => setNewItem({ ...newItem, institution: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Institution Name *"
          />
          <input
            type="text"
            value={newItem.degree}
            onChange={(e) => setNewItem({ ...newItem, degree: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Degree *"
          />
        </div>
        <button
          onClick={addItem}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Education
        </button>
      </div>
    </div>
  );
}