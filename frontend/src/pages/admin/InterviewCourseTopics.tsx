import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { interviewAPI } from '../../services/api';
import { PageLoader } from '../../components/common/Loader';
import { ArrowLeft, Save, Trash2, Plus, ChevronDown, ChevronUp, Edit2, Eye, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github.css';

const InterviewCourseTopics = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Add topic form
  const [title, setTitle] = useState('');
  const [section, setSection] = useState('');
  const [content, setContent] = useState('');
  const [orderIndex, setOrderIndex] = useState(0);

  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSection, setEditSection] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editOrderIndex, setEditOrderIndex] = useState(0);

  // Preview state
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = () => {
    setLoading(true);
    interviewAPI.getInterviewCourse(Number(id))
      .then((res: any) => {
        setCourse(res.data);
        setTopics(res.data?.topics || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleAddTopic = async () => {
    if (!title.trim() || !content.trim()) return;
    setSaving(true);
    try {
      await interviewAPI.addInterviewTopic(Number(id), {
        title,
        content,
        section: section || undefined,
        orderIndex: orderIndex || topics.length + 1,
        type: 'markdown'
      });
      setTitle('');
      setSection('');
      setContent('');
      setOrderIndex(0);
      loadCourse();
    } catch (e) {
      alert('Failed to add topic');
    }
    setSaving(false);
  };

  const handleUpdateTopic = async (topicId: number) => {
    setSaving(true);
    try {
      await interviewAPI.updateInterviewTopic(topicId, {
        title: editTitle,
        content: editContent,
        section: editSection || undefined,
        orderIndex: editOrderIndex,
        type: 'markdown'
      });
      setEditingId(null);
      loadCourse();
    } catch (e) {
      alert('Failed to update topic');
    }
    setSaving(false);
  };

  const handleDeleteTopic = async (topicId: number) => {
    if (!confirm('Delete this topic?')) return;
    try {
      await interviewAPI.deleteInterviewTopic(topicId);
      loadCourse();
    } catch (e) {
      alert('Failed to delete topic');
    }
  };

  const startEdit = (topic: any) => {
    setEditingId(topic.id);
    setEditTitle(topic.title);
    setEditSection(topic.section || '');
    setEditContent(topic.content || '');
    setEditOrderIndex(topic.orderIndex || 0);
  };

  const toggleExpand = (topicId: number) => {
    setExpandedId(expandedId === topicId ? null : topicId);
  };

  // Group topics by section
  const groupTopicsBySection = (topics: any[]) => {
    const grouped: Record<string, any[]> = {};
    topics.forEach((topic: any) => {
      const sectionName = topic.section || 'Other Topics';
      if (!grouped[sectionName]) {
        grouped[sectionName] = [];
      }
      grouped[sectionName].push(topic);
    });
    return grouped;
  };

  const groupedTopics = groupTopicsBySection(topics);

  if (loading) return <PageLoader text="Loading..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 lg:py-8">

        <button onClick={() => navigate('/admin/interview')} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Interview Courses
        </button>

        {/* Course Info Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold">{course?.category}</span>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold">{course?.difficulty}</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">{course?.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{course?.description}</p>
        </div>

        <div className="flex gap-4">
          {/* Left Sidebar - Topics List */}
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sticky top-20">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Topics ({topics.length})</h3>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {Object.entries(groupedTopics).map(([sectionName, sectionTopics]) => (
                  <div key={sectionName}>
                    <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {sectionName}
                    </div>
                    <div className="space-y-0.5 mt-1">
                      {sectionTopics.map((t: any, idx: number) => (
                        <div key={t.id} className="group">
                          <button
                            onClick={() => toggleExpand(t.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-3 ${
                              expandedId === t.id 
                                ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 bg-gray-100 text-gray-500">
                              {idx + 1}
                            </span>
                            <span className="truncate">{t.title}</span>
                            {expandedId === t.id ? <ChevronUp className="w-4 h-4 ml-auto flex-shrink-0" /> : <ChevronDown className="w-4 h-4 ml-auto flex-shrink-0" />}
                          </button>

                          {expandedId === t.id && (
                            <div className="mt-2 px-3 pb-2">
                              {editingId === t.id ? (
                                <div className="space-y-2">
                                  <input 
                                    value={editTitle} 
                                    onChange={e => setEditTitle(e.target.value)} 
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
                                    placeholder="Title"
                                  />
                                  <input 
                                    value={editSection} 
                                    onChange={e => setEditSection(e.target.value)} 
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
                                    placeholder="Section (optional)"
                                  />
                                  <textarea 
                                    value={editContent} 
                                    onChange={e => setEditContent(e.target.value)} 
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none min-h-[150px]"
                                    placeholder="Markdown content..."
                                  />
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => handleUpdateTopic(t.id)} 
                                      disabled={saving}
                                      className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50 inline-flex items-center gap-1"
                                    >
                                      <Save className="w-3 h-3" /> {saving ? 'Saving...' : 'Save'}
                                    </button>
                                    <button 
                                      onClick={() => setEditingId(null)}
                                      className="bg-white text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-all inline-flex items-center gap-1"
                                    >
                                      <X className="w-3 h-3" /> Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  {/* Preview with course-content class */}
                                  <div className="course-content text-gray-700 max-h-[300px] overflow-y-auto border border-gray-100 rounded-lg p-3 bg-gray-50" style={{ fontSize: '16px', lineHeight: '1.9' }}>
                                    <ReactMarkdown
                                      remarkPlugins={[remarkGfm]}
                                      rehypePlugins={[rehypeHighlight, rehypeRaw]}
                                      components={{
                                        p: ({children}) => <p style={{ fontSize: '16px', lineHeight: '1.9', marginBottom: '15px' }}>{children}</p>,
                                        li: ({children}) => <li style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '5px' }}>{children}</li>,
                                        h2: ({children}) => <h2 style={{ color: '#4f46e5', fontSize: '26px', fontWeight: 700, marginTop: '30px', marginBottom: '15px' }}>{children}</h2>,
                                        h3: ({children}) => <h3 style={{ color: '#4f46e5', fontSize: '22px', fontWeight: 600, marginTop: '20px', marginBottom: '10px' }}>{children}</h3>,
                                        h4: ({children}) => <h4 style={{ color: '#4f46e5', fontSize: '20px', fontWeight: 600, marginTop: '18px', marginBottom: '8px' }}>{children}</h4>,
                                        code: ({children, className}) => {
                                          const isInline = !className;
                                          return isInline 
                                            ? <code style={{ fontFamily: "'Fira Code', 'JetBrains Mono', monospace", background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#e11d48', fontSize: '14px' }}>{children}</code>
                                            : <code style={{ fontFamily: "'Fira Code', 'JetBrains Mono', monospace", fontSize: '14px' }}>{children}</code>;
                                        },
                                        pre: ({children}) => <pre style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #e1e4e8', overflowX: 'auto', fontSize: '14px', lineHeight: '1.6', margin: '20px 0' }}>{children}</pre>,
                                        table: ({children}) => <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0', fontSize: '15px', border: '1px solid #e5e7eb' }}>{children}</table>,
                                        th: ({children}) => <th style={{ background: '#4f46e5', color: 'white', padding: '12px 15px', border: '1px solid #d1d5db', textAlign: 'left', fontWeight: 600, fontSize: '14px' }}>{children}</th>,
                                        td: ({children}) => <td style={{ padding: '10px 15px', border: '1px solid #e5e7eb', fontSize: '14px' }}>{children}</td>,
                                      }}
                                    >
                                      {t.content || 'No content'}
                                    </ReactMarkdown>
                                  </div>
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => startEdit(t)} 
                                      className="bg-white text-indigo-600 border border-indigo-200 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-indigo-50 transition-all inline-flex items-center gap-1"
                                    >
                                      <Edit2 className="w-3 h-3" /> Edit
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteTopic(t.id)} 
                                      className="bg-white text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-50 transition-all inline-flex items-center gap-1"
                                    >
                                      <Trash2 className="w-3 h-3" /> Delete
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Add New Topic */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" /> Add New Interview Topic
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topic Title *</label>
                  <input 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm"
                    placeholder="e.g., Phase 7: Advanced Java Interview Questions"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section (optional)</label>
                  <input 
                    value={section} 
                    onChange={e => setSection(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm"
                    placeholder="e.g., Phase 7"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Index</label>
                  <input 
                    type="number"
                    value={orderIndex} 
                    onChange={e => setOrderIndex(Number(e.target.value))} 
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown) *</label>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-400">Supports: ## Heading, ```code```, | Table |, **bold**</span>
                  </div>
                  <textarea 
                    value={content} 
                    onChange={e => setContent(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm min-h-[300px] font-mono"
                    placeholder="Paste your markdown content here with all questions and answers..."
                  />
                </div>

                <button 
                  onClick={handleAddTopic} 
                  disabled={saving || !title.trim() || !content.trim()}
                  className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 disabled:opacity-50 inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> {saving ? 'Adding...' : 'Add Interview Topic'}
                </button>
              </div>

              {/* Live Preview */}
              {content && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-indigo-600" /> Live Preview
                  </h4>
                  <div className="course-content text-gray-700 border border-gray-100 rounded-xl p-6 bg-gray-50" style={{ fontSize: '16px', lineHeight: '1.9' }}>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight, rehypeRaw]}
                      components={{
                        p: ({children}) => <p style={{ fontSize: '16px', lineHeight: '1.9', marginBottom: '15px' }}>{children}</p>,
                        li: ({children}) => <li style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '5px' }}>{children}</li>,
                        h2: ({children}) => <h2 style={{ color: '#4f46e5', fontSize: '26px', fontWeight: 700, marginTop: '30px', marginBottom: '15px' }}>{children}</h2>,
                        h3: ({children}) => <h3 style={{ color: '#4f46e5', fontSize: '22px', fontWeight: 600, marginTop: '20px', marginBottom: '10px' }}>{children}</h3>,
                        h4: ({children}) => <h4 style={{ color: '#4f46e5', fontSize: '20px', fontWeight: 600, marginTop: '18px', marginBottom: '8px' }}>{children}</h4>,
                        code: ({children, className}) => {
                          const isInline = !className;
                          return isInline 
                            ? <code style={{ fontFamily: "'Fira Code', 'JetBrains Mono', monospace", background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#e11d48', fontSize: '14px' }}>{children}</code>
                            : <code style={{ fontFamily: "'Fira Code', 'JetBrains Mono', monospace", fontSize: '14px' }}>{children}</code>;
                        },
                        pre: ({children}) => <pre style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #e1e4e8', overflowX: 'auto', fontSize: '14px', lineHeight: '1.6', margin: '20px 0' }}>{children}</pre>,
                        table: ({children}) => <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0', fontSize: '15px', border: '1px solid #e5e7eb' }}>{children}</table>,
                        th: ({children}) => <th style={{ background: '#4f46e5', color: 'white', padding: '12px 15px', border: '1px solid #d1d5db', textAlign: 'left', fontWeight: 600, fontSize: '14px' }}>{children}</th>,
                        td: ({children}) => <td style={{ padding: '10px 15px', border: '1px solid #e5e7eb', fontSize: '14px' }}>{children}</td>,
                      }}
                    >
                      {content}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCourseTopics;