// src/components/resume/ResumeTemplates.tsx

import { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { resumeService } from '../../services/resumeService';
import type { ResumeTemplate } from '../../types/resume.types';

interface ResumeTemplatesProps {
  selectedTemplate: number;
  onSelect: (templateId: number) => void;
}

const fallbackTemplates: ResumeTemplate[] = [
  { id: 1, name: 'Classic Blue', category: 'Professional', thumbnailUrl: '', htmlTemplate: '', cssStyles: '' },
  { id: 2, name: 'Modern Green', category: 'Creative', thumbnailUrl: '', htmlTemplate: '', cssStyles: '' },
  { id: 3, name: 'Minimal Gray', category: 'Minimal', thumbnailUrl: '', htmlTemplate: '', cssStyles: '' },
  { id: 4, name: 'Professional Navy', category: 'Professional', thumbnailUrl: '', htmlTemplate: '', cssStyles: '' },
  { id: 5, name: 'Academic Crimson', category: 'Academic', thumbnailUrl: '', htmlTemplate: '', cssStyles: '' },
  { id: 6, name: 'Executive Gold', category: 'Executive', thumbnailUrl: '', htmlTemplate: '', cssStyles: '' },
  { id: 7, name: 'Creative Purple', category: 'Creative', thumbnailUrl: '', htmlTemplate: '', cssStyles: '' },
  { id: 8, name: 'Tech Developer', category: 'Technical', thumbnailUrl: '', htmlTemplate: '', cssStyles: '' },
];

export default function ResumeTemplates({ selectedTemplate, onSelect }: ResumeTemplatesProps) {
  const [templates, setTemplates] = useState<ResumeTemplate[]>(fallbackTemplates);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await resumeService.getTemplates();
        if (response.status === 'success' && response.data.length > 0) {
          setTemplates(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch templates:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
        <p className="text-gray-500 text-sm mt-1">Select a professional resume template to get started</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              selectedTemplate === template.id
                ? 'border-indigo-600 shadow-lg ring-2 ring-indigo-200'
                : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
            }`}
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="w-14 h-14 mx-auto bg-white rounded-xl shadow-md flex items-center justify-center mb-3">
                  <span className="text-3xl">
                    {template.id === 1 && '📄'}
                    {template.id === 2 && '✨'}
                    {template.id === 3 && '◻️'}
                    {template.id === 4 && '📋'}
                    {template.id === 5 && '🎓'}
                    {template.id === 6 && '👔'}
                    {template.id === 7 && '🎨'}
                    {template.id === 8 && '💻'}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">{template.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{template.category}</p>
              </div>
            </div>
            {selectedTemplate === template.id && (
              <div className="absolute top-3 right-3 bg-indigo-600 rounded-full p-1.5 shadow-lg">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}