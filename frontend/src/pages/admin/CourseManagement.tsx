import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, BookOpen, X, Save, Loader2, Grid3X3, List } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { catalogAPI } from '../../services/api';
import axios from 'axios';

const FALLBACK_CATEGORIES = [
  { id: 1, name: 'Java' },
  { id: 2, name: 'Python' },
  { id: 3, name: 'React' },
  { id: 4, name: 'Spring Boot' },
  { id: 5, name: 'Selenium' },
  { id: 6, name: 'JavaScript' },
  { id: 7, name: 'Postman' },
  { id: 8, name: 'Git' },
  { id: 9, name: 'SQL' },
  { id: 10, name: 'Docker' },
];

const CourseManagement = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>(FALLBACK_CATEGORIES);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchCourses = () => {
    setLoading(true);
    catalogAPI.getAllCourses().then((res: any) => {
      setCourses(res.data || []);
    }).catch(() => toast.error('Failed to load courses')).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
    // Try to load categories from backend
    axios.get('https://codenexuslabs-production.up.railway.app/api/v1/categories')
      .then((res: any) => {
        const data = res.data?.data || res.data || [];
        if (Array.isArray(data) && data.length > 0) {
          setCategoryList(data);
        }
      })
      .catch(() => {}); // Keep fallback if backend not available
  }, []);

  const filteredCourses = courses.filter((c: any) => 
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.category?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditingCourse(null);
    reset({ title: '', description: '', category: '', duration: '', difficulty: 'Beginner' });
    setShowModal(true);
  };

  const handleEdit = (course: any) => {
    setEditingCourse(course);
    reset(course);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    try { await catalogAPI.deleteCourse(id); toast.success('Course deleted'); fetchCourses(); } 
    catch { toast.error('Failed to delete course'); }
    setDeleteId(null);
  };

  const onSubmit = async (data: any) => {
    if (!data.category) { toast.error('Please select a category'); return; }
    setSaving(true);
    try {
      if (editingCourse) { await catalogAPI.updateCourse(editingCourse.id, data); toast.success('Course updated!'); } 
      else { await catalogAPI.createCourse(data); toast.success('Course created!'); }
      setShowModal(false); fetchCourses();
    } catch { toast.error('Failed to save course'); }
    finally { setSaving(false); }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Course Management</h1><p className="text-gray-500 text-sm mt-1">{courses.length} courses</p></div>
        <button onClick={handleAdd} className="btn-primary gap-2"><Plus className="w-4 h-4" /> Add Course</button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" /></div>
        <div className="flex border border-gray-200 rounded-xl overflow-hidden">
          <button onClick={() => setViewMode('grid')} className={`p-2.5 ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400'}`}><Grid3X3 className="w-5 h-5" /></button>
          <button onClick={() => setViewMode('list')} className={`p-2.5 ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400'}`}><List className="w-5 h-5" /></button>
        </div>
      </div>

      {loading ? <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-indigo-600 animate-spin" /></div> : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course: any) => (
            <div key={course.id} className="card hover:shadow-md transition-all group">
              <div className="h-40 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-t-2xl flex items-center justify-center relative">
                <BookOpen className="w-12 h-12 text-white/70" />
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(course)} className="p-2 bg-white rounded-lg shadow-sm hover:bg-indigo-50"><Edit2 className="w-4 h-4 text-gray-600" /></button>
                  <button onClick={() => setDeleteId(course.id)} className="p-2 bg-white rounded-lg shadow-sm hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-500" /></button>
                </div>
              </div>
              <div className="p-5">
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold">{course.category}</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-1">{course.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-2">{course.description}</p>
                <p className="text-xs text-gray-400 mb-3">{course.topics?.length || 0} topics</p>
                <a href={`/admin/courses/${course.id}`} className="btn-primary w-full py-2 text-xs gap-1 justify-center inline-flex items-center">
                  <BookOpen className="w-3.5 h-3.5" /> Manage Content
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead><tr className="bg-gray-50"><th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Course</th><th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th><th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Topics</th><th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th></tr></thead>
            <tbody>{filteredCourses.map((course: any) => (
              <tr key={course.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center"><BookOpen className="w-5 h-5 text-indigo-600" /></div><div><p className="font-semibold text-gray-900 text-sm">{course.title}</p><p className="text-xs text-gray-500">{course.description?.substring(0, 60)}...</p></div></div></td>
                <td className="px-6 py-4"><span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">{course.category}</span></td>
                <td className="px-6 py-4 text-sm text-gray-500">{course.topics?.length || 0} topics</td>
                <td className="px-6 py-4 text-right"><div className="flex justify-end gap-2">
                  <a href={`/admin/courses/${course.id}`} className="btn-primary py-1.5 px-3 text-xs gap-1 inline-flex items-center"><BookOpen className="w-3.5 h-3.5" /> Content</a>
                  <button onClick={() => handleEdit(course)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-gray-400 hover:text-indigo-600"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => setDeleteId(course.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b"><h2 className="text-lg font-bold">{editingCourse ? 'Edit Course' : 'Add Course'}</h2><button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button></div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Title</label><input className={`input-field ${errors.title ? 'input-error' : ''}`} {...register('title', { required: 'Title is required' })} />{errors.title && <p className="error-text">{errors.title?.message as string}</p>}</div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label><textarea className="input-field" rows={3} {...register('description')} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category *</label>
                  <select className="input-field" {...register('category', { required: 'Select a category' })}>
                    <option value="">Select Category</option>
                    {categoryList.map((cat: any) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  {errors.category && <p className="error-text">Category is required</p>}
                </div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Duration</label><input className="input-field" placeholder="e.g. 8 weeks" {...register('duration')} /></div>
              </div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Difficulty</label><select className="input-field" {...register('difficulty')}>{['Beginner','Intermediate','Advanced'].map(d => <option key={d} value={d}>{d}</option>)}</select></div>
              <div className="flex gap-3 pt-4"><button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button><button type="submit" disabled={saving} className="btn-primary flex-1 gap-2">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}{saving ? 'Saving...' : 'Save Course'}</button></div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold mb-2">Delete Course?</h3><p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end"><button onClick={() => setDeleteId(null)} className="btn-secondary py-2 px-4 text-sm">Cancel</button><button onClick={() => handleDelete(deleteId)} className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-700">Delete</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;