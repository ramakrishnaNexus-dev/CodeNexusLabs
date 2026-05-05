import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock, AlertCircle, CheckCircle, ArrowRight, ArrowLeft, Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../../services/api';

const QuizPage = () => {
  const { courseId } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    API.get(`/quizzes/course/${courseId}`).then((res: any) => {
      setQuiz(res.data);
      setTimeLeft((res.data?.timeLimit || 10) * 60);
    }).catch(() => {
      toast.error('Failed to load quiz');
    }).finally(() => setLoading(false));
  }, [courseId]);

  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;
    const timer = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res: any = await API.post(`/quizzes/${quiz.quizId}/submit`, answers);
      setResults(res.data);
      setSubmitted(true);
      toast.success('Quiz submitted!');
    } catch {
      toast.error('Failed to submit');
    }
    setSubmitting(false);
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-indigo-600 animate-spin" /></div>;

  if (!quiz) return <div className="text-center py-20"><p className="text-gray-500">No quiz available</p></div>;

  if (submitted && results) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="card p-8 text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${results.passed ? 'bg-green-100' : 'bg-red-100'}`}>
            {results.passed ? <CheckCircle className="w-10 h-10 text-green-600" /> : <AlertCircle className="w-10 h-10 text-red-500" />}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{results.passed ? 'Congratulations! 🎉' : 'Keep Trying! 💪'}</h1>
          <p className="text-gray-500 text-lg mb-4">Score: {results.correct}/{results.total} ({results.score}%)</p>
          <div className="w-full h-3 bg-gray-100 rounded-full mb-6">
            <div className={`h-full rounded-full ${results.passed ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${results.score}%` }} />
          </div>
          <Link to={`/courses/${courseId}`} className="btn-primary">Back to Course</Link>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="card p-4 mb-6 sticky top-20 z-10 bg-white/95 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-900">{quiz.title}</h2>
            <p className="text-sm text-gray-500">{currentQ + 1} of {quiz.totalQuestions}</p>
          </div>
          <div className={`flex items-center gap-2 font-mono font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-gray-700'}`}>
            <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
          </div>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-3">
          <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${((currentQ + 1) / quiz.totalQuestions) * 100}%` }} />
        </div>
      </div>

      <div className="card p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">{question.questionText}</h2>
        <div className="space-y-3">
          {['A', 'B', 'C', 'D'].map((opt) => (
            <button key={opt} onClick={() => setAnswers({ ...answers, [question.id.toString()]: opt })}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                answers[question.id.toString()] === opt
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-medium'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}>
              <span className="font-semibold mr-3">{opt}.</span>
              {question[`option${opt}`]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}
          className="btn-secondary py-2 px-4 text-sm gap-2 disabled:opacity-50">
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>
        {currentQ < quiz.totalQuestions - 1 ? (
          <button onClick={() => setCurrentQ(currentQ + 1)} className="btn-primary py-2 px-4 text-sm gap-2">
            Next <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={submitting}
            className="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 gap-2 flex items-center">
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;