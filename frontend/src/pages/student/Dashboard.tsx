import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Code2, FileText, Trophy, Clock, Target, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import API from '../../services/api';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [savedResumes, setSavedResumes] = useState<any[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

  useEffect(() => {
    API.get('/quizzes/history').then((res: any) => setQuizHistory(res.data || [])).catch(() => {});
    API.get('/resumes/my').then((res: any) => setSavedResumes(res.data || [])).catch(() => {});
    API.get('/enroll/my').then((res: any) => setEnrolledCourses(res.data || [])).catch(() => {});
  }, []);

  const quickActions = [
    { icon: BookOpen, label: 'Browse Courses', path: '/courses', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { icon: Code2, label: 'Code Practice', path: '/student/practice', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
    { icon: FileText, label: 'Build Resume', path: '/student/resume', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
    { icon: MessageSquare, label: 'Interview Prep', path: '/student/interview', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 lg:py-10">
        
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 rounded-full text-indigo-700 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Dashboard
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
            Welcome back, {user?.fullName?.split(' ')[0] || 'Learner'}! 👋
          </h1>
          <p className="text-gray-500 text-sm">Continue your learning journey</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen, label: 'Enrolled', value: enrolledCourses.length, color: 'bg-blue-100 text-blue-600' },
            { icon: Trophy, label: 'Quizzes', value: quizHistory.length, color: 'bg-green-100 text-green-600' },
            { icon: FileText, label: 'Resumes', value: savedResumes.length, color: 'bg-purple-100 text-purple-600' },
            { icon: Clock, label: 'Hours', value: quizHistory.length * 2, color: 'bg-yellow-100 text-yellow-600' },
          ].map((stat) => (
            <div key={stat.label} className="card p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enrolled Courses */}
        {enrolledCourses.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">📚 My Enrolled Courses</h2>
              <Link to="/courses" className="text-xs text-indigo-600 font-medium hover:text-indigo-700">Browse More →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrolledCourses.map((e: any) => (
                <Link key={e.id} to={`/courses/${e.courseId}`} className="card p-4 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600">{e.courseTitle}</p>
                      <p className="text-xs text-gray-500">Enrolled: {new Date(e.enrolledAt).toLocaleDateString()}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => (
            <Link key={action.path} to={action.path}
              className="card group p-5 flex flex-col items-center text-center gap-3 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl ${action.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <action.icon className={`w-6 h-6 ${action.iconColor}`} />
              </div>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </Link>
          ))}
        </div>

        {/* Quiz History */}
        {quizHistory.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">📝 Quiz History</h2>
            <div className="card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase">Quiz</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase">Score</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {quizHistory.map((q: any) => (
                    <tr key={q.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                      <td className="px-4 py-2.5 font-medium text-gray-900 text-sm">{q.quizTitle}</td>
                      <td className="px-4 py-2.5 text-sm">{q.correct}/{q.total} ({q.score}%)</td>
                      <td className="px-4 py-2.5">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${q.passed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {q.passed ? 'Passed ✅' : 'Failed'}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-gray-500">{new Date(q.completedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CTA */}
        {enrolledCourses.length === 0 && (
          <div className="card p-10 text-center bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Target className="w-8 h-8 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Start Learning Today</h3>
            <p className="text-gray-500 text-sm mb-5 max-w-md mx-auto">Enroll in courses to track your progress</p>
            <Link to="/courses" className="btn-primary px-6 py-2.5 text-sm shadow-lg shadow-indigo-200">
              Browse Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default StudentDashboard;