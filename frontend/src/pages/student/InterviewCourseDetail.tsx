import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { interviewAPI } from '../../services/api';
import { PageLoader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { ArrowLeft, ListChecks, ChevronRight, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github.css';

const InterviewCourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<number>(0);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLoading(true);
    interviewAPI.getInterviewCourse(Number(id))
      .then((res: any) => {
        setCourse(res.data);
      })
      .catch(() => setError('Failed to load interview course'))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [id]);

  // Add Copy buttons to code blocks - same as CourseDetail.tsx
  useEffect(() => {
    if (course) {
      setTimeout(() => {
        document.querySelectorAll('.course-content pre').forEach((pre: any) => {
          if (pre.querySelector('.copy-btn')) return;
          const btn = document.createElement('button');
          btn.className = 'copy-btn';
          btn.textContent = 'Copy';
          btn.onclick = () => {
            const code = pre.querySelector('code')?.textContent || pre.textContent || '';
            navigator.clipboard.writeText(code).then(() => {
              btn.textContent = 'Copied!';
              btn.classList.add('copied');
              setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
            });
          };
          pre.style.position = 'relative';
          pre.appendChild(btn);
        });
      }, 500);
    }
  }, [activeTopic, course]);

  const selectTopic = (i: number) => { setActiveTopic(i); };

  const toggleCategory = (category: string) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Group topics by section
  const groupTopicsBySection = (topics: any[]) => {
    const grouped: Record<string, any[]> = {};
    topics.forEach((topic: any, index: number) => {
      const sectionName = topic.section || 'Other Topics';
      if (!grouped[sectionName]) {
        grouped[sectionName] = [];
      }
      grouped[sectionName].push({ ...topic, originalIndex: index });
    });
    return grouped;
  };

  if (loading) return <PageLoader text="Loading interview course..." />;
  if (error) return <div className="max-w-7xl mx-auto px-4 py-12"><ErrorMessage message={error} /></div>;
  if (!course) return null;

  const topics = (course.topics || []) as any[];
  const currentTopic = topics[activeTopic];
  const groupedTopics = groupTopicsBySection(topics);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 lg:py-8">

        <div className="flex items-center justify-between mb-4">
          <Link to="/interview" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600">
            <ArrowLeft className="w-4 h-4" /> Back to Interview Prep
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold">{course.category}</span>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold">{course.difficulty}</span>
            <span className="text-xs text-gray-500 flex items-center gap-1 ml-auto">
              {topics.length} Questions
            </span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{course.description}</p>
        </div>

        <div className="flex gap-4">
          {/* Left Sidebar - Topics */}
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sticky top-20">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-indigo-600" /> Topics ({topics.length})
              </h3>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {Object.entries(groupedTopics).map(([sectionName, sectionTopics]) => (
                  <div key={sectionName}>
                    <button
                      onClick={() => toggleCategory(sectionName)}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-semibold text-gray-500 uppercase tracking-wider hover:bg-gray-50 transition-colors"
                    >
                      <span>{sectionName}</span>
                      <svg className={`w-3.5 h-3.5 transition-transform ${collapsedCategories[sectionName] ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {!collapsedCategories[sectionName] && (
                      <div className="space-y-0.5 mt-1">
                        {sectionTopics.map((t: any) => (
                          <button
                            key={t.id || t.originalIndex}
                            onClick={() => selectTopic(t.originalIndex)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-3 ${
                              activeTopic === t.originalIndex 
                                ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 bg-gray-100 text-gray-500`}>
                              {t.originalIndex + 1}
                            </span>
                            <span className="truncate">{t.title}</span>
                            {activeTopic === t.originalIndex && <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0 text-indigo-500" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div>
                {currentTopic ? (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">
                        <span className="text-indigo-600 mr-2">#{activeTopic + 1}</span>
                        {currentTopic.title}
                      </h2>
                    </div>
                    {/* Use course-content class which has all CSS in index.css */}
                    <div className="course-content">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight, rehypeRaw]}
                      >
                        {currentTopic.content || 'No content yet.'}
                      </ReactMarkdown>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Select a topic from the sidebar to start learning.</p>
                  </div>
                )}
                {topics.length > 0 && (
                  <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => activeTopic > 0 && selectTopic(activeTopic - 1)} 
                      disabled={activeTopic === 0} 
                      className="bg-white text-indigo-600 border-2 border-indigo-200 px-4 py-1.5 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 text-sm disabled:opacity-50 inline-flex items-center gap-2"
                    >
                      ← Previous
                    </button>
                    <span className="text-xs text-gray-400">{activeTopic + 1} of {topics.length}</span>
                    <button 
                      onClick={() => activeTopic < topics.length - 1 && selectTopic(activeTopic + 1)} 
                      disabled={activeTopic >= topics.length - 1} 
                      className="bg-indigo-600 text-white px-4 py-1.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-300 text-sm disabled:opacity-50 inline-flex items-center gap-2"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCourseDetail;