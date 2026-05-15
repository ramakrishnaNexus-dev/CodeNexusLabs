import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Edit3, Save, Loader2, BookOpen, Clock, ChevronDown, ChevronUp, Eye, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = 'https://codenexuslabs-production.up.railway.app/api/v1';

const CourseTopics = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<any>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [section, setSection] = useState('');
  const [content, setContent] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSection, setEditSection] = useState('');
  const [editContent, setEditContent] = useState('');
  const [previewingId, setPreviewingId] = useState<number | null>(null);

  const token = localStorage.getItem('token') || '';

  const loadCourse = async () => {
    try {
      const res = await axios.get(`${API_URL}/courses/${id}`);
      const data = res.data?.data || res.data;
      setCourse(data);
      setTopics(data?.topics || []);
    } catch (err) {
      toast.error('Failed to load course data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCourse(); }, [id]);

  const handleImageUpload = async (setter: (text: string) => void, currentText: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await axios.post(`${API_URL}/upload/image`, formData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
        });
        const url = res.data?.data?.url || res.data?.url;
        if (url) {
          const imgMarkdown = `\n![Image](${url})\n`;
          setter(currentText + imgMarkdown);
          toast.success('Image uploaded!');
        }
      } catch { toast.error('Upload failed'); }
    };
    input.click();
  };

  const addTopic = async () => {
    if (!title.trim()) return toast.error('Title required');
    try {
      await axios.post(`${API_URL}/catalog/admin/courses/${id}/topics`,
        { title: title.trim(), section: section.trim(), content: content, type: 'TEXT', orderIndex: topics.length },
        { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Topic added!');
      setTitle('');
      setSection('');
      setContent('');
      loadCourse();
    } catch { toast.error('Failed to add'); }
  };

  const startEdit = (topic: any) => {
    setEditingId(topic.id);
    setEditTitle(topic.title);
    setEditSection(topic.section || '');
    setEditContent(topic.content || '');
    setExpandedId(topic.id);
  };

  const updateTopic = async (topicId: number) => {
    try {
      await axios.put(`${API_URL}/catalog/admin/topics/${topicId}`,
        { title: editTitle, section: editSection.trim(), content: editContent },
        { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Updated!');
      setEditingId(null);
      loadCourse();
    } catch { toast.error('Failed to update'); }
  };

  const deleteTopic = async (topicId: number) => {
    if (!window.confirm('Delete this topic?')) return;
    try {
      await axios.delete(`${API_URL}/catalog/admin/topics/${topicId}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Deleted!');
      loadCourse();
    } catch { toast.error('Failed to delete'); }
  };

  // Group topics by section for display
  const groupTopicsBySection = () => {
    const grouped: Record<string, any[]> = {};
    topics.forEach((t: any, i: number) => {
      const sec = t.section || 'Other Topics';
      if (!grouped[sec]) grouped[sec] = [];
      grouped[sec].push({ ...t, index: i });
    });
    return grouped;
  };

  const groupedTopics = groupTopicsBySection();

  if (loading) return <div className="p-10 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" /></div>;

  return (
    <div className="max-w-[1000px] mx-auto p-4 sm:p-6">
      <button onClick={() => navigate('/admin/courses')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 mb-5 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Courses
      </button>

      <div className="card p-5 mb-5 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-semibold">{course?.category || 'N/A'}</span>
          <span className="px-2.5 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-semibold">{course?.difficulty || 'N/A'}</span>
          <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{course?.duration || 'N/A'}</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">{course?.title}</h1>
        <p className="text-gray-500 text-sm">{course?.description}</p>
      </div>

      <div className="card p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Topics ({topics.length})</h2>

        {topics.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No topics yet.</p>
          </div>
        )}

        <div className="space-y-4 mb-6">
          {Object.entries(groupedTopics).map(([sectionName, sectionTopics]) => (
            <div key={sectionName}>
              {/* Section Header */}
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1 mb-2">
                {sectionName}
              </h3>
              <div className="space-y-2">
                {sectionTopics.map((t: any) => (
                  <div key={t.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => { if (editingId !== t.id) setExpandedId(expandedId === t.id ? null : t.id); }}
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-50 text-left transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">{t.index + 1}</span>
                        <span className="font-medium text-gray-900 text-sm">{t.title}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={(e) => { e.stopPropagation(); startEdit(t); }} className="p-1 rounded hover:bg-indigo-50 text-gray-400 hover:text-indigo-600"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={(e) => { e.stopPropagation(); deleteTopic(t.id); }} className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                        {expandedId === t.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </div>
                    </button>
                    {expandedId === t.id && (
                      <div className="border-t border-gray-100">
                        {editingId === t.id ? (
                          <div className="p-3 space-y-2">
                            <input className="input-field py-1.5 text-sm font-bold" value={editTitle} onChange={e => setEditTitle(e.target.value)} placeholder="Topic Title" />
                            <input className="input-field py-1.5 text-sm" value={editSection} onChange={e => setEditSection(e.target.value)} placeholder="Section (e.g. HTML Basics, OOP Concepts) — optional" />
                            <div className="flex gap-2 mb-2">
                              <button onClick={() => handleImageUpload(setEditContent, editContent)} className="text-xs text-gray-500 hover:text-indigo-600 flex items-center gap-1"><Upload className="w-3 h-3" /> Add Image</button>
                              <span className="text-xs text-gray-400 self-center">Use Markdown: ## Heading, ```code```, | Table |, ![Image](url)</span>
                            </div>
                            <textarea
                              className="w-full min-h-[300px] p-3 border border-gray-200 rounded-lg text-sm font-mono bg-gray-50 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
                              value={editContent}
                              onChange={e => setEditContent(e.target.value)}
                              placeholder="Paste your content here using Markdown..."
                            />
                            <div className="flex gap-2 pt-2">
                              <button onClick={() => updateTopic(t.id)} className="btn-primary py-1.5 px-3 text-xs gap-1 flex items-center"><Save className="w-3.5 h-3.5" /> Save</button>
                              <button onClick={() => setEditingId(null)} className="btn-secondary py-1.5 px-3 text-xs">Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 bg-gray-50">
                            <div className="course-content prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: t.content || '<p>No content yet.</p>' }} />
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

        <div className="border-t pt-4">
          <h3 className="font-semibold text-gray-900 text-sm mb-3">Add New Topic</h3>
          <input className="input-field py-2 text-sm font-bold mb-2" placeholder="Topic Title *" value={title} onChange={e => setTitle(e.target.value)} />
          <input className="input-field py-2 text-sm mb-2" placeholder="Section (e.g. HTML Basics, OOP Concepts) — optional" value={section} onChange={e => setSection(e.target.value)} />
          <div className="flex gap-2 mb-2">
            <button onClick={() => handleImageUpload(setContent, content)} className="text-xs text-gray-500 hover:text-indigo-600 flex items-center gap-1"><Upload className="w-3 h-3" /> Add Image</button>
            <span className="text-xs text-gray-400 self-center">Use Markdown: ## Heading, ```code```, | Table |, ![Image](url)</span>
          </div>
          <textarea
            className="w-full min-h-[300px] p-3 border border-gray-200 rounded-lg text-sm font-mono bg-gray-50 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none mb-3"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Paste your content here using Markdown..."
          />
          <button onClick={addTopic} className="btn-primary gap-2 text-sm flex items-center"><Plus className="w-4 h-4" /> Add Topic</button>
        </div>
      </div>
    </div>
  );
};

export default CourseTopics;