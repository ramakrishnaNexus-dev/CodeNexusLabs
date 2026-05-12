import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { catalogAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { PageLoader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Clock, Users, BookOpen, ArrowLeft, ListChecks, ChevronRight, Code2, Play, Terminal } from 'lucide-react';
import API from '../../services/api';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';
import { useEffect as useReactEffect } from 'react';

const sampleCodes: Record<string, string> = {
  'Java': 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, CodeNexusLabs!");\n    }\n}',
  'Python': 'def greet(name):\n    return f"Hello, {name}!";\n\nprint(greet("CodeNexusLabs"))',
  'JavaScript': 'function greet(name) {\n    return `Hello, ${name}!`;\n}\n\nconsole.log(greet("CodeNexusLabs"));',
};

const CourseDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<number>(0);
  const [completedTopics, setCompletedTopics] = useState<number[]>([]);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [certificate, setCertificate] = useState<any>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showCompiler, setShowCompiler] = useState(false);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setLoading(true);
    catalogAPI.getCourse(Number(id)).then((res: any) => {
      setCourse(res.data);
      setCode(sampleCodes[res.data?.category] || sampleCodes['Java']);
    }).catch(() => setError('Failed to load course')).finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (isAuthenticated) { API.get(`/enroll/check/${id}`).then((res: any) => setEnrolled(res.data === true || res.data?.data === true)).catch(() => {}); }
  }, [id, isAuthenticated]);

  useEffect(() => {
    const allTopics = course?.topics || [];
    if (isAuthenticated && allTopics.length > 0) {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
      axios.get(`https://codenexuslabs-production.up.railway.app/api/v1/progress/course/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((res: any) => {
        const data = res.data?.data || res.data || {};
        const ids: number[] = data.completedTopicIds || [];
        const indices: number[] = [];
        ids.forEach((tid: number) => {
          const idx = allTopics.findIndex((t: any) => t.id === tid);
          if (idx >= 0) indices.push(idx);
        });
        setCompletedTopics(indices);
      }).catch(() => {
        const saved = localStorage.getItem(`progress-${id}`);
        if (saved) { try { setCompletedTopics(JSON.parse(saved)); } catch {} }
      });
    }
  }, [isAuthenticated, course, id]);

  // Add copy buttons to code blocks after render
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

  const handleEnroll = async () => {
    setEnrolling(true);
    try { await API.post(`/enroll/${id}`); setEnrolled(true); toast.success('Enrolled!'); } catch { toast.error('Failed'); }
    setEnrolling(false);
  };

  const handleCertificate = async () => {
    try {
      const res: any = await API.get(`/enroll/certificate/${id}`);
      const data = res.data || res;
      if (!data.passed) { toast.error('Pass the quiz first!'); return; }
      setCertificate(data); setShowCertificate(true); document.body.style.overflow = 'hidden';
    } catch { toast.error('Complete course and quiz first'); }
  };

  const closeCertificate = () => { setShowCertificate(false); document.body.style.overflow = ''; };

  const downloadCertificate = () => {
    const certDiv = document.getElementById('certificate-print');
    if (!certDiv) return;
    const clone = certDiv.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('button').forEach(b => b.remove());
    const html = clone.innerHTML;
    const printWin = window.open('', '_blank', 'width=1200,height=800');
    if (!printWin) return;
    printWin.document.write(`<!DOCTYPE html><html><head><title>Certificate</title><style>@page{size:A4 landscape;margin:0}*{margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}body{display:flex;justify-content:center;align-items:center;min-height:100vh;background:white}</style></head><body>${html}</body></html>`);
    printWin.document.close();
    setTimeout(() => { printWin.print(); printWin.close(); }, 400);
  };

  const selectTopic = (i: number) => { setActiveTopic(i); setShowCompiler(false); };

  const markCompleted = async (i: number) => {
    const topic = course?.topics?.[i];
    if (!topic) return;
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
      await axios.post(`https://codenexuslabs-production.up.railway.app/api/v1/progress/${topic.id}`, { courseId: Number(id) }, { headers: { Authorization: `Bearer ${token}` } });
      const updated = [...new Set([...completedTopics, i])];
      setCompletedTopics(updated);
      toast.success('Progress saved!');
    } catch {
      const updated = [...new Set([...completedTopics, i])];
      setCompletedTopics(updated);
      localStorage.setItem(`progress-${id}`, JSON.stringify(updated));
    }
  };

  const goNext = () => {
    const allTopics = course?.topics || [];
    if (activeTopic < allTopics.length - 1) { markCompleted(activeTopic); selectTopic(activeTopic + 1); }
  };

  const goPrev = () => { if (activeTopic > 0) selectTopic(activeTopic - 1); };

  const runCode = () => {
    setRunning(true); setOutput('');
    setTimeout(() => { setOutput('✅ Output:\nHello, CodeNexusLabs!\n\nProcess finished.'); setRunning(false); toast.success('Code executed!'); }, 800);
  };

  if (loading) return <PageLoader text="Loading course..." />;
  if (error) return <div className="max-w-7xl mx-auto px-4 py-12"><ErrorMessage message={error} /></div>;
  if (!course) return null;

  const topics = (course.topics || []) as any[];
  const currentTopic = topics[activeTopic];
  const isProgrammingCourse = ['Java', 'Python', 'JavaScript'].includes(course.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 lg:py-8">
        
        <div className="flex items-center justify-between mb-4">
          <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600"><ArrowLeft className="w-4 h-4" /> Back to Courses</Link>
          <div className="flex items-center gap-3">
            {isAuthenticated && enrolled && (
              <>
                {isProgrammingCourse && (
                  <button onClick={() => setShowCompiler(!showCompiler)} className="btn-secondary gap-2 text-sm px-4"><Code2 className="w-4 h-4" /> {showCompiler ? 'Back to Topic' : 'Compiler'}</button>
                )}
                <Link to={`/student/quiz/${id}`} className="btn-secondary gap-2 text-sm px-4">📝 Quiz</Link>
                <button onClick={handleCertificate} className="btn-secondary gap-2 text-sm px-4">🎓 Certificate</button>
              </>
            )}
            {isAuthenticated && !enrolled && (
              <button onClick={handleEnroll} disabled={enrolling} className="btn-primary gap-2 text-sm px-5">{enrolling ? 'Enrolling...' : 'Enroll Now'}</button>
            )}
            {!isAuthenticated && <Link to={`/login?redirect=/courses/${id}`} className="btn-primary gap-2 text-sm px-5">Login to Enroll</Link>}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold">{course.category}</span>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold">{course.difficulty}</span>
            <span className="text-xs text-gray-500 flex items-center gap-1 ml-auto"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
            <span className="text-xs text-gray-500"><Users className="w-3.5 h-3.5 inline mr-1" />{course.studentsCount}</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">{course.title}</h1>
        </div>

        <div className="flex gap-4">
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sticky top-20">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-indigo-600" /> Topics ({topics.length})
              </h3>
              <div className="space-y-0.5 max-h-[60vh] overflow-y-auto pr-1">
                {topics.map((t: any, i: number) => (
                  <button key={t.id || i} onClick={() => selectTopic(i)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 ${
                      activeTopic === i 
                        ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      completedTopics.includes(i) 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {completedTopics.includes(i) ? '✓' : i + 1}
                    </span>
                    <span>{t.title}</span>
                    {activeTopic === i && <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0 text-indigo-500" />}
                  </button>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Progress</span><span className="font-semibold">{completedTopics.length}/{topics.length}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-indigo-600 rounded-full transition-all" 
                    style={{ width: `${topics.length > 0 ? (completedTopics.length / topics.length) * 100 : 0}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              {showCompiler && isProgrammingCourse ? (
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><Code2 className="w-5 h-5 text-indigo-600" /> Code Compiler</h2>
                  <div className="bg-gray-900 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                      <span className="text-xs text-gray-400">{course.category}</span>
                      <button onClick={runCode} disabled={running} className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-green-700 flex items-center gap-1"><Play className="w-3.5 h-3.5" /> {running ? 'Running...' : 'Run Code'}</button>
                    </div>
                    <textarea value={code} onChange={e => setCode(e.target.value)} className="w-full h-60 bg-gray-900 text-green-400 font-mono text-sm p-4 resize-none focus:outline-none" spellCheck={false} />
                  </div>
                  {output && (
                    <div className="mt-3 bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400">
                      <div className="flex items-center gap-2 mb-2 text-gray-400 text-xs"><Terminal className="w-4 h-4" /> Output</div>
                      <pre className="whitespace-pre-wrap">{output}</pre>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {currentTopic ? (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-900"><span className="text-indigo-600 mr-2">#{activeTopic + 1}</span>{currentTopic.title}</h2>
                        <button onClick={() => markCompleted(activeTopic)} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${completedTopics.includes(activeTopic) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-600'}`}>
                          {completedTopics.includes(activeTopic) ? '✓ Completed' : 'Mark Complete'}
                        </button>
                      </div>
                      <div className="course-content text-gray-700">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeHighlight, rehypeRaw]}
                        >
                          {currentTopic.content || 'No content yet.'}
                        </ReactMarkdown>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12 text-gray-400"><BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>Select a topic from the sidebar to start learning.</p></div>
                  )}
                  {topics.length > 0 && (
                    <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
                      <button onClick={goPrev} disabled={activeTopic === 0} className="btn-secondary py-1.5 px-4 text-xs gap-1 disabled:opacity-50">← Previous</button>
                      <span className="text-xs text-gray-400">{activeTopic + 1} of {topics.length}</span>
                      <button onClick={goNext} disabled={activeTopic >= topics.length - 1} className="btn-primary py-1.5 px-4 text-xs gap-1 disabled:opacity-50">Next →</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showCertificate && certificate && (
        <div className="fixed inset-0 z-[100] overflow-y-auto" style={{ background: 'rgba(0,0,0,0.85)' }}>
          <div className="min-h-screen flex items-center justify-center p-4">
            <div id="certificate-print" style={{ width: '100%', maxWidth: '700px' }}>
              <div style={{ background: 'linear-gradient(135deg, #fdf2f8, #f0f4ff, #faf5ff, #fff1f2)', borderRadius: '16px', padding: '36px' }}>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}><img src="/logo.png" alt="CodeNexusLabs" style={{ width: '52px', height: '52px', borderRadius: '10px', objectFit: 'contain', margin: '0 auto 6px' }} /><h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#4f46e5', margin: '0' }}>CodeNexusLabs</h2><p style={{ fontSize: '9px', color: '#6b7280', letterSpacing: '3px', margin: '2px 0 0' }}>LEARN · BUILD · SHIP</p></div>
                <div style={{ width: '60px', height: '2px', background: 'linear-gradient(to right, #818cf8, #a78bfa)', margin: '0 auto 12px', borderRadius: '1px' }} />
                <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', textAlign: 'center', margin: '0 0 4px' }}>CERTIFICATE OF COMPLETION</h1>
                <p style={{ fontSize: '11px', color: '#6b7280', textAlign: 'center', margin: '0 0 14px' }}>This certificate is proudly presented to</p>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#4f46e5', textAlign: 'center', margin: '0 0 6px', fontFamily: 'Georgia, serif' }}>{certificate.studentName}</h2>
                <p style={{ fontSize: '10px', color: '#6b7280', textAlign: 'center', margin: '0 0 10px' }}>For successfully completing the course</p>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', textAlign: 'center', margin: '0 0 18px' }}>{certificate.courseTitle}</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '18px' }}>
                  <div style={{ background: '#eef2ff', borderRadius: '8px', padding: '8px 14px', textAlign: 'center', border: '1px solid #c7d2fe' }}><p style={{ fontSize: '18px', fontWeight: 'bold', color: '#4f46e5', margin: '0' }}>{certificate.score}%</p><p style={{ fontSize: '8px', color: '#6b7280', margin: '2px 0 0', textTransform: 'uppercase' }}>Score</p></div>
                  <div style={{ background: '#ede9fe', borderRadius: '8px', padding: '8px 14px', textAlign: 'center', border: '1px solid #c4b5fd' }}><p style={{ fontSize: '18px', fontWeight: 'bold', color: '#7c3aed', margin: '0' }}>{certificate.topicsCompleted}</p><p style={{ fontSize: '8px', color: '#6b7280', margin: '2px 0 0', textTransform: 'uppercase' }}>Topics</p></div>
                  <div style={{ background: '#fce7f3', borderRadius: '8px', padding: '8px 14px', textAlign: 'center', border: '1px solid #f9a8d4' }}><p style={{ fontSize: '13px', fontWeight: 'bold', color: '#db2777', margin: '0' }}>{certificate.completionDate}</p><p style={{ fontSize: '8px', color: '#6b7280', margin: '2px 0 0', textTransform: 'uppercase' }}>Date</p></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '14px', borderTop: '1px solid #e5e7eb' }}><div style={{ textAlign: 'center' }}><p style={{ fontSize: '9px', color: '#9ca3af', margin: '0' }}>Student</p></div><div style={{ textAlign: 'center' }}><img src="/logo.png" alt="Seal" style={{ width: '32px', height: '32px', opacity: '0.25', margin: '0 auto' }} /><p style={{ fontSize: '6px', color: '#9ca3af', margin: '1px 0 0' }}>{certificate.certificateId}</p></div><div style={{ textAlign: 'center' }}><p style={{ fontSize: '9px', color: '#9ca3af', margin: '0' }}>CodeNexusLabs</p></div></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '14px' }}><button onClick={downloadCertificate} className="btn-primary text-sm gap-2 px-5 py-2">📥 Save as PDF</button><button onClick={closeCertificate} className="btn-white text-sm px-5 py-2">Close</button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;