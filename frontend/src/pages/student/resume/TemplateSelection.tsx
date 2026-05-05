import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Layout } from 'lucide-react';
import { TEMPLATES } from './ResumeTemplates';
import type { ResumeTemplate } from './ResumeTemplates';
interface Props {
  onSelect: (template: ResumeTemplate) => void;
}

const TemplateSelection = ({ onSelect }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 lg:py-12">
        {/* Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <Link to="/" className="btn-secondary py-1.5 px-3 text-xs">🏠 Home</Link>
          <Link to="/courses" className="btn-secondary py-1.5 px-3 text-xs">📚 Courses</Link>
          <Link to="/student/dashboard" className="btn-secondary py-1.5 px-3 text-xs">📊 Dashboard</Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 rounded-full text-indigo-700 text-xs font-medium mb-3">
            <Layout className="w-3.5 h-3.5" /> Resume Builder
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Choose Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Resume Template</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Select a professional template. You can switch anytime while editing.
          </p>
        </div>

        {/* Template Grid - 4 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => onSelect(tpl)}
              className="group relative bg-white rounded-xl border-2 border-transparent hover:border-indigo-200 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-left"
            >
              {tpl.popular && (
                <span className="absolute -top-2.5 right-3 px-2.5 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold rounded-full shadow">
                  Popular
                </span>
              )}
              {/* Preview */}
              <div 
                className="w-full h-32 rounded-lg mb-4 flex items-center justify-center text-4xl"
                style={{ 
                  background: `linear-gradient(135deg, ${tpl.colors.primary}15, ${tpl.colors.secondary}25)`,
                  border: `2px dashed ${tpl.colors.primary}20`
                }}
              >
                {tpl.preview}
              </div>
              {/* Info */}
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium mb-2"
                style={{ backgroundColor: `${tpl.colors.primary}15`, color: tpl.colors.primary }}>
                {tpl.category}
              </span>
              <h3 className="font-bold text-gray-900 text-sm mb-0.5">{tpl.name}</h3>
              <p className="text-xs text-gray-500">{tpl.description}</p>
              {/* CTA */}
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: tpl.colors.primary }}>
                Use Template <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
          
          {/* More Coming Soon */}
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-5 flex flex-col items-center justify-center text-center hover:border-indigo-300 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-indigo-50 transition-all">
              <Plus className="w-6 h-6 text-gray-300 group-hover:text-indigo-500" />
            </div>
            <h3 className="font-bold text-gray-400 text-sm mb-0.5">More Coming Soon</h3>
            <p className="text-xs text-gray-400">New templates added regularly</p>
          </div>
        </div>

        {/* Tip */}
        <div className="text-center text-xs text-gray-400">
          💡 <strong>Tip:</strong> You can change templates anytime while editing.
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;