import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Search, Grid3X3, List, Trash2, Edit3, BookOpen, Clock, 
  Users, ImageIcon, X, ChevronDown, ChevronUp, Star, TrendingUp 
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

const CATEGORY_OPTIONS = ['Java', 'HTML', 'SQL', 'Selenium', 'Python', 'JavaScript', 'React', 'Spring Boot', 'C++', 'Data Structures'];
const DIFFICULTY_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'];

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
  'Java': 'bg-orange-100 text-orange-700',
  'HTML': 'bg-red-100 text-red-700',
  'SQL': 'bg-blue-100 text-blue-700',
  'Selenium': 'bg-green-100 text-green-700',
  'Python': 'bg-yellow-100 text-yellow-700',
  'JavaScript': 'bg-yellow-100 text-yellow-800',
  'React': 'bg-cyan-100 text-cyan-700',
  'Spring Boot': 'bg-green-100 text-green-800',
  'C++': 'bg-blue-100 text-blue-800',
  'Data Structures': 'bg-purple-100 text-purple-700',
};

export default function InterviewManagement() {
  const [courses, setCourses] = useState<InterviewCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<InterviewCourse | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Java',
    difficulty: 'Beginner',
    duration: '',
    logoUrl: '',
  });

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

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Java',
      difficulty: 'Beginner',
      duration: '',
      logoUrl: '',
    });
    setEditingCourse(null);
  };

  const openModal = (course?: InterviewCourse) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        description: course.description || '',
        category: course.category || 'Java',
        difficulty: course.difficulty || 'Beginner',
        duration: course.duration || '',
        logoUrl: course.logoUrl || '',
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = {
      ...formData,
      logoUrl: formData.logoUrl || DEFAULT_LOGOS[formData.category] || '',
      studentsCount: editingCourse?.studentsCount || 0,
      rating: editingCourse?.rating || 4.5,
      active: true,
    };

    try {
      if (editingCourse) {
        await interviewAPI.updateInterviewCourse(editingCourse.id, data);
        toast.success('Interview course updated successfully');
      } else {
        await interviewAPI.createInterviewCourse(data);
        toast.success('Interview course created successfully');
      }
      closeModal();
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      toast.error('Failed to save course');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this interview course? This will also delete all topics.')) {
      return;
    }
    try {
      setDeleteId(id);
      await interviewAPI.deleteInterviewCourse(id);
      toast.success('Course deleted successfully');
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course');
    } finally {
      setDeleteId(null);
    }
  };

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase()) ||
    c.description?.toLowerCase().includes(search.toLowerCase())
  );

  const getLogo = (course: InterviewCourse) => {
    return course.logoUrl || DEFAULT_LOGOS[course.category] || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';
  };

  const getCategoryColor = (category: string) => {
    return CATEGORY_COLORS[category] || 'bg-gray-100 text-gray-700';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interview Preparation</h1>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            {courses.length} interview courses available
          </p>
        </div>
        <button 
          onClick={() => openModal()} 
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5" />
          Add Interview Course
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            <p className="text-sm text-gray-500">Total Courses</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {courses.reduce((acc, c) => acc + (c.studentsCount || 0), 0)}
            </p>
            <p className="text-sm text-gray-500">Total Students</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {courses.length > 0 ? (courses.reduce((acc, c) => acc + (c.rating || 0), 0) / courses.length).toFixed(1) : '0.0'}
            </p>
            <p className="text-sm text-gray-500">Average Rating</p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, category, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button 
            onClick={() => setViewMode('grid')} 
            className={`p-2.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode('list')} 
            className={`p-2.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <div 
              key={course.id} 
              className="bg-white rounded-xl border hover:shadow-lg transition-all duration-300 group overflow-hidden"
            >
              {/* Card Header with Logo */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center overflow-hidden border border-indigo-100">
                    <img 
                      src={getLogo(course)} 
                      alt={course.category} 
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getCategoryColor(course.category)}`}>
                      {course.category}
                    </span>
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {course.description || 'No description available'}
                </p>

                {/* Stats Row */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> 
                    {course.duration || 'N/A'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> 
                    {course.topics?.length || 0} topics
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" /> 
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
                    <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-gray-50 border-t flex gap-2">
                <button 
                  onClick={() => navigate(`/admin/interview/courses/${course.id}/topics`)} 
                  className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Manage Content
                </button>
                <button 
                  onClick={() => openModal(course)} 
                  className="p-2.5 border rounded-lg hover:bg-white transition-colors text-gray-600 hover:text-indigo-600"
                  title="Edit"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(course.id)} 
                  className="p-2.5 border rounded-lg hover:bg-white transition-colors text-gray-600 hover:text-red-600"
                  title="Delete"
                  disabled={deleteId === course.id}
                >
                  {deleteId === course.id ? (
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-500">
            <div className="col-span-4">Course</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-2">Topics</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          {filtered.map((course) => (
            <div key={course.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 transition items-center">
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img 
                    src={getLogo(course)} 
                    alt="" 
                    className="w-7 h-7 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">{course.title}</p>
                  <p className="text-sm text-gray-500 truncate">{course.duration || 'No duration'}</p>
                </div>
              </div>
              <div className="col-span-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(course.category)}`}>
                  {course.category}
                </span>
              </div>
              <div className="col-span-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty}
                </span>
              </div>
              <div className="col-span-2 text-sm text-gray-600">
                {course.topics?.length || 0} topics
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <button 
                  onClick={() => navigate(`/admin/interview/courses/${course.id}/topics`)} 
                  className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200 transition"
                >
                  Manage
                </button>
                <button 
                  onClick={() => openModal(course)} 
                  className="p-1.5 hover:bg-gray-200 rounded transition"
                >
                  <Edit3 className="w-4 h-4 text-gray-600" />
                </button>
                <button 
                  onClick={() => handleDelete(course.id)} 
                  className="p-1.5 hover:bg-red-50 rounded transition"
                  disabled={deleteId === course.id}
                >
                  {deleteId === course.id ? (
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4 text-red-600" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No interview courses found</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first interview preparation course</p>
          <button 
            onClick={() => openModal()} 
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus className="w-5 h-5" />
            Create Course
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-16">
          <div className="animate-spin w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-500">Loading interview courses...</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingCourse ? 'Edit Interview Course' : 'Add Interview Course'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {editingCourse ? 'Update course details' : 'Create a new interview preparation course'}
                </p>
              </div>
              <button 
                onClick={closeModal} 
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input 
                  required 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                  placeholder="e.g., Java Interview Preparation" 
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none" 
                  rows={3} 
                  placeholder="Describe what this course covers..." 
                />
              </div>

              {/* Category & Difficulty */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={formData.category} 
                    onChange={(e) => setFormData({...formData, category: e.target.value})} 
                    className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white"
                  >
                    {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Difficulty
                  </label>
                  <select 
                    value={formData.difficulty} 
                    onChange={(e) => setFormData({...formData, difficulty: e.target.value})} 
                    className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white"
                  >
                    {DIFFICULTY_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Duration / Questions
                </label>
                <input 
                  value={formData.duration} 
                  onChange={(e) => setFormData({...formData, duration: e.target.value})} 
                  className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                  placeholder="e.g., 40 Questions or 8 Weeks" 
                />
              </div>

              {/* Logo URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Logo URL
                </label>
                <div className="flex gap-3">
                  <input 
                    value={formData.logoUrl} 
                    onChange={(e) => setFormData({...formData, logoUrl: e.target.value})} 
                    className="flex-1 border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                    placeholder="https://example.com/logo.svg" 
                  />
                  {formData.logoUrl && (
                    <div className="w-12 h-12 rounded-lg border flex items-center justify-center overflow-hidden flex-shrink-0 bg-gray-50">
                      <img 
                        src={formData.logoUrl} 
                        alt="preview" 
                        className="w-8 h-8 object-contain"
                        onError={(e) => { 
                          (e.target as HTMLImageElement).style.display = 'none'; 
                        }} 
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" />
                  Leave empty to use default {formData.category} logo from DevIcons
                </p>
              </div>

              {/* Default Logo Preview */}
              {!formData.logoUrl && (
                <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border flex items-center justify-center">
                    <img 
                      src={DEFAULT_LOGOS[formData.category]} 
                      alt="default" 
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Default {formData.category} Logo</p>
                    <p className="text-xs text-gray-500">This will be used if no custom URL is provided</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button 
                  type="button" 
                  onClick={closeModal} 
                  className="flex-1 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={saving} 
                  className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      {editingCourse ? 'Update Course' : 'Create Course'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}