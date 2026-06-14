// src/components/resume/premium/ContactInfoForm.tsx

import { useResumeStore } from '../../../hooks/useResumeStore';

export default function ContactInfoForm() {
  const { contactInfo, setContactInfo } = useResumeStore();

  const updateField = (field: keyof typeof contactInfo, value: string) => {
    setContactInfo({ [field]: value });
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
      <p className="text-sm text-gray-500">How would you like employers to contact you?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" value={contactInfo.fullName} onChange={(e) => updateField('fullName', e.target.value)} placeholder="Full Name *" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input type="text" value={contactInfo.title} onChange={(e) => updateField('title', e.target.value)} placeholder="Professional Title" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input type="email" value={contactInfo.email} onChange={(e) => updateField('email', e.target.value)} placeholder="Email *" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input type="tel" value={contactInfo.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="Phone" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input type="text" value={contactInfo.city} onChange={(e) => updateField('city', e.target.value)} placeholder="City" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input type="text" value={contactInfo.state} onChange={(e) => updateField('state', e.target.value)} placeholder="State" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input type="url" value={contactInfo.linkedin} onChange={(e) => updateField('linkedin', e.target.value)} placeholder="LinkedIn URL" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input type="url" value={contactInfo.github} onChange={(e) => updateField('github', e.target.value)} placeholder="GitHub URL" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input type="url" value={contactInfo.website} onChange={(e) => updateField('website', e.target.value)} placeholder="Website URL" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      </div>
    </div>
  );
}