// src/pages/student/PremiumResume.tsx

import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Download, Printer, ArrowLeft, ArrowRight, Eye, Edit3 } from 'lucide-react';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useResumeStore } from '../../hooks/useResumeStore';

// Template Imports - All 6 Templates
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

// Templates that use a full-height sidebar — need special PDF container handling
const SIDEBAR_TEMPLATES = new Set([2, 6]); // TemplateTwoColumn, TemplateModern

export default function PremiumResume() {
  const { id } = useParams();
  const navigate = useNavigate();
  const previewRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);

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
    resetResume,
  } = useResumeStore();
  console.log("=================================");
console.log("EDUCATIONS COUNT:", educations.length);
console.log("EDUCATIONS DATA:", educations);

console.log("PROJECTS COUNT:", projects.length);
console.log("PROJECTS DATA:", projects);
console.log("=================================");

  // ─── PDF GENERATION ────────────────────────────────────────────
  const handleDownloadPDF = async () => {
    if (!previewRef.current) {
      toast.error('Preview not ready');
      return;
    }

    const toastId = toast.loading('Generating PDF…');

    try {
      const element = previewRef.current;

      // ① Snapshot original inline styles we'll mutate
      const originalStyles = {
        height: element.style.height,
        maxHeight: element.style.maxHeight,
        overflow: element.style.overflow,
        overflowY: element.style.overflowY,
      };

      // ② Expand to full natural height so nothing is clipped
      element.style.height = 'auto';
      element.style.maxHeight = 'none';
      element.style.overflow = 'visible';
      element.style.overflowY = 'visible';

      // For sidebar templates the inner flex div also needs unclamping
      const innerFlex = element.firstElementChild as HTMLElement | null;
      let innerFlexOriginalMinHeight = '';
      if (innerFlex && SIDEBAR_TEMPLATES.has(selectedTemplate)) {
        innerFlexOriginalMinHeight = innerFlex.style.minHeight;
        innerFlex.style.minHeight = 'auto';
      }

      // ③ Allow the browser to reflow fully
      await new Promise((resolve) => setTimeout(resolve, 200));

      // ④ Capture at 2× — sufficient for print quality, half the file size vs 3×
      //    JPEG at 92% quality instead of PNG: ~80-90% smaller files with no visible loss
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      // ⑤ Restore mutated styles
      element.style.height = originalStyles.height;
      element.style.maxHeight = originalStyles.maxHeight;
      element.style.overflow = originalStyles.overflow;
      element.style.overflowY = originalStyles.overflowY;
      if (innerFlex && SIDEBAR_TEMPLATES.has(selectedTemplate)) {
        innerFlex.style.minHeight = innerFlexOriginalMinHeight;
      }

      // ⑥ Build the PDF — A4 page dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const PAGE_W_MM = pdf.internal.pageSize.getWidth();   // 210
      const PAGE_H_MM = pdf.internal.pageSize.getHeight();  // 297

      // How many canvas pixels correspond to one A4 page height
      // canvas.width corresponds to PAGE_W_MM, so:
      //   pixelsPerMM = canvas.width / PAGE_W_MM
      //   pixelsPerPage = pixelsPerMM * PAGE_H_MM
      const pixelsPerMM = canvas.width / PAGE_W_MM;
      const pixelsPerPage = Math.round(pixelsPerMM * PAGE_H_MM);

      const totalPages = Math.ceil(canvas.height / pixelsPerPage);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();

        // Source slice coordinates on the full canvas
        const srcY = page * pixelsPerPage;
        const srcH = Math.min(pixelsPerPage, canvas.height - srcY);

        // Create a page-sized canvas slice
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = srcH;
        const ctx = pageCanvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          ctx.drawImage(
            canvas,
            0, srcY, canvas.width, srcH,
            0, 0,   canvas.width, srcH,
          );
        }

        // JPEG at 92%: dramatically smaller than PNG with no visible quality loss for text
        const sliceDataUrl = pageCanvas.toDataURL('image/jpeg', 0.92);

        // The slice height in mm — last page may be shorter than a full page
        const sliceHeightMM = (srcH / pixelsPerPage) * PAGE_H_MM;

        // Add image anchored at top-left, filling full page width
        // If last page is short, only fill the used portion (rest stays white)
        pdf.addImage(
          sliceDataUrl,
          'JPEG',
          0, 0,
          PAGE_W_MM,
          Math.min(sliceHeightMM, PAGE_H_MM),
        );
      }

      const filename = `${(contactInfo.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`;
      pdf.save(filename);

      toast.dismiss(toastId);
      toast.success(`PDF saved! (${totalPages} page${totalPages > 1 ? 's' : ''})`);
    } catch (error) {
      // Safety: always restore styles even on error
      if (previewRef.current) {
        previewRef.current.style.height = '';
        previewRef.current.style.maxHeight = '';
        previewRef.current.style.overflow = '';
        previewRef.current.style.overflowY = '';
      }
      toast.dismiss(toastId);
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  // ─── PRINT ─────────────────────────────────────────────────────
  const handlePrint = () => {
    window.print();
  };

  // ─── STEP NAVIGATION ───────────────────────────────────────────
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

  const TemplateComponent = templates.find((t) => t.id === selectedTemplate)?.component || TemplateClassic;

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

  // ─── RENDER ────────────────────────────────────────────────────
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

          {/*
            Preview wrapper:
            - overflow visible so html2canvas captures full content
            - minHeight A4 proportions for visual accuracy
            - sidebar templates manage their own padding internally
          */}
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
        /* ── Edit Mode ── */
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Step Progress */}
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

          {/* Form Content */}
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

          {/* Navigation */}
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
