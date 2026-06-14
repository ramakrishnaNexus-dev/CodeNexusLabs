// src/pages/student/MyResumes.tsx

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { resumeService } from '../../services/resumeService';

interface Resume {
  id: number;
  title: string;
  templateId: number;
  updatedAt: string;
  isActive: boolean;
}

export default function MyResumes() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await resumeService.getAllResumes();
      if (response.status === 'success') {
        setResumes(response.data);
      }
    } catch (error) {
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;
    try {
      const response = await resumeService.deleteResume(id);
      if (response.status === 'success') {
        toast.success('Resume deleted');
        fetchResumes();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleCreateNew = () => {
    navigate('/student/resume/builder');
  };

  const handleEdit = (id: number) => {
    navigate(`/student/resume/builder/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
          <p className="text-gray-500 mt-1">Create and manage your professional resumes</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all"
        >
          <Plus className="w-5 h-5" />
          Create New Resume
        </button>
      </div>

      {resumes.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No resumes yet</h3>
          <p className="text-gray-500 mb-6">Create your first resume to get started</p>
          <button
            onClick={handleCreateNew}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Resume
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div key={resume.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <FileText className="w-16 h-16 text-indigo-600 opacity-50" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">{resume.title}</h3>
                <p className="text-xs text-gray-400 mb-4">
                  Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(resume.id)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(resume.id)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}