// src/components/resume/ResumeSummary.tsx

import { useState } from 'react';
import { Lightbulb, X } from 'lucide-react';

interface ResumeSummaryProps {
  value: string;
  onChange: (value: string) => void;
}

const preWrittenExamples = [
  {
    title: 'Software Developer',
    summary: 'Highly skilled Software Developer with 5+ years of experience in designing, developing, and maintaining enterprise-grade applications. Proficient in Java, Spring Boot, and React. Strong problem-solving abilities and passion for writing clean, efficient code. Proven track record of delivering scalable solutions on time and within budget.',
  },
  {
    title: 'Full Stack Developer',
    summary: 'Results-driven Full Stack Developer with expertise in modern web technologies. Proven track record of delivering scalable applications using React, Node.js, and PostgreSQL. Excellent collaborator with experience in Agile environments. Committed to writing maintainable, well-documented code.',
  },
  {
    title: 'Java Developer',
    summary: 'Experienced Java Developer with deep understanding of object-oriented programming, design patterns, and microservices architecture. Successfully delivered 10+ production applications with high performance and reliability. Strong background in Spring Boot, Hibernate, and RESTful APIs.',
  },
  {
    title: 'Frontend Developer',
    summary: 'Creative Frontend Developer with 4+ years of experience building responsive, user-friendly web applications. Expert in React, TypeScript, and Tailwind CSS. Passionate about creating exceptional user experiences and writing clean, maintainable code.',
  },
  {
    title: 'Fresher / Entry Level',
    summary: 'Motivated Computer Science graduate with strong foundation in programming and web development. Quick learner with excellent problem-solving skills. Completed multiple projects using Java, Python, and React. Seeking opportunities to contribute to innovative projects and grow professionally.',
  },
];

export default function ResumeSummary({ value, onChange }: ResumeSummaryProps) {
  const [showExamples, setShowExamples] = useState(false);

  const applyExample = (summary: string) => {
    onChange(summary);
    setShowExamples(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Professional Summary</h2>
          <p className="text-gray-500 text-sm mt-1">Write a compelling summary that highlights your key strengths</p>
        </div>
        <button
          onClick={() => setShowExamples(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
        >
          <Lightbulb className="w-4 h-4" />
          Pre-written Examples
        </button>
      </div>

      {/* Modal for Examples */}
      {showExamples && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold text-lg">Pre-written Examples</h3>
              <button onClick={() => setShowExamples(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh] space-y-3">
              {preWrittenExamples.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => applyExample(example.summary)}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                >
                  <h4 className="font-semibold text-indigo-600 mb-1">{example.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{example.summary}</p>
                </button>
              ))}
            </div>
            <div className="p-4 border-t bg-gray-50">
              <button
                onClick={() => setShowExamples(false)}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
        placeholder="Example:&#10;Highly skilled Software Developer with 5+ years of experience...&#10;&#10;• Strong background in Java, Spring Boot, and React&#10;• Proven track record of delivering scalable solutions&#10;• Excellent problem-solving and communication skills"
      />

      {/* Tips */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-sm text-gray-700 font-medium mb-2">💡 Tips for a great summary:</p>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Keep it concise (2-4 sentences or 4-6 bullet points)</li>
          <li>Highlight your top skills and years of experience</li>
          <li>Mention your career goals and what you're looking for</li>
          <li>Use action words and quantify achievements when possible</li>
          <li>Tailor the summary to the job you're applying for</li>
        </ul>
      </div>
    </div>
  );
}