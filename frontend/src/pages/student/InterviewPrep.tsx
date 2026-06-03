import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, Clock, Users, Star } from 'lucide-react';
import axios from 'axios';

const API_URL = 'https://codenexuslabs.onrender.com/api/v1';

// List of courses that have interview content
const INTERVIEW_COURSES = [
  { id: 1, title: 'Complete Java Masterclass', category: 'Java', difficulty: 'Beginner', duration: '12 weeks', studentsCount: 2450, rating: 4.5 },
  { id: 2, title: 'HTML Complete Course', category: 'HTML', difficulty: 'Beginner', duration: '8 weeks', studentsCount: 1890, rating: 4.6 },
  { id: 3, title: 'Selenium Automation', category: 'Selenium', difficulty: 'Intermediate', duration: '10 weeks', studentsCount: 3200, rating: 4.4 },
  { id: 4, title: 'SQL Mastery', category: 'SQL', difficulty: 'Beginner', duration: '6 weeks', studentsCount: 2800, rating: 4.7 },
];

const InterviewPrep = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch courses from API and filter only those with interview topics
    axios.get(`${API_URL}/courses`)
      .then((res: any) => {
        const allCourses = res.data?.data || res.data || [];
        // For now, use static list. In production, filter courses that have interview topics
        setCourses(INTERVIEW_COURSES);
      })
      .catch(() => setCourses(INTERVIEW_COURSES))
      .finally(() => setLoading(false));
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const difficultyBadge: Record<string, string> = {
    Beginner: 'bg-emerald-100 text-emerald-700',
    Intermediate: 'bg-amber-100 text-amber-700',
    Advanced: 'bg-rose-100 text-rose-700',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 lg:py-10">
        
        {/* Navigation */}
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="btn-secondary py-1.5 px-3 text-xs">🏠 Home</Link>
          <Link to="/courses" className="btn-secondary py-1.5 px-3 text-xs">📚 Courses</Link>
          <Link to="/student/dashboard" className="btn-secondary py-1.5 px-3 text-xs">📊 Dashboard</Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 rounded-full text-indigo-700 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Interview Preparation
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Practice Interview Questions</h1>
          <p className="text-gray-500 text-sm">Select a course to practice interview questions</p>
        </div>

        {/* Search */}
        <div className="max-w-[400px] mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)} 
              className="input-field pl-9 text-sm border-indigo-100 focus:border-indigo-400 w-full" 
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading courses...</p>
          </div>
        )}

        {/* Course Cards Grid */}
        {!loading && filteredCourses.length > 0 && (
          <>
            <p className="text-center text-sm text-gray-400 mb-6">
              Showing <span className="font-semibold text-indigo-600">{filteredCourses.length}</span> courses with interview prep
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredCourses.map((course) => (
                <Link 
                  key={course.id}
                  to={`/interview/course/${course.id}`}
                  className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden block"
                >
                  <div className="h-32 bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center relative border-b border-gray-100">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600 shadow-sm">
                      {course.category?.charAt(0) || '?'}
                    </div>
                    <span className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-[10px] font-semibold ${difficultyBadge[course.difficulty] || 'bg-gray-100 text-gray-600'}`}>
                      {course.difficulty}
                    </span>
                  </div>
                  <div className="p-4">
                    <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-semibold mb-2 bg-indigo-100 text-indigo-700">
                      {course.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">Interview Preparation Q&A</p>
                    <div className="flex items-center justify-between text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-100">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {course.studentsCount?.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {course.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-indigo-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No courses found</h3>
            <p className="text-sm text-gray-500">No interview questions available for any course yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPrep;