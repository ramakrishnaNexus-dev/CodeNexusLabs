import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../../services/api';

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  const [quizForm, setQuizForm] = useState({ title: '', description: '', courseId: '', timeLimit: 10, passingScore: 60 });
  const [questionForm, setQuestionForm] = useState({
    questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: 'A', explanation: ''
  });

  const fetchQuizzes = () => {
    setLoading(true);
    API.get('/quizzes').then((res: any) => {
      setQuizzes(res.data || []);
    }).catch(() => toast.error('Failed to load quizzes'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchQuizzes(); }, []);

  const handleCreateQuiz = async () => {
    if (!quizForm.title || !quizForm.courseId) {
      toast.error('Title and Course ID required');
      return;
    }
    await API.post('/quizzes', {
      title: quizForm.title,
      description: quizForm.description,
      courseId: parseInt(quizForm.courseId),
      timeLimit: quizForm.timeLimit,
      passingScore: quizForm.passingScore,
      active: true,
    });
    toast.success('Quiz created!');
    setShowQuizModal(false);
    setQuizForm({ title: '', description: '', courseId: '', timeLimit: 10, passingScore: 60 });
    fetchQuizzes();
  };

  const handleAddQuestion = async () => {
    if (!selectedQuiz || !questionForm.questionText) {
      toast.error('Question text required');
      return;
    }
    await API.post(`/quizzes/${selectedQuiz.id}/questions`, questionForm);
    toast.success('Question added!');
    setShowQuestionModal(false);
    setQuestionForm({ questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: 'A', explanation: '' });
    fetchQuizzes();
  };

  const handleDelete = async (id: number) => {
    await API.delete(`/quizzes/${id}`);
    toast.success('Quiz deleted');
    fetchQuizzes();
  };

  const toggleExpand = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      fetchQuizzes();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quiz Management</h1>
          <p className="text-gray-500 text-sm">{quizzes.length} quizzes total</p>
        </div>
        <button onClick={() => setShowQuizModal(true)} className="btn-primary gap-2">
          <Plus className="w-4 h-4" /> Create Quiz
        </button>
      </div>

      <div className="card p-4 mb-6 bg-indigo-50 border-indigo-100">
        <p className="text-sm text-indigo-700">
          <strong>How to use:</strong> 1. Create Quiz → 2. Click quiz to expand → 3. Add Questions
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>
      ) : quizzes.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No quizzes yet. Click "Create Quiz" to start.</div>
      ) : (
        <div className="space-y-4">
          {quizzes.map((q: any) => (
            <div key={q.id} className="card overflow-hidden">
              <button onClick={() => toggleExpand(q.id)}
                className="w-full p-5 flex items-center justify-between hover:bg-gray-50 text-left">
                <div>
                  <h3 className="font-bold text-gray-900">{q.title}</h3>
                  <p className="text-sm text-gray-500">{q.description}</p>
                  <div className="flex gap-3 mt-1 text-xs text-gray-400">
                    <span>Course: {q.courseId}</span>
                    <span>⏱ {q.timeLimit}min</span>
                    <span>📊 {q.passingScore}%</span>
                    <span>📝 {q.questions?.length || 0} Q</span>
                  </div>
                </div>
                {expandedId === q.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>
              
              {expandedId === q.id && (
                <div className="px-5 pb-5 border-t">
                  <div className="flex gap-2 mt-4 mb-4">
                    <button onClick={() => { setSelectedQuiz(q); setShowQuestionModal(true); }} className="btn-primary py-2 px-4 text-sm gap-1">
                      <Plus className="w-4 h-4" /> Add Question
                    </button>
                    <button onClick={() => handleDelete(q.id)} className="btn-secondary py-2 px-4 text-sm gap-1 text-red-600">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                  
                  {q.questions?.length > 0 ? (
                    <div className="space-y-2">
                      {q.questions.map((ques: any, i: number) => (
                        <div key={ques.id} className="p-3 bg-gray-50 rounded-lg text-sm">
                          <p className="font-medium">Q{i+1}: {ques.questionText}</p>
                          <p className="text-xs text-gray-500 mt-1">A: {ques.optionA} | B: {ques.optionB} | C: {ques.optionC} | D: {ques.optionD}</p>
                          <p className="text-xs text-green-600 mt-1">✅ Correct: {ques.correctAnswer}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 py-4">No questions yet. Click Add Question.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold">Create New Quiz</h2>
              <button onClick={() => setShowQuizModal(false)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-semibold mb-1">Quiz Title *</label><input className="input-field" value={quizForm.title} onChange={e => setQuizForm({...quizForm, title: e.target.value})} placeholder="e.g. Python Basics Quiz" /></div>
              <div><label className="block text-sm font-semibold mb-1">Description</label><input className="input-field" value={quizForm.description} onChange={e => setQuizForm({...quizForm, description: e.target.value})} placeholder="Short description" /></div>
              <div><label className="block text-sm font-semibold mb-1">Course ID *</label><input className="input-field" type="number" value={quizForm.courseId} onChange={e => setQuizForm({...quizForm, courseId: e.target.value})} placeholder="1=Java, 2=Spring, 3=Python" /><p className="text-xs text-gray-400 mt-1">1=Java, 2=Spring Boot, 3=Python</p></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold mb-1">Time (min)</label><input className="input-field" type="number" value={quizForm.timeLimit} onChange={e => setQuizForm({...quizForm, timeLimit: parseInt(e.target.value)})} /></div>
                <div><label className="block text-sm font-semibold mb-1">Pass Score %</label><input className="input-field" type="number" value={quizForm.passingScore} onChange={e => setQuizForm({...quizForm, passingScore: parseInt(e.target.value)})} /></div>
              </div>
              <button onClick={handleCreateQuiz} className="btn-primary w-full gap-2"><Save className="w-4 h-4" /> Create Quiz</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Question Modal */}
      {showQuestionModal && selectedQuiz && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold">Add Question to: {selectedQuiz.title}</h2>
              <button onClick={() => setShowQuestionModal(false)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-semibold mb-1">Question *</label><textarea className="input-field" rows={2} value={questionForm.questionText} onChange={e => setQuestionForm({...questionForm, questionText: e.target.value})} placeholder="Enter question" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold mb-1">Option A</label><input className="input-field py-2" value={questionForm.optionA} onChange={e => setQuestionForm({...questionForm, optionA: e.target.value})} /></div>
                <div><label className="block text-xs font-semibold mb-1">Option B</label><input className="input-field py-2" value={questionForm.optionB} onChange={e => setQuestionForm({...questionForm, optionB: e.target.value})} /></div>
                <div><label className="block text-xs font-semibold mb-1">Option C</label><input className="input-field py-2" value={questionForm.optionC} onChange={e => setQuestionForm({...questionForm, optionC: e.target.value})} /></div>
                <div><label className="block text-xs font-semibold mb-1">Option D</label><input className="input-field py-2" value={questionForm.optionD} onChange={e => setQuestionForm({...questionForm, optionD: e.target.value})} /></div>
              </div>
              <div><label className="block text-sm font-semibold mb-1">Correct Answer</label><select className="input-field" value={questionForm.correctAnswer} onChange={e => setQuestionForm({...questionForm, correctAnswer: e.target.value})}><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option></select></div>
              <div><label className="block text-sm font-semibold mb-1">Explanation</label><input className="input-field" value={questionForm.explanation} onChange={e => setQuestionForm({...questionForm, explanation: e.target.value})} placeholder="Why this is correct" /></div>
              <button onClick={handleAddQuestion} className="btn-primary w-full gap-2"><Plus className="w-4 h-4" /> Add Question</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizManagement;