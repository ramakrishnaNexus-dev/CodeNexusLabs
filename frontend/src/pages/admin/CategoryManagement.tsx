import { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

const CategoryManagement = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', iconUrl: '', description: '' });

  const fetchCategories = () => {
    setLoading(true);
    axios.get(`${API_URL}/categories`)
      .then((res: any) => {
        const data = res.data?.data || res.data || [];
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(() => toast.error('Failed to load categories'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCategories(); }, []);

  const addCategory = async () => {
    if (!newCat.name.trim()) { toast.error('Category name required'); return; }
    try {
      await axios.post(`${API_URL}/categories`, newCat);
      toast.success('Category added!');
      setNewCat({ name: '', iconUrl: '', description: '' });
      setShowAdd(false);
      fetchCategories();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to add category');
    }
  };

  const deleteCategory = async (id: number) => {
    if (!confirm('Delete this category?')) return;
    try {
      await axios.delete(`${API_URL}/categories/${id}`);
      toast.success('Category deleted!');
      fetchCategories();
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
          <p className="text-gray-500 text-sm mt-1">{categories.length} categories</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary gap-2">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat: any) => (
            <div key={cat.id} className="card p-4 flex items-center justify-between hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                {cat.iconUrl ? (
                  <img src={cat.iconUrl} alt={cat.name} className="w-10 h-10 object-contain rounded-lg bg-gray-50 p-1" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
                    {cat.name?.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{cat.name}</p>
                  <p className="text-xs text-gray-500">{cat.description || 'No description'}</p>
                </div>
              </div>
              <button onClick={() => deleteCategory(cat.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold">Add New Category</h2>
              <button onClick={() => setShowAdd(false)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Category Name *</label>
                <input className="input-field" placeholder="e.g. DeepSeek, Claude, Git" value={newCat.name}
                  onChange={e => setNewCat({...newCat, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Icon URL</label>
                <input className="input-field" placeholder="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/..." value={newCat.iconUrl}
                  onChange={e => setNewCat({...newCat, iconUrl: e.target.value})} />
                <p className="text-[10px] text-gray-400 mt-1">Use devicon CDN or any image URL</p>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Description</label>
                <input className="input-field" placeholder="Brief description" value={newCat.description}
                  onChange={e => setNewCat({...newCat, description: e.target.value})} />
              </div>
              <button onClick={addCategory} className="btn-primary w-full gap-2"><Save className="w-4 h-4" /> Save Category</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;