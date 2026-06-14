import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, BookOpen, Clock, Users, ArrowRight, Star, 
  TrendingUp, Filter, ChevronDown, GraduationCap 
} from 'lucide-react';
import { interviewAPI } from '../../services/api';
import toast from 'react-hot-toast';

interface InterviewCourse {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  logoUrl?: string;
  studentsCount?: number;
  rating?: number;
  active?: boolean;
  topics?: any[];
}

const DEFAULT_LOGOS: Record<string, string> = {
  'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'Selenium': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg',
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Spring Boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  'Data Structures': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
};

const CATEGORY_COLORS: Record<string, string> = {
  'Java': 'bg-orange-100 text-orange-700 border-orange-200',
  'HTML': 'bg-red-100 text-red-700 border-red-200',
  'SQL': 'bg-blue-100 text-blue-700 border-blue-200',
  'Selenium': 'bg-green-100 text-green-700 border-green-200',
  'Python': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'JavaScript': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'React': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'Spring Boot': 'bg-green-100 text-green-800 border-green-200',
  'C++': 'bg-blue-100 text-blue-800 border-blue-200',
  'Data Structures': 'bg-purple-100 text-purple-700 border-purple-200',
};

const DIFFICULTY_COLORS = {
  'Beginner': 'bg-green-100 text-green-700 border-green-200',
  'Intermediate': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Advanced': 'bg-red-100 text-red-700 border-red-200',
};

export default function InterviewPrep() {
  const [courses, setCourses] = useState<InterviewCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response: any = await interviewAPI.getAllInterviewCourses();
      setCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load interview courses');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getLogo = (course: InterviewCourse) => {
    return course.logoUrl || DEFAULT_LOGOS[course.category] || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              Master Your Technical Interviews
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Interview Preparation
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Practice with real interview questions from top companies. 
              Master Java, HTML, SQL, Selenium, and more with comprehensive Q&A.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Java, HTML, SQL, Selenium..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 items-center">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
          
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  selectedCategory === cat 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white border text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex gap-2 ml-auto">
            {difficulties.map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  selectedDifficulty === diff 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white border text-gray-600 hover:bg-gray-50'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin w-12 h-12 border-3 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Loading interview courses...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/interview/courses/${course.id}`)}
                className="bg-white rounded-2xl border hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center overflow-hidden border-2 border-indigo-100 group-hover:border-indigo-300 transition">
                      <img
                        src={getLogo(course)}
                        alt={course.category}
                        className="w-11 h-11 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';
                        }}
                      />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${CATEGORY_COLORS[course.category] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                        {course.category}
                      </span>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${DIFFICULTY_COLORS[course.difficulty as keyof typeof DIFFICULTY_COLORS] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                        {course.difficulty}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-5 line-clamp-2 leading-relaxed">
                    {course.description || 'Comprehensive interview preparation with real questions and detailed answers.'}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-5 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-indigo-500" />
                      {course.duration || 'N/A'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-indigo-500" />
                      {course.topics?.length || 0} topics
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-indigo-500" />
                      {course.studentsCount || 0}
                    </span>
                  </div>

                  {/* Rating */}
                  {course.rating && (
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(course.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm font-medium text-gray-700 ml-1">{course.rating}</span>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between group-hover:bg-indigo-50 transition-colors">
                  <span className="text-sm font-semibold text-indigo-600 flex items-center gap-1">
                    Start Preparation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-indigo-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-indigo-600">{courses.length}+</p>
              <p className="text-gray-500 mt-1">Interview Courses</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">500+</p>
              <p className="text-gray-500 mt-1">Practice Questions</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">50+</p>
              <p className="text-gray-500 mt-1">Topics Covered</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">10k+</p>
              <p className="text-gray-500 mt-1">Students Prepared</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}