import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, Code, BookOpen, Sparkles } from 'lucide-react';
import axios from 'axios';

const InterviewPrep = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/interview/questions')
      .then((res: any) => {
        const data = res.data || [];
        setQuestions(Array.isArray(data) ? data : []);
      })
      .catch(() => {});
  }, []);

  const allCategories = ['All', ...new Set(questions.map(q => q.category).filter(Boolean))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filtered = questions.filter(q => {
    const mSearch = q.question?.toLowerCase().includes(search.toLowerCase());
    const mCat = category === 'All' || q.category === category;
    const mDiff = difficulty === 'All' || q.difficulty === difficulty;
    return mSearch && mCat && mDiff;
  });

  const diffColors: Record<string, string> = {
    Easy: 'bg-emerald-100 text-emerald-700',
    Medium: 'bg-amber-100 text-amber-700',
    Hard: 'bg-rose-100 text-rose-700',
  };

  const categoryColors: Record<string, string> = {
    'Java': 'bg-orange-100 text-orange-700',
    'React': 'bg-cyan-100 text-cyan-700',
    'Spring Boot': 'bg-green-100 text-green-700',
    'JavaScript': 'bg-yellow-100 text-yellow-700',
    'Python': 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-8 lg:py-10">
        
        {/* Navigation */}
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="btn-secondary py-1.5 px-3 text-xs">🏠 Home</Link>
          <Link to="/courses" className="btn-secondary py-1.5 px-3 text-xs">📚 Courses</Link>
          <Link to="/student/dashboard" className="btn-secondary py-1.5 px-3 text-xs">📊 Dashboard</Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 rounded-full text-indigo-700 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Interview Prep
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Interview Preparation</h1>
          <p className="text-gray-500 text-sm">{questions.length} questions available</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
            <input type="text" placeholder="Search questions..." value={search}
              onChange={e => setSearch(e.target.value)} className="input-field pl-9 text-sm border-indigo-100 focus:border-indigo-400" />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)} className="input-field w-auto text-sm py-2">
            {allCategories.map(c => <option key={c} value={c}>{c === 'All' ? '📂 All Categories' : c}</option>)}
          </select>
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="input-field w-auto text-sm py-2">
            {difficulties.map(d => <option key={d} value={d}>{d === 'All' ? '📊 All Levels' : d}</option>)}
          </select>
        </div>

        {/* Questions List */}
        <div className="space-y-3">
          {filtered.map(q => (
            <div key={q.id} className="card overflow-hidden hover:shadow-md transition-all">
              <button onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors text-left">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <Code className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${categoryColors[q.category] || 'bg-gray-100 text-gray-600'}`}>
                        {q.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${diffColors[q.difficulty] || 'bg-gray-100 text-gray-600'}`}>
                        {q.difficulty}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 text-sm truncate">{q.question}</p>
                  </div>
                </div>
                {expandedId === q.id ? 
                  <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 ml-3" /> : 
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-3" />}
              </button>
              
              {expandedId === q.id && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="mt-3 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-emerald-700 text-sm">Answer</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{q.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-indigo-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No questions found</h3>
            <p className="text-sm text-gray-500">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPrep;