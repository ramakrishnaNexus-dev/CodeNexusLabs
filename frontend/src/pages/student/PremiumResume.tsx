// src/pages/student/PremiumResume.tsx

import { useState, useRef, useEffect } from 'react';  // ← added useEffect
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Download, Printer, ArrowLeft, ArrowRight, Eye, Edit3 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useResumeStore } from '../../hooks/useResumeStore';
import { generateResumePDF } from '../../utils/generateResumePDF';

// Template Imports
import TemplateClassic from '../../components/resume/premium/TemplateClassic';
import TemplateTwoColumn from '../../components/resume/premium/TemplateTwoColumn';
import TemplateExecutive from '../../components/resume/premium/TemplateExecutive';
import TemplateTech from '../../components/resume/premium/TemplateTech';
import TemplateElegant from '../../components/resume/premium/TemplateElegant';
import TemplateModern from '../../components/resume/premium/TemplateModern';

// Form Imports
import ContactInfoForm from '../../components/resume/premium/ContactInfoForm';
import SummaryForm from '../../components/resume/premium/SummaryForm';
import ExperienceForm from '../../components/resume/premium/ExperienceForm';
import EducationForm from '../../components/resume/premium/EducationForm';
import SkillsForm from '../../components/resume/premium/SkillsForm';
import ProjectsForm from '../../components/resume/premium/ProjectsForm';

const steps = [
  { id: 'contact', name: 'Contact', icon: '📝' },
  { id: 'summary', name: 'Summary', icon: '✍️' },
  { id: 'experience', name: 'Experience', icon: '💼' },
  { id: 'education', name: 'Education', icon: '🎓' },
  { id: 'skills', name: 'Skills', icon: '⚡' },
  { id: 'projects', name: 'Projects', icon: '🚀' },
];

const templates = [
  { id: 1, name: 'Classic', component: TemplateClassic, category: 'ATS Friendly' },
  { id: 2, name: 'Two Column', component: TemplateTwoColumn, category: 'Modern' },
  { id: 3, name: 'Executive', component: TemplateExecutive, category: 'Executive' },
  { id: 4, name: 'Tech', component: TemplateTech, category: 'Developer' },
  { id: 5, name: 'Elegant', component: TemplateElegant, category: 'Professional' },
  { id: 6, name: 'Modern', component: TemplateModern, category: 'Creative' },
];

const SIDEBAR_TEMPLATES = new Set([2, 6]);

export default function PremiumResume() {
  const { id } = useParams();
  const navigate = useNavigate();
  const previewRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);

  // FIX: Removed resetResume from destructuring — it was dead code
  // that could mask accidental calls from other components.
  const {
    contactInfo,
    summary,
    experiences,
    educations,
    skills,
    projects,
    selectedTemplate,
    resumeTitle,
    setResumeTitle,
    setSelectedTemplate,
  } = useResumeStore();

  // ─── DEBUG: Subscribe to ALL store changes ───────────────────
  // This effect runs once on mount and logs every store change.
  useEffect(() => {
    const unsub = useResumeStore.subscribe((state, prevState) => {
      if (state.educations.length !== prevState.educations.length) {
        console.log(
          '[PremiumResume SUBSCRIBE] educations changed:',
          prevState.educations.length, '→', state.educations.length,
          '\n  prev IDs:', prevState.educations.map(e => e.id),
          '\n  new IDs:', state.educations.map(e => e.id),
        );
      }
      if (state.experiences.length !== prevState.experiences.length) {
        console.log(
          '[PremiumResume SUBSCRIBE] experiences changed:',
          prevState.experiences.length, '→', state.experiences.length,
        );
      }
      if (state.projects.length !== prevState.projects.length) {
        console.log(
          '[PremiumResume SUBSCRIBE] projects changed:',
          prevState.projects.length, '→', state.projects.length,
        );
      }
    });
    return () => unsub();
  }, []);

  // ─── DEBUG: Log on every render ──────────────────────────────
  console.log('═══════════════════════════════════════');
  console.log('[PremiumResume RENDER] step:', steps[currentStep].id);
  console.log('[PremiumResume RENDER] EDUCATIONS COUNT:', educations.length, educations.map(e => ({ id: e.id, inst: e.institution })));
  console.log('[PremiumResume RENDER] EXPERIENCES COUNT:', experiences.length, experiences.map(e => ({ id: e.id, title: e.jobTitle })));
  console.log('[PremiumResume RENDER] PROJECTS COUNT:', projects.length, projects.map(p => ({ id: p.id, name: p.name })));
  console.log('═══════════════════════════════════════');

  const handleDownloadPDF = async () => {
    const toastId = toast.loading('Generating PDF…');
    try {
      const filename = `${(contactInfo.fullName || 'Resume').replace(/\s+/g, '_')}_Resume`;
      await generateResumePDF(
        {
          contactInfo,
          summary,
          experiences,
          educations,
          skills,
          projects,
          selectedTemplate,
        },
        filename,
      );
      toast.dismiss(toastId);
      toast.success('PDF downloaded!');
    } catch (error) {
      toast.dismiss(toastId);
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      setIsPreviewMode(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else if (isPreviewMode) {
      setIsPreviewMode(false);
      setCurrentStep(steps.length - 1);
    }
  };

  const TemplateComponent =
    templates.find((t) => t.id === selectedTemplate)?.component || TemplateClassic;

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case 'contact':    return <ContactInfoForm />;
      case 'summary':    return <SummaryForm />;
      case 'experience': return <ExperienceForm />;
      case 'education':  return <EducationForm />;
      case 'skills':     return <SkillsForm />;
      case 'projects':   return <ProjectsForm />;
      default:           return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Top Bar ── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <button
            onClick={() => navigate('/student/dashboard')}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </button>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-48"
              placeholder="Resume Title"
            />

            <div className="hidden md:flex gap-1 bg-gray-100 rounded-lg p-1">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    selectedTemplate === t.id
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title={t.category}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Preview Mode ── */}
      {isPreviewMode ? (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-end gap-3 mb-4">
            <button
              onClick={() => setIsPreviewMode(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>

          <div
            ref={previewRef}
            className="bg-white rounded-xl shadow-xl"
            style={{
              overflow: 'visible',
              minHeight: '297mm',
              padding: SIDEBAR_TEMPLATES.has(selectedTemplate) ? '0' : '24px',
            }}
          >
            <TemplateComponent
              contactInfo={contactInfo}
              summary={summary}
              experiences={experiences}
              educations={educations}
              skills={skills}
              projects={projects}
            />
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  currentStep === index ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-500'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    currentStep === index ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {step.icon}
                </div>
                <span className="text-xs hidden sm:block">{step.name}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium flex items-center gap-2 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={handleNext}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center gap-2 transition"
            >
              {currentStep === steps.length - 1 ? (
                <>Preview <Eye className="w-4 h-4" /></>
              ) : (
                <>Next <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}