// src/components/resume/premium/SummaryForm.tsx

import { useResumeStore } from '../../../hooks/useResumeStore';

export default function SummaryForm() {
  const { summary, setSummary } = useResumeStore();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Professional Summary</h2>
      <p className="text-sm text-gray-500">Write a compelling summary that highlights your key strengths</p>
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={6}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
        placeholder="Highly skilled Software Developer with 5+ years of experience..."
      />
    </div>
  );
}