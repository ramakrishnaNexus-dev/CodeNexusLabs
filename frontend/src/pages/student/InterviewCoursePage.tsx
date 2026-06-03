import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronRight, ListChecks, ChevronDown } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github.css';

const API_URL = 'https://codenexuslabs.onrender.com/api/v1';

const InterviewCoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [activeTopic, setActiveTopic] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLoading(true);
    // Fetch course details
    axios.get(`${API_URL}/courses/${courseId}`)
      .then((res: any) => {
        const courseData = res.data;
        setCourse(courseData);
        const courseTopics = courseData?.topics || [];
        setTopics(courseTopics);
        
        // Set first topic as active
        if (courseTopics.length > 0) {
          setActiveTopic(courseTopics[0]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [courseId]);

  const toggleCategory = (category: string) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Group topics by section
  const groupTopicsBySection = (topicsList: any[]) => {
    const grouped: Record<string, any[]> = {};
    topicsList.forEach((topic: any) => {
      const sectionName = topic.section || 'Interview Topics';
      if (!grouped[sectionName]) {
        grouped[sectionName] = [];
      }
      grouped[sectionName].push(topic);
    });
    return grouped;
  };

  const groupedTopics = groupTopicsBySection(topics);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading interview questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3">
          <Link to="/interview" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600">
            <ArrowLeft className="w-4 h-4" /> Back to Interview Prep
          </Link>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 lg:py-8">
        
        {/* Course Header */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold">{course?.category}</span>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold">{course?.difficulty}</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">{course?.title} — Interview Preparation</h1>
          <p className="text-gray-500 text-sm mt-1">{topics.length} interview topics available</p>
        </div>

        <div className="flex gap-6">
          {/* LEFT SIDEBAR - Topics List */}
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sticky top-20">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-indigo-600" /> Topics ({topics.length})
              </h3>
              <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                {Object.entries(groupedTopics).map(([sectionName, sectionTopics]) => (
                  <div key={sectionName}>
                    {/* Section Header */}
                    <button
                      onClick={() => toggleCategory(sectionName)}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-semibold text-gray-500 uppercase tracking-wider hover:bg-gray-50 transition-colors"
                    >
                      <span>{sectionName}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${collapsedCategories[sectionName] ? '' : 'rotate-180'}`} />
                    </button>
                    
                    {/* Section Topics */}
                    {!collapsedCategories[sectionName] && (
                      <div className="space-y-0.5 mt-1">
                        {sectionTopics.map((topic: any, idx: number) => (
                          <button
                            key={topic.id}
                            onClick={() => setActiveTopic(topic)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-3 ${
                              activeTopic?.id === topic.id 
                                ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span className="truncate">{topic.title}</span>
                            {activeTopic?.id === topic.id && <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0 text-indigo-500" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT MAIN CONTENT - Markdown Rendered */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 lg:p-8">
              {activeTopic ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold flex items-center justify-center">
                        {(topics.findIndex(t => t.id === activeTopic.id) || 0) + 1}
                      </span>
                      {activeTopic.title}
                    </h2>
                  </div>
                  <div className="interview-content prose prose-indigo max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight, rehypeRaw]}
                    >
                      {activeTopic.content || '# No content available yet.'}
                    </ReactMarkdown>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Select a topic from the sidebar to start practicing.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCoursePage;