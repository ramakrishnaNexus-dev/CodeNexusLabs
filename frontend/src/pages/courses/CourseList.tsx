import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { catalogAPI } from '../../services/api';
import CourseCard from '../../components/common/CourseCard';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Search, X, Sparkles } from 'lucide-react';

const categories = ['All', 'Java', 'Python', 'JavaScript', 'Selenium', 'Spring Boot', 'React', 'Data Science'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const CourseList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeCategory = searchParams.get('category') || 'All';
  const activeDifficulty = searchParams.get('difficulty') || 'All';
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    setLoading(true);
    catalogAPI.getAllCourses().then((res: any) => {
      let data = res.data || [];
      if (activeCategory !== 'All') data = data.filter((c: any) => c.category === activeCategory);
      if (activeDifficulty !== 'All') data = data.filter((c: any) => c.difficulty === activeDifficulty);
      if (searchQuery) data = data.filter((c: any) => c.title.toLowerCase().includes(searchQuery.toLowerCase()));
      setCourses(data);
    }).catch(() => setError('Failed to load courses')).finally(() => setLoading(false));
  }, [activeCategory, activeDifficulty, searchQuery]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'All' || !value) params.delete(key);
    else params.set(key, value);
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 lg:py-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 rounded-full text-indigo-700 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Course Library
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Explore Courses</h1>
          <p className="text-gray-500 text-sm">Find the perfect course to advance your skills</p>
        </div>

        {/* Search */}
        <div className="max-w-[400px] mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
            <input type="text" placeholder="Search courses..." value={searchQuery}
              onChange={e => updateFilter('search', e.target.value)} 
              className="input-field pl-9 pr-9 text-sm border-indigo-100 focus:border-indigo-400" />
            {searchQuery && <button onClick={() => updateFilter('search', '')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-gray-400 hover:text-gray-600" /></button>}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {categories.map(cat => (
            <button key={cat} onClick={() => updateFilter('category', cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' 
                  : 'bg-white border-2 border-gray-100 text-gray-600 hover:border-indigo-200 hover:shadow-md'
              }`}>{cat === 'All' ? '📚 All' : cat}</button>
          ))}
        </div>

        {/* Difficulty Pills */}
        <div className="flex justify-center gap-2 mb-8">
          {difficulties.map(diff => (
            <button key={diff} onClick={() => updateFilter('difficulty', diff)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                activeDifficulty === diff 
                  ? 'bg-gray-800 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}>
              {diff === 'All' ? '🔽 All Levels' : diff}
            </button>
          ))}
        </div>

        {/* Results Count */}
        {!loading && courses.length > 0 && (
          <p className="text-center text-sm text-gray-400 mb-6">
            Showing <span className="font-semibold text-indigo-600">{courses.length}</span> courses
          </p>
        )}

        {/* Content */}
        {loading ? (
          <Loader text="Loading courses..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-indigo-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No courses found</h3>
            <p className="text-sm text-gray-500 mb-4">Try adjusting your filters or search terms</p>
            <button onClick={() => { updateFilter('category', 'All'); updateFilter('difficulty', 'All'); }} 
              className="btn-secondary text-sm">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {courses.map((c: any) => <CourseCard key={c.id} course={c} />)}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default CourseList;