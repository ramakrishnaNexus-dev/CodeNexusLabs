import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Save, X, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

const InterviewManagement = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ category: 'Java', question: '', answer: '', difficulty: 'Easy' });

  const getToken = () => localStorage.getItem('token') || sessionStorage.getItem('token') || '';

  const fetchQuestions = () => {
    axios.get(`${API_URL}/interview/questions`)
      .then((res: any) => setQuestions(res.data?.data || res.data || []))
      .catch(() => toast.error('Failed to load questions'));
  };

  useEffect(() => { fetchQuestions(); }, []);

  const filtered = questions.filter((q: any) =>
    q.question?.toLowerCase().includes(search.toLowerCase()) ||
    q.category?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async () => {
    if (!formData.question || !formData.answer) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      await axios.post(`${API_URL}/interview/questions`, {
        category: formData.category,
        question: formData.question,
        answer: formData.answer,
        difficulty: formData.difficulty
      }, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      toast.success('Question saved!');
      setShowModal(false);
      setFormData({ category: 'Java', question: '', answer: '', difficulty: 'Easy' });
      fetchQuestions();
    } catch {
      toast.error('Failed to save');
    }
  };

  const handleEdit = (q: any) => {
    setEditing(q);
    setFormData({ category: q.category, question: q.question, answer: q.answer, difficulty: q.difficulty });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/interview/questions/${id}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      toast.success('Question deleted!');
      fetchQuestions();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Interview Q&A Management</h1>
          <p className="text-gray-500 text-sm mt-1">{questions.length} questions total</p>
        </div>
        <button onClick={() => { setEditing(null); setFormData({ category: 'Java', question: '', answer: '', difficulty: 'Easy' }); setShowModal(true); }}
          className="btn-primary gap-2"><Plus className="w-4 h-4" /> Add Question</button>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input type="text" placeholder="Search questions..." value={search}
          onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
      </div>

      <div className="space-y-4">
        {filtered.map((q: any) => (
          <div key={q.id} className="card overflow-hidden">
            <button onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
              className="w-full p-5 flex items-center justify-between hover:bg-gray-50 text-left">
              <div className="flex items-center gap-4 flex-1">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                <div>
                  <div className="flex gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">{q.category}</span>
                    <span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded text-xs font-medium">{q.difficulty}</span>
                  </div>
                  <p className="font-semibold text-gray-900">{q.question}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); handleEdit(q); }} className="p-1.5 rounded-lg hover:bg-indigo-50 text-gray-400 hover:text-indigo-600"><Edit2 className="w-4 h-4" /></button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(q.id); }} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                {expandedId === q.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </div>
            </button>
            {expandedId === q.id && (
              <div className="px-5 pb-5 border-t">
                <div className="mt-4 p-4 bg-green-50 rounded-xl">
                  <p className="text-sm text-gray-700"><strong>Answer:</strong> {q.answer}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold">{editing ? 'Edit Question' : 'Add Question'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="input-field">
                    {['Java','React','Spring Boot','JavaScript','Python','Selenium'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Difficulty</label>
                  <select value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})} className="input-field">
                    {['Easy','Medium','Hard'].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Question</label>
                <textarea value={formData.question} onChange={e => setFormData({...formData, question: e.target.value})}
                  className="input-field" rows={3} placeholder="Enter interview question..." />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Answer</label>
                <textarea value={formData.answer} onChange={e => setFormData({...formData, answer: e.target.value})}
                  className="input-field" rows={4} placeholder="Enter answer..." />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button onClick={handleSave} className="btn-primary flex-1 gap-2"><Save className="w-4 h-4" /> Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewManagement;