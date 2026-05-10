import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Loader2, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import API from '../../services/api';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    if (!token) { setError('Invalid reset link'); return; }
    setLoading(true);
    setError('');
    try {
      await API.post('/auth/reset-password', { token, password: data.password });
      setDone(true);
      toast.success('Password reset! You can now login.');
    } catch (e: any) {
      setError(e.response?.data?.message || 'Reset failed. Link may have expired.');
    }
    setLoading(false);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Link</h1>
          <p className="text-gray-500 mb-4">This reset link is invalid or has expired.</p>
          <Link to="/forgot-password" className="text-indigo-600 font-semibold">Request new link</Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Password Reset!</h1>
          <p className="text-gray-500 mb-4">Your password has been updated.</p>
          <button onClick={() => navigate('/login')} className="btn-primary">Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
            <img src="/logo.png" alt="CodeNexusLabs" className="w-10 h-10 rounded-lg object-contain" />
            <span className="font-bold text-xl text-gray-900">CodeNexus<span className="text-indigo-600">Labs</span></span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Set New Password</h2>
          <p className="text-sm text-gray-500 mt-1">Enter your new password below.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">{error}</div>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="password" placeholder="Min 8 characters" className={`input-field pl-9 ${errors.password ? 'input-error' : ''}`}
                  {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'At least 8 characters' } })} />
              </div>
            {errors.password && <p className="error-text">{(errors.password?.message as string) || 'Password is required'}</p>}
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-sm">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Resetting...</> : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;