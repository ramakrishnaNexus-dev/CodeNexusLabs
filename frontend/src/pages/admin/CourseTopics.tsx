import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Edit3, Save, Loader2, BookOpen, Clock, ChevronDown, ChevronUp, Table2 } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { common, createLowlight } from 'lowlight';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = 'https://codenexuslabs-production.up.railway.app/api/v1';

const lowlight = createLowlight(common);

// ============================================================
// EDITOR TOOLBAR COMPONENT
// ============================================================
const EditorToolbar = ({ editor, onUpload }: any) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-0.5 p-2 border border-b-0 border-gray-200 bg-gray-50 rounded-t-lg">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-sm ${editor.isActive('bold') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
        title="Bold"
      >
        <b>B</b>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-sm ${editor.isActive('italic') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
        title="Italic"
      >
        <i>I</i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-sm ${editor.isActive('underline') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
        title="Underline"
      >
        <u>U</u>
      </button>

      <span className="w-px bg-gray-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-xs font-bold ${editor.isActive('heading', { level: 2 }) ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
        title="Heading 2"
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-xs font-bold ${editor.isActive('heading', { level: 3 }) ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
        title="Heading 3"
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-xs font-bold ${editor.isActive('heading', { level: 4 }) ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
        title="Heading 4"
      >
        H4
      </button>

      <span className="w-px bg-gray-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-sm ${editor.isActive('bulletList') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
        title="Bullet List"
      >
        •
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-sm ${editor.isActive('orderedList') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
        title="Numbered List"
      >
        1.
      </button>

      <span className="w-px bg-gray-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-sm ${editor.isActive('table') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
        title="Insert Table"
      >
        <Table2 className="w-4 h-4" />
      </button>

      <span className="w-px bg-gray-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-1.5 rounded hover:bg-gray-200 text-xs ${editor.isActive('codeBlock') ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
        title="Code Block"
      >
        &lt;/&gt;
      </button>
      <button
        onClick={onUpload}
        className="p-1.5 rounded hover:bg-gray-200 text-gray-600"
        title="Upload Image"
      >
        🖼️
      </button>
    </div>
  );
};

// ============================================================
// MAIN COURSE TOPICS COMPONENT
// ============================================================
const CourseTopics = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<any>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const token = localStorage.getItem('token') || '';

  const addEditor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Image,
      CodeBlockLowlight.configure({ lowlight }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: '',
  });

  const editEditor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Image,
      CodeBlockLowlight.configure({ lowlight }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: '',
  });

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

  const handleImageUpload = async () => {
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
          if (editingId) editEditor?.chain().focus().setImage({ src: url }).run();
          else addEditor?.chain().focus().setImage({ src: url }).run();
          toast.success('Image uploaded!');
        }
      } catch { toast.error('Upload failed'); }
    };
    input.click();
  };

  const addTopic = async () => {
    if (!title.trim()) return toast.error('Title required');
    const html = addEditor?.getHTML() || '';
    try {
      await axios.post(`${API_URL}/catalog/admin/courses/${id}/topics`,
        { title: title.trim(), content: html, type: 'TEXT', orderIndex: topics.length },
        { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Topic added!');
      setTitle('');
      addEditor?.commands.setContent('');
      loadCourse();
    } catch { toast.error('Failed to add'); }
  };

  const startEdit = (topic: any) => {
    setEditingId(topic.id);
    setEditTitle(topic.title);
    setExpandedId(topic.id);
    setTimeout(() => editEditor?.commands.setContent(topic.content || ''), 50);
  };

  const updateTopic = async (topicId: number) => {
    const html = editEditor?.getHTML() || '';
    try {
      await axios.put(`${API_URL}/catalog/admin/topics/${topicId}`,
        { title: editTitle, content: html },
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
        <h2 className="text-lg font-bold text-gray-900 mb-4">📚 Topics ({topics.length})</h2>

        {topics.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No topics yet.</p>
          </div>
        )}

        <div className="space-y-2 mb-6">
          {topics.map((t: any, i: number) => (
            <div key={t.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => { if (editingId !== t.id) setExpandedId(expandedId === t.id ? null : t.id); }}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
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
                      <EditorToolbar editor={editEditor} onUpload={handleImageUpload} />
                      <div className="border border-gray-200 rounded-b-lg p-2 min-h-[120px] bg-white prose prose-sm max-w-none">
                        <EditorContent editor={editEditor} />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button onClick={() => updateTopic(t.id)} className="btn-primary py-1.5 px-3 text-xs gap-1 flex items-center"><Save className="w-3.5 h-3.5" /> Save</button>
                        <button onClick={() => setEditingId(null)} className="btn-secondary py-1.5 px-3 text-xs">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50">
                      <div className="course-content" dangerouslySetInnerHTML={{ __html: t.content || '<p style="color: #9ca3af;">No content yet.</p>' }} />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold text-gray-900 text-sm mb-3">Add New Topic</h3>
          <input className="input-field py-2 text-sm font-bold mb-2" placeholder="Topic Title *" value={title} onChange={e => setTitle(e.target.value)} />
          <EditorToolbar editor={addEditor} onUpload={handleImageUpload} />
          <div className="border border-gray-200 rounded-b-lg p-2 min-h-[150px] bg-white prose prose-sm max-w-none mb-3">
            <EditorContent editor={addEditor} />
          </div>
          <button onClick={addTopic} className="btn-primary gap-2 text-sm flex items-center"><Plus className="w-4 h-4" /> Add Topic</button>
        </div>
      </div>
    </div>
  );
};

export default CourseTopics;